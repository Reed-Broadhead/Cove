require("dotenv").config();
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const { fieldEncryptionMiddleware } = require('prisma-field-encryption')
const cookieParser = require('cookie-parser');
const port = process.env.PORT 
const cors = require('cors');
const { runInNewContext } = require("vm");
const http = require('http');

const app = express();

// const cookie = require('cookie');


const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());
app.use(express.json());
app.use(cors())
app.use(cookieParser());


app.get('/users', async (req, res, next) => { 
    try {
    const users = await prisma.user.findMany({
        include: {
            servers: true
            
        }}
    )
    res.json(users)
    } catch(error){
        next(error.message);
    }
}) 

app.get('/users/:id', async (req, res, next) =>{
    try {
        const users = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(users)
    }catch (error) {
        next(error.message)
    }
})

app.post('/signup', async (req, res, next) => {
    const user = await prisma.user.create({ 
        data: {
            username: req.body.username,
            nickname: req.body.nickname,
            email: req.body.email,
            password: req.body.password
        },
    })
    res.cookie('user', user)
    res.status(201).send({message: "User created successfully!", user: user})

})

app.patch('/usersFriend', async (req, res, next) => {
    console.log(req.body.friendsOf)
    try {
        const user = await prisma.user.update({
            where: {
                id: parseInt(req.cookies.user.id)
            },
            data: {friendsOf : {
                connect : {
                    id: req.body.friendsOf
                }
            } }
        })
        
        res.json(user)
        
    }catch (error) {
        next(error.message)
    }
})

app.get('/servers', async (req, res, next) => {
    try {
        const server = await prisma.server.findMany({
            include: {
                users: true,
                groups: true,
            }
        })
        res.json(server)
    }catch (error) {
        next(error.message)
    }
})
app.get('/servers/:id', async (req, res, next) => {
    console.log(req.params.id)
    try {
        const servers = await prisma.server.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                users: {include: {user: true}},
                groups: {include: {messages: {include: {sender: true}}}},
            }
        })
        res.status(200).send({server: servers})
    }catch (error) { 
        next(error.message)
    }
})


app.post('/login', async (req, res, next) => { 
    console.log(req.body)
    try {
        const {password, email} = req.body
        const user = await prisma.user.findUnique({
            where: {email: email},
            include: {
                friends: true,
                friendsOf: true,
                requests: true,
                servers: {include: {server: true} },
                ownedServers: true,
                serverRequests: {include: {server: {include:{groups: true}}} },
                groups: {include: {
                    group: {
                        include:{
                            server: true,
                            messages: true,
                        } 
                    }
                }}
            }
        })
        if (user.password === password) {
            res.cookie('user', user)
            res.status(200).send({message: "Logged in!", user: user})
        }
    }
    catch (err) {
        res.status(401).send({message: err.message})
    }
})



app.get('/check', (req, res) => {
    if (req.cookies.user)
        res.status(200).send({user: req.cookies.user})
    else
        res.status(401).send(null)
})

app.get('/logout', function(req, res){
    res.clearCookie('user');
    res.send({message: "cookie cleared"})
})

app.post('/getFriends', async (req, res, next) =>{ 
    try {
        const {username} = req.body
        const user = await prisma.user.findUnique({
            where:{username: username}
        })
        res.status(200).send({message:'user found!', user: {id: user.id, username: user.username}})
    } catch (error) { 
        next(error.message)
    }
})

app.post('/request', async (req, res, next) => {
    
    try{
    
    const request = await prisma.requests.create({
        data: {
            senderName: req.body.senderName,
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            pending: true
        }
    })
    res.status(201).send({message: "response created successfully!"})
    }catch(error){
        res.status(500).send({ message: error.message });;
    }
})

app.delete('/request/:id', async (req, res, next) => {

        try{
            const id = parseInt(req.params.id);
            const request = await prisma.requests.delete({where: {id: id}})

            res.cookie('user', req.body.user)
            res.status(200).send({message: 'deleted successfully'})
        }catch(err){
            next(err.message);}
}) 

app.post('/userServer', async (req, res, next) => {
    try{
        const userServer = await prisma.userServer.create({
            data: {
                userId: req.body.data.userId,
                serverId: req.body.data.serverId
            }
        })
        res.status(201).send({message: "user added"})
    }catch(error){
        next(error.message)
    }
})

app.delete('/userServer/:id', async (req, res, next) => {
        try{
            const id = parseInt(req.params.id);
            const request = await prisma.userServer.delete({where: {id: id}})
            res.status(200).send({message: "user removed from server!"})
        }catch(error){ 
            next(error.message)
        }
})

app.delete('/serverRequests/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const request = await prisma.serverRequests.delete({where: {id: id}})
        res.status(200).send({message: "requests removed!"})
    }catch(error){
        next(error.message)
    }
})

app.post('/serverRequests', async (req, res, next) => {
    try{
        const serverRequests = await prisma.serverRequests.create({
            data: {
                serverId: req.body.serverId,
                receiverId: req.body.receiverId
            }
        })
    }catch(error){
        next(error.message)
    }
})

app.listen(port, () => { 
    console.log(`listening on ${port}`)
})



