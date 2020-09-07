const typeorm = require('typeorm')
const Answer = require('../datamodel/_model_names').answer
const ExamResult = require('../datamodel/_model_names').examResult
const { requestHandler } = require('./_helper')
const { CONNECTION_NAME } = require('../constants')


const AnswerRepository = () => typeorm.getRepository(Answer, CONNECTION_NAME)
const ExamResultRepository = () => typeorm.getRepository(ExamResult, CONNECTION_NAME)

const createAnswer = (answer, ack) => requestHandler(() => AnswerRepository().save(answer), ack)

const getAnswers = (filter, ack) => requestHandler(() => AnswerRepository().find(filter), ack)

const updateAnswer = (answer, ack) => requestHandler(() => AnswerRepository().save(answer), ack)

const setAnswerAsCorrect = (answer, ack) => {

    const { id, question } = answer
    AnswerRepository().find({ question })
        .then(answers => answers.map(a => ({ ...a, isCorrect: a.id === id })))
        .then(answers => requestHandler(() => AnswerRepository().save(answers), ack))

}

const deleteAnswer = (id, ack) => requestHandler(() => AnswerRepository().delete(id), ack)

const checkAnswers = (payload, ack) => requestHandler(() => {

    const { exam, answers } = payload

    return AnswerRepository().createQueryBuilder()
        .where('questionId IN (:...questionsIds)', { questionsIds: Object.keys(answers) })
        .andWhere('id IN (:...ids)', { ids: Object.values(answers) })
        .andWhere('isCorrect = :isCorrect', { isCorrect: true })
        .getCount()
        .then(numberOfCorrectAnswers => {

            const examResult = { exam, numberOfCorrectAnswers }
            return ExamResultRepository().save(examResult)
                .then(() => numberOfCorrectAnswers)

        })

}, ack)

module.exports = {
    createAnswer,
    getAnswers,
    updateAnswer,
    setAnswerAsCorrect,
    deleteAnswer,
    checkAnswers
}
