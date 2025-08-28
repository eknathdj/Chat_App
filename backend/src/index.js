// backend/src/index.js
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:password@db:5432/chat' })

app.get('/messages', async (req, res) => {
    const { rows } = await pool.query('SELECT user_name AS "user", text FROM messages ORDER BY id ASC LIMIT 100')
    res.send(rows)
})

io.on('connection', (socket) => {
    socket.on('message', async (p) => {
        io.to(p.room).emit('message', p)
        await pool.query('INSERT INTO messages(user_name, text) VALUES ($1,$2)', [p.user, p.text])
    })
})
