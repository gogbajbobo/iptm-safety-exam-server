const EntitySchema = require('typeorm').EntitySchema

class Exam {
    constructor(id, title) {
        this.id = id
        this.title = title
    }
}

const Schema = new EntitySchema ({
    name: Exam.name,
    target: Exam,
    columns: {
        id: { type: Number, primary: true, generated: true },
        title: { type: String }
    }
})

module.exports = { Model: Exam, Schema }
