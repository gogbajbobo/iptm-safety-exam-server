const { EntitySchema } = require('typeorm')
const Exam = require('./_model_names').exam
const ExamResult = require('./_model_names').examResult


const Schema = new EntitySchema ({
    name: ExamResult,
    target: ExamResult,
    columns: {
        id: { type: Number, primary: true, generated: true },
        numberOfCorrectAnswers: { type: Number },
    },
    relations: {
        exam: {
            target: Exam,
            type: 'many-to-one',
            onDelete: 'CASCADE',
            nullable: false,
        },
    },
})


module.exports = { Schema }
