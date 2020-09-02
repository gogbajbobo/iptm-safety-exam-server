const SocketRooms = {

    ADMIN: 'admin',
    EXAMINEE: 'examinee',

}

const socketRoomAssignment = socket => {

    const { user } = socket

    if (!user) return

    if (user.roles.includes('admin')) socket.join(SocketRooms.ADMIN)
    if (user.roles.includes('examinee')) socket.join(SocketRooms.EXAMINEE)

}

module.exports = { SocketRooms, socketRoomAssignment }
