// backend/src/index.js
const { createAdapter } = require('@socket.io/redis-adapter')
const { createClient } = require('redis')

async function enableRedisAdapter(io) {
    const pub = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' })
    const sub = pub.duplicate()
    await pub.connect(); await sub.connect()
    io.adapter(createAdapter(pub, sub))
}
enableRedisAdapter(io).catch(console.error)