import connection from "../db.js";
import printError from "../services/printError.js";

export default async function validateToken(req, res, next) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).send('faltando token')
        }
        const user = await connection.query(`SELECT * FROM sessoes
            WHERE token=$1`, [token])

        if (user.rows.length === 0) {
            return res.status(401).send('token errado')
        }
        const matchId = await connection.query(`SELECT id FROM usuarios
            WHERE id=${user.rows[0].idUsuario}`)

        if (matchId.rows.length === 0) {
            return res.status(401).send('token errado')
        }

        res.locals.user = user.rows[0]

        next()
    } catch (error) {
        printError(res, error)
    }
}
