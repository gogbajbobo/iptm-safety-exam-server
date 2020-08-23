const { EntitySchema } = require('typeorm')
const Question = require('./_model_names').question
const Exam = require('./_model_names').exam


const Schema = new EntitySchema ({
    name: Question,
    target: Question,
    columns: {
        id: { type: Number, primary: true, generated: true },
        text: { type: String },
    },
    relations: {
        exam: {
            target: Exam,
            type: 'many-to-one',
            onDelete: 'CASCADE',
            nullable: false,
        }
    },
})


module.exports = { Schema }
