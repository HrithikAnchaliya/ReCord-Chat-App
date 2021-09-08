const { listDataBase, getRooms, getMessagesById, pushMessageById, createRoom } = require("../Utils/functions");
const { OAuth2Client } = require('google-auth-library');
const { Server } = require("socket.io");
const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = async function(app,Client,io){

    try {
        await Client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }

    io.on('connection', (socket) => {
        console.log('A user connected');

        var roomID;

        socket.on('room', (RoomID) => {
            roomID = RoomID
            console.log(`Joined Room ${RoomID}`)
            socket.join(RoomID);
            console.log(socket.rooms)
        })

        socket.on('leftRoom', () => {
            if(roomID){
                console.log(`Left Room ${roomID}`)
                socket.leave(roomID)
                console.log(socket.rooms)
            }
        })

        socket.on('SendMessage', ({name, message, RoomID}) => {
            console.log("Messgae Received")
            let newMessage = {name, message, timestamp : new Date()}
            pushMessageById(Client, RoomID, newMessage)
            socket.to(roomID).emit('message', {name, message, timestamp : new Date()});
            io.sockets.emit(`${RoomID}-latest-message`, {message});
        })

        socket.on("serverAdded", () => {
            io.emit("reUpdateRoom")
        })
    });


    app.get("/", (req, res) => {
        res.status(200).send("Chat App Backend");
    });    

    app.post("/api/v1/auth/google", async (req, res) => {
        try{
            const { token }  = req.body
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const { name, email, picture } = ticket.getPayload();    
            const user =  {
                name : name,
                email : email,
                picture : picture
            }
            res.status(200)
            res.json(user)
        }
        catch(e){
            console.log(e);
        }
    });

    app.get("/getrooms", async (req, res) => {
        let rooms = await getRooms(Client);
        res.status(200).json(rooms)
    });

    app.post("/getMessages", async (req, res) => {
        try{
            if(req.body.id){
                let messages = await getMessagesById(Client, req.body.id);
                res.status(200).json(messages);
            }
        } catch (e) {
            console.error(e);
        }

    })

    app.post("/api/addserver", async (req, res) => {
        try{
            if(req.body.server){
                await createRoom(Client, req.body.server)
                res.status(200).send("Successfully Added");
            }
        } catch (e) {
            console.error(e);
        }

    })
}


