import { db } from '../../firebase';

export function createChatRoom(userOneId, userTwoId) {
    const chatRoomDocId = userOneId > userTwoId ? `${userTwoId}_${userOneId}` : `${userOneId}_${userTwoId}`;
    db.collection('chatRooms').doc(chatRoomDocId).set({
        messages: [],
        users: [userOneId, userTwoId],
        isTyping: false,
    })
        .then(() => console.log("Successfully created chatRoom with users: ", [userOneId, userTwoId]))
        .catch((error) => console.log("Error on chatRoom creation: ", error.message))
}