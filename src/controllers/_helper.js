const requestHandler = (requestPromise, ack) => {

    return requestPromise()
        .then(payload => ack({ payload }))
        .catch(error => ack({ error: error.message }))

}

module.exports = { requestHandler }