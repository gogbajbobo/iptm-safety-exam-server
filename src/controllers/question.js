const typeorm = require('typeorm')
const Question = require('../datamodel/_model_names').question
const Answer = require('../datamodel/_model_names').answer
const { requestHandler } = require('./_helper')
const userRoles = require('../datamodel/_user_roles')
const { CONNECTION_NAME } = require('../constants')


const QuestionRepository = () => typeorm.getRepository(Question, CONNECTION_NAME)
const AnswerRepository = () => typeorm.getRepository(Answer, CONNECTION_NAME)

const createQuestion = (question, ack) => requestHandler(() => QuestionRepository().save(question), ack)

const getQuestions = ({ role, exam }, ack) => requestHandler(() => {

    if (!role)
        return Promise.reject(new Error('have no role in request'))

    if (role === userRoles.admin)
        return QuestionRepository().find({ exam })

    if (role === userRoles.examinee)
        return getQuestionsToTakeExam({ exam })

    return Promise.reject(new Error('incomplete request'))

}, ack)

const getQuestionsToTakeExam = examFilter => {

    // http://jan.kneschke.de/projects/mysql/order-by-rand/
    return QuestionRepository().createQueryBuilder()
        .where(`examId = :exam`, examFilter)
        .orderBy('RAND()')
        .limit(10)
        .getMany()
        .then(questions => Promise.all(questions.map(q => {

                return AnswerRepository().createQueryBuilder()
                    .where(`questionId = :question`, { question: q.id })
                    .getMany()
                    .then(blankedAnswers)
                    .then(answers => ({ ...q, answers }))

            }))
        )

}

const blankedAnswers = answers => answers.map(a => ({ ...a, isCorrect: undefined }))

const updateQuestion = (question, ack) => requestHandler(() => QuestionRepository().save(question), ack)

const deleteQuestion = (id, ack) => requestHandler(() => QuestionRepository().delete(id), ack)


module.exports = { createQuestion, getQuestions, updateQuestion, deleteQuestion }
