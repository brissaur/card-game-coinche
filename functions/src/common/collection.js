export const emptyCollection = collectionRef =>
    collectionRef.get().then((querySnapshot) => {
        const promises = [];
        querySnapshot.forEach((snapshot) => {
            promises.push(collectionRef.doc(snapshot.id).delete());
        });

        return Promise.all(promises);
    });


export const deleteCollection = (db, collectionRef) => {
    let query = collectionRef.limit(20);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve, reject);
    });
};

function deleteQueryBatch(db, query, resolve, reject) {
    query.get()
        .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size === 0) {
                return 0;
            }

            // Delete documents in a batch
            let batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted) => {
            if (numDeleted === 0) {
                resolve();
                return;
            }

            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
                deleteQueryBatch(db, query, resolve, reject);
            });
        })
        .catch(reject);
}