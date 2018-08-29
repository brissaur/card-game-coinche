import { QuerySnapshot, CollectionReference, DocumentSnapshot } from "@google-cloud/firestore";

export const emptyCollection = (collectionRef: CollectionReference) =>
    collectionRef.get().then((querySnapshot: QuerySnapshot) => {
        querySnapshot.forEach(async (snapshot: DocumentSnapshot) => {
            await collectionRef.doc(snapshot.id).delete();
        });
    });