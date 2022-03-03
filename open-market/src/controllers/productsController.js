import connection from "../db.js";
import printError from "../services/printError.js";

export async function getProducts(req, res) {
    try {
        const products = await connection.query(`SELECT * FROM produtos`)
        res.send(products.rows)
    } catch (error) {
        printError(res, error)
    }
}

export async function postProducts(req, res) {
    try {
        const { nome, preco } = req.body
        const idUsuario = res.locals.user.idUsuario

        const product = await connection.query(`SELECT id FROM produtos
            WHERE nome=$1`, [nome])

        if (product.rowCount !== 0) {
            return res.status(409).send('produto já cadastrado')
        }

        await connection.query(`INSERT INTO produtos (nome, preco, "idUsuario")
            VALUES ($1, $2, ${idUsuario})`, [nome, preco])

        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}

export async function putProducts(req, res) {
    try {
        const id = parseInt(req.params.id)
        const { nome, preco } = req.body
        const idUsuario = res.locals.user.idUsuario

        if (isNaN(id) || !Number.isInteger(id)) {
            return res.sendStatus(404)
        }

        const matchId = await connection.query(`SELECT id FROM produtos
            WHERE id=$1`, [id])

        if (matchId.rowCount === 0) {
            return res.sendStatus(404)
        }

        const product = await connection.query(`SELECT id FROM produtos
            WHERE nome=$1`, [nome])

        if (product.rowCount !== 0 && product.rows[0].id !== id) {
            return res.status(409).send('produto já cadastrado')
        }

        await connection.query(`UPDATE produtos
            SET nome=$1, preco=$2, "idUsuario"=${idUsuario}
            WHERE id=${id}`, [nome, preco])

        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}

export async function deleteProducts(req, res) {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id) || !Number.isInteger(id)) {
            return res.sendStatus(404)
        }

        const matchId = await connection.query(`SELECT id FROM produtos
            WHERE id=$1`, [id])

        if (matchId.rowCount === 0) {
            return res.sendStatus(404)
        }

        await connection.query(`DELETE FROM produtos WHERE id=$1`, [id])

        res.sendStatus(200)
    } catch (error) {
        printError(res, error)
    }
}
