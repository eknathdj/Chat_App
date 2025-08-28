import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'


const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'


export default function App() {
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const room = 'global'
    const user = 'User-' + Math.floor(Math.random() * 1000)


    useEffect(() => {
        const s = io(SOCKET_URL)
        setSocket(s)
        s.emit('join', room)
        s.on('message', (msg) => setMessages(m => [...m, msg]))
        return () => s.disconnect()
    }, [])


    const send = () => {
        if (!text) return
        const payload = { room, user, text }
        socket.emit('message', payload)
        setText('')
    }


    return (
        <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'Arial' }}>
            <h2>Chat App (Docker Demo)</h2>
            <div style={{ border: '1px solid #ccc', minHeight: 300, padding: 10 }}>
                {messages.map((m, i) => (
                    <div key={i}><strong>{m.user}:</strong> {m.text}</div>
                ))}
            </div>
            <div style={{ marginTop: 10 }}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message" />
                <button onClick={send} style={{ marginLeft: 8 }}>Send</button>
            </div>
        </div>
    )
}