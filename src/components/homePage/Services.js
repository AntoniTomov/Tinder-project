import firebase, { db } from '../../firebase';

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

export function updateUserInFirebase(userId, userIdToBeAdded, arrProp) {
    return db.collection('users').doc(userId).update({
        [arrProp]: firebase.firestore.FieldValue.arrayUnion(userIdToBeAdded),
    })
}