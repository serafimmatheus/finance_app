import express from 'express'
import { prisma } from './lib/prisma'
import zod from 'zod'
import { hash } from 'bcrypt'

export const app = express()

app.use(express.json())

app.get('/api/users', async (req, res) => {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post('/api/users', async (req, res) => {
    const schemaBody = zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        email: zod.string().email(),
        passwordHash: zod
            .string()
            .min(8, { message: 'Minimo 8 caracteres' })
            .max(30, { message: 'Maximo 30 caracteres' }),
    })

    try {
        const { email, firstName, lastName, passwordHash } = schemaBody.parse(
            req.body
        )

        const password = await hash(passwordHash, 10)

        const newUser = {
            email,
            firstName,
            lastName,
            password,
        }

        const user = await prisma.user.create({
            data: newUser,
        })

        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
})
