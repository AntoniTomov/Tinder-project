import firebase, { db } from '../../firebase';

export const sentMessage = (chatId, userId, message) => {
    const targetChatRef = db.collection('chatRooms').doc(chatId);
    targetChatRef.update({
            messages: firebase.firestore.FieldValue.arrayUnion({ message: message, sender: userId, createdAt: Date.now() }),
            lastMessageTimestamp: Date.now(),
            // timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
}