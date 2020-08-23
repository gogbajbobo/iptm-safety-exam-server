const { EntitySchema } = require('typeorm')
const Exam = require('./_model_names').exam


const Schema = new EntitySchema ({
    name: Exam,
    target: Exam,
    columns: {
        id: { type: Number, primary: true, generated: true },
        title: { type: String }
    },
})


module.exports = { Schema }
