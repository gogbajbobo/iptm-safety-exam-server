const { EntitySchema } = require('typeorm')
const Question = require('./question')

const Model = 'Answer'

const Schema = new EntitySchema ({
    name: Model,
    target: Model,
    columns: {
        id: { type: Number, primary: true, generated: true },
        text: { type: String },
        isCorrect: { type: Boolean },
    },
    relations: {
        question: {
            target: Question.Model,
            type: 'many-to-one',
            cascade: true,
            nullable: false,
        }
    }
})

module.exports = { Model, Schema }
