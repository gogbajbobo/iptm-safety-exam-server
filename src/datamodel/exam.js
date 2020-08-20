const { EntitySchema } = require('typeorm')

const Model = 'Exam'

const Schema = new EntitySchema ({
    name: Model,
    target: Model,
    columns: {
        id: { type: Number, primary: true, generated: true },
        title: { type: String }
    }
})

module.exports = { Model, Schema }
