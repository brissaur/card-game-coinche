export const emptyCollection = collectionRef =>
    console.log('collectionRef', collectionRef) ||
    collectionRef.get().then((querySnapshot) => {
        console.log('querySnapshot', querySnapshot);
        querySnapshot.forEach(async (snapshot) => {
            console.log('snapshot', snapshot);
            await collectionRef.doc(snapshot.id).delete();
        });
    });
