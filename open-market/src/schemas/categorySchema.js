import joi from "joi"

const schema = joi.object({
    nome: joi.string().required()
})

export default schema
