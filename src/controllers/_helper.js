const requestHandler = (requestPromise, ack) => {

    return requestPromise()
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

module.exports = { requestHandler }