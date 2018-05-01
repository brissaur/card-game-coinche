export const emptyCollection = collectionRef =>
    collectionRef.get().then((querySnapshot) => {
        querySnapshot.forEach(async (snapshot) => {
            await collectionRef.doc(snapshot.id).delete();
        });
    });
