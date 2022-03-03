import joi from "joi"

const schema = joi.object({
    nome: joi.string().required(),
    preco: joi.number().required()
})

export default schema
