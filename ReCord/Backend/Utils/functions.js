const { ObjectId } = require("mongodb");

async function listDataBase(client){
    databaseList = await client.db().admin().listDatabases();
    console.log("DataBases:");
    databaseList.databases.forEach(db => {
        console.log(` -${db.name}`)
    });
}

async function getRooms(client) {
    let documents = [];
    const cursor = await client.db("AllRooms").collection("rooms").find({})
    if (cursor) {
        await cursor.forEach((doc) => {
            let room = { name : doc.name, id : doc._id, SVG : doc.SVG, lastMessage : '' }
            let length = doc.messages.length
            if(length === 0) {
                room.lastMessage = "Be The First TO Send The Message"
            } else {
                room.lastMessage = doc.messages[length - 1].message
            }
            documents.push(room) 
        })
        return documents;
    } else {
        return documents;
    }
}

async function getMessagesById(client, id) {
    try{
        let messages = { messages : null, room : null };
        const cursor = await client.db("AllRooms").collection("rooms").find({"_id": ObjectId(`${id}`)})
        if (cursor) {
            await cursor.forEach((doc) => {
                messages.room = doc.name
                messages.messages = doc.messages 
            })
            return messages;
        } else {
            return messages;
        }
    } catch (e) {
        console.log(e);
    }
}

async function pushMessageById(client, id, message) {
    try{
        const collection = await client.db("AllRooms").collection("rooms");
        const filter = {"_id": ObjectId(`${id}`)}
        const options = { upsert: false };
        const updateDoc = {
            $push: {messages : message }
        };
        const result = await collection.updateOne(filter, updateDoc, options);
        console.log( `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    } catch (e) {
        console.log(e);
    }
}

async function createRoom(client, server) {
    try{
        const collection = await client.db("AllRooms").collection("rooms");
        const room = { name : server.selectedName, SVG : server.selectedSVG, messages : [] }
        const result = await collection.insertOne(room);
        console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`);
    } catch (e) {
        console.log(e);
    }
}


module.exports = { listDataBase, getRooms, getMessagesById, pushMessageById, createRoom };