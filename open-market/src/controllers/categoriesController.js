import connection from "../db.js";
import printError from "../services/printError.js";

export async function getCategories(req, res) {
    try {
        const categorias = await connection.query(`SELECT * FROM categorias`)
        res.send(categorias.rows)
    } catch (error) {
        printError(res, error)
    }
}

export async function postCategories(req, res) {
    try {
        const { nome } = req.body

        const categories = await connection.query(`SELECT id FROM categorias
            WHERE nome=$1`, [nome])

        if (categories.rowCount !== 0) {
            return res.status(409).send('categoria já cadastrado')
        }

        await connection.query(`INSERT INTO categorias (nome)
            VALUES ($1)`, [nome])

        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}

export async function putCategories(req, res) {
    try {
        const id = parseInt(req.params.id)
        const { nome } = req.body

        if (isNaN(id) || !Number.isInteger(id)) {
            return res.sendStatus(404)
        }

        const matchId = await connection.query(`SELECT id FROM categorias
            WHERE id=$1`, [id])

        if (matchId.rowCount === 0) {
            return res.sendStatus(404)
        }

        const categories = await connection.query(`SELECT id FROM categorias
            WHERE nome=$1`, [nome])

        if (categories.rowCount !== 0) {
            return res.status(409).send('categoria já cadastrado')
        }

        await connection.query(`UPDATE categorias
            SET nome=$1
            WHERE id=${id}`, [nome])

        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}

export async function deleteCategories(req, res) {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id) || !Number.isInteger(id)) {
            return res.sendStatus(404)
        }

        const matchId = await connection.query(`SELECT id FROM categorias
            WHERE id=$1`, [id])

        if (matchId.rowCount === 0) {
            return res.sendStatus(404)
        }

        await connection.query(`DELETE FROM categorias WHERE id=$1`, [id])

        res.sendStatus(200)
    } catch (error) {
        printError(res, error)
    }
}
