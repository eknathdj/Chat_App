import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'

export default function App() {
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')

    // Persist a stable username per browser/tab using localStorage
    const [username, setUsername] = useState(() => {
        const saved = localStorage.getItem('username')
        if (saved) return saved
        const name = 'user-' + Math.floor(Math.random() * 100000)
        localStorage.setItem('username', name)
        return name
    })

    const room = 'global'

    useEffect(() => {
        const s = io(SOCKET_URL)
        setSocket(s)
        s.emit('join', room)
        s.on('message', (msg) => setMessages((m) => [...m, msg]))
        return () => s.disconnect()
    }, [])

    useEffect(() => {
        localStorage.setItem('username', username)
    }, [username])

    const send = () => {
        if (!text || !socket) return
        const payload = { room, user: username, text }
        socket.emit('message', payload)
        setText('')
    }

    return (
        <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'Arial' }}>
            <h2>Chat App (Docker Demo)</h2>

            <div style={{ marginBottom: 12 }}>
                <label>
                    Display name:&nbsp;
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="your name"
                        style={{ width: 200 }}
                    />
                </label>
            </div>

            <div style={{ border: '1px solid #ccc', minHeight: 300, padding: 10 }}>
                {messages.map((m, i) => (
                    <div key={i}>
                        <strong>{m.user}:</strong> {m.text}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 10 }}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                    style={{ width: 520 }}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                />
                <button onClick={send} style={{ marginLeft: 8 }}>
                    Send
                </button>
            </div>
        </div>
    )
}
