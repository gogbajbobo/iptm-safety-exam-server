const { EntitySchema } = require('typeorm')
const Question = require('./_model_names').question
const Answer = require('./_model_names').answer


const Schema = new EntitySchema ({
    name: Answer,
    target: Answer,
    columns: {
        id: { type: Number, primary: true, generated: true },
        text: { type: String },
        isCorrect: { type: Boolean },
    },
    relations: {
        question: {
            target: Question,
            type: 'many-to-one',
            cascade: true,
            nullable: false,
        }
    }
})

module.exports = { Schema }
