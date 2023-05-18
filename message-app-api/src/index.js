require("dotenv").config();
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const port = process.env.PORT 


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/users', async (req, res, next) => { 
    const users = await prisma.user.findMany()
    res.json(users)
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

app.post('/users', async (req, res, next) => {
    const {username, nickname, email, password} = req.body
    try {
    const result = await prisma.user.create({ 
        data: {
            username,
            nickname,
            email,
            password
        },
    })
    res.json(result)
    }catch (error){
        next(error.message)
    }
})

app.patch('/users/:id', async (req, res, next) => {
    try {
        const user = await prisma.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.json(user)
    }catch (error) {
        next(error.message)
    }
})

app.get('/servers', async (req, res, next) => {
    try {
        const server = await prisma.server.findMany()
        res.json(server)
    }catch (error) {
        next(error.message)
    }
})
app.get('/servers/:id', async (req, res, next) => {
    try {
        const servers = await prisma.server.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(servers)
    }catch (error) { 
        next(error.message)
    }
})

app.post('/servers', async (req, res, next) => { 

    try {
        const servers = await prisma.server.create({
            data: {...req.body}
        });
        res.json(servers)
    }catch (error) { 
        next(error.message)
    }
})

app.delete('/servers/:id', async (req, res, next) => {
    try{
        const servers = await prisma.server.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(servers)
    } catch(error) {
        next(error.message)
    }
})

app.listen(port, () => { 
    console.log(`listening on ${port}`)
})

