import { randomBytes } from 'crypto'

let handler = async (m, { conn, text }) => {
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
  for (let id of chats) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? `${htki} *BROADCAST PROMOSI* ${htka}\n` + teks : `${htki} *BROADCAST PROMOSI* ${htka}\n` + teks + '\n' + readMore + '\n\n' + #IzinMin), true).catch(_ => _)
  m.reply('Selesai Broadcast All Chat :)')
}
handler.help = ['broadcastpromosi', 'bcp'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcastpromosi|bcp)$/i

handler.owner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)