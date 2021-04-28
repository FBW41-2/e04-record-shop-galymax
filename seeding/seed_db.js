const { MongoClient } = require('mongodb')
require('dotenv').config()

/** ENV VARIABLES **/
const dBURL = process.env.DB_URL
const dBPassword = process.env.DB_PASSWORD
const dBUser = process.env.DB_USER

/** CONNECT TO MONGODB **/
async function connectDB() {//                                                    db name
    const url = `mongodb+srv://${dBUser}:${dBPassword}@${dBURL}`
    const client = new MongoClient(url)

    try {
        await client.connect()
        const db = client.db()
        console.log("connected!")
        // seed Database
        // create records
        const records = db.collection('records')
        // clear records collection
        records.deleteMany({})
        // generate mock data
        mockRecords = new Array(10).fill(null).map(() => {
            
        })
        records.insertMany([
            {artist: "Sting"}
        ])
        // create users
        // create orders
    } catch (error) {
        console.error(error)
    }
}


connectDB().catch(console.error)