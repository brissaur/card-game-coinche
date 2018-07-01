export const emptyCollection = async (collectionRef) =>
    collectionRef.get().then(async (querySnapshot) => {
        querySnapshot.forEach(async (snapshot) => {
            await collectionRef.doc(snapshot.id).delete();
        });
        return Promise.resolve();
    });
