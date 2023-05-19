require("dotenv").config();
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const { fieldEncryptionMiddleware } = require('prisma-field-encryption')
const cookieParser = require('cookie-parser');
const port = process.env.PORT 
const cors = require('cors');
const { runInNewContext } = require("vm");

// const cookie = require('cookie');

const app = express();
const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());
app.use(express.json());
app.use(cors())
app.use(cookieParser());


app.get('/users', async (req, res, next) => { 
    try {
    const users = await prisma.user.findMany()
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

app.post('/login', async (req, res, next) => { 
    console.log(req.body)
    try {
        const {password, email} = req.body
        const user = await prisma.user.findUnique({where: {email: email}})
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
        res.status(401).send({message: "Not logged in."})
})


app.listen(port, () => { 
    console.log(`listening on ${port}`)
})

