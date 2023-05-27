import firebase from "firebase";
import { db } from "./firebase"

export const initGet = async(uid) => {
    const todo = await db
    .collection("todo")
    .orderBy("createdAt","desc")
    .where("uid", "==", uid);

    return todo.get().then((snapShot) => {
        let todos = [];
        snapShot.forEach((doc) => {
            todos.push({
                id: doc.id,
                content: doc.data().content,
                isConplate: doc.data().isConplate,
            });
        });
        return todos;
    })
}

export const addTodo = (content, uid) => {
    db.collection("todo").add({
        content: content,
        uid: uid,
        isConplate: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const todoDelete = (id) => {
    db.collection("todo").doc(id).delete();
}