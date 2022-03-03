import connection from "../db.js"
import bcrypt from 'bcrypt'
import printError from '../services/printError.js'
import { v4 } from "uuid"

export async function register(req, res) {
    try {
        const { nome, email } = req.body
        const senha = bcrypt.hashSync(req.body.senha, 8)

        const user = await connection.query(`SELECT email FROM usuarios`)

        if (user.rows.length > 0) {
            return res.status(400).send('conflito')
        }

        await connection.query(`INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)`, [nome, email, senha])

        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body
        const user = await connection.query(`SELECT * FROM usuarios
            WHERE email=$1`, [email])

        if (user.rows.length === 0) {
            return res.status(401).send('email errado')
        }
        else if (!bcrypt.compareSync(senha, user.rows[0].senha)) {
            return res.status(401).send('senha errada')
        }

        const token = v4()
        await connection.query(`INSERT INTO sessoes ("idUsuario", token)
            VALUES (${user.rows[0].id}, '${token}')`)

        res.send(token)

    } catch (error) {
        printError(res, error)
    }
}
