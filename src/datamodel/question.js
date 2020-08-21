const { EntitySchema } = require('typeorm')
const Exam = require('./exam')

const Model = 'Question'

const Schema = new EntitySchema ({
    name: Model,
    target: Model,
    columns: {
        id: { type: Number, primary: true, generated: true },
        text: { type: String },
    },
    relations: {
        exam: {
            target: Exam.Model,
            type: 'many-to-one',
            cascade: true,
            nullable: false,
        }
    }
})

module.exports = { Model, Schema }
