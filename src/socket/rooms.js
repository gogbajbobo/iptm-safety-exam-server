const SocketRooms = {

    ADMIN: 'admin',
    USER: 'user',

}

const socketRoomAssignment = socket => {

    const { user } = socket

    if (!user) return

    if (user.roles.includes('admin')) socket.join(SocketRooms.ADMIN)
    if (user.roles.includes('user')) socket.join(SocketRooms.USER)

}

module.exports = { SocketRooms, socketRoomAssignment }
