const typeorm = require('typeorm')
const Question = require('../datamodel/_model_names').question
const { requestHandler } = require('./_helper')
const userRoles = require('../datamodel/_user_roles')


const QuestionRepository = () => typeorm.getRepository(Question, 'iptm-ses-db')

const createQuestion = (question, ack) => requestHandler(() => QuestionRepository().save(question), ack)

const getQuestions = ({ role, filter }, ack) => requestHandler(() => {

    if (!role)
        return Promise.reject(new Error('have no role in request'))

    if (role === userRoles.admin)
        return QuestionRepository().find(filter)

    if (role === userRoles.examinee) {

        const findFilter = { where: filter, order: 'RAND()', take: 10 }

        return QuestionRepository().createQueryBuilder()
            .where(`examId = :exam`, filter)
            .orderBy('RAND()')
            .limit(10)
            .getMany()

        // http://jan.kneschke.de/projects/mysql/order-by-rand/

    }


    return Promise.reject(new Error('incomplete request'))

}, ack)

const updateQuestion = (question, ack) => requestHandler(() => QuestionRepository().save(question), ack)

const deleteQuestion = (id, ack) => requestHandler(() => QuestionRepository().delete(id), ack)


module.exports = { createQuestion, getQuestions, updateQuestion, deleteQuestion }
