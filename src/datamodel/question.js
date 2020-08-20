const EntitySchema = require('typeorm').EntitySchema
const Exam = require('./exam')

const Model = 'Question'

const Schema = new EntitySchema ({
    name: Model,
    target: Model,
    columns: {
        id: { type: Number, primary: true, generated: true },
        text: { type: String },
        isCorrect: { type: Boolean, default: false },
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
