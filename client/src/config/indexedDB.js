import Dexie from 'dexie'

export const db = new Dexie('MyDB')

db.version(1).stores({
    conversations: "roomId"
})