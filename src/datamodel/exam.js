const EntitySchema = require('typeorm').EntitySchema

/* eslint-disable fp/no-mutation,fp/no-this */
class Exam {
    constructor(id, title) {
        this.id = id
        this.title = title
    }
}
/* eslint-enable fp/no-mutation,fp/no-this */

const Schema = new EntitySchema ({
    name: Exam.name,
    target: Exam,
    columns: {
        id: { type: Number, primary: true, generated: true },
        title: { type: String }
    }
})

module.exports = { Model: Exam, Schema }
