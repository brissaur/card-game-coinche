export const emptyCollection = collectionRef =>
    collectionRef.get().then((querySnapshot) => {
        const promises = [];
        querySnapshot.forEach((snapshot) => {
            promises.push(collectionRef.doc(snapshot.id).delete());
        });

        return Promise.all(promises);
    });
