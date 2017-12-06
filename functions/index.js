const functions = require('firebase-functions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.createTableAndJoinUser = () => {
//
// };

// exports.autoCreateFakeUser = () => {
//
// };

// When users join the table, we deal the cards
// exports.dealCards = functions.database.ref('/tables/{tableId}/users').onCreate(event => {

        // console.log('dealCards function is called');

        // return event;

        // const original = event.data.val();
        // const cards = [
        //     '7S', '8S', '9S', '10S', 'AS', 'JS', 'QS', 'KS',
        //     '7H', '8H', '9H', '10H', 'AH', 'JH', 'QH', 'KH',
        //     '7D', '8D', '9D', '10D', 'AD', 'JD', 'QD', 'KD',
        //     '7C', '8C', '9C', '10C', 'AC', 'JC', 'QC', 'KC',
        // ];
        //
        // const userCard = [];
        // let y = 1;
        // for(let i = cards.length-1;i>=0;i--){
        //     cards.splice(Math.floor(Math.random()*cards.length), 1);
        //     userCard.push({
        //         id: user.id,
        //         cards: cards.splice(Math.floor(Math.random()*cards.length), 1)
        //     })
        //     console.log(cards);
        //     if(y === 8){
        //         y = 1;
        //     }
        // }


        // Only edit data when it is first created.
        // if (event.data.previous.exists()) {
        //     return null;
        // }
        // Exit when the data is deleted.
        // if (!event.data.exists()) {
        //     return null;
        // }
        // Grab the current value of what was written to the Realtime Database.

        // console.log('Uppercasing', event.params.pushId, original);
        // const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//        return event.data.ref.parent.child('uppercase').set(uppercase);

// });

exports.dealCards = functions.firestore.document('tables/{tableId}').onCreate(event => {
    const original = event.data.data()
    console.log('dealCards', event.params.tableId, original)
    //const uppercase date()= original.toUpperCase()
    // return event.data.ref.set('toto');
    return 'toto'
})

// exports.dealCards = functions.firestore
//     .document('/tables/{tableId}/users')
//     .onCreate(event => {
//         console.log('dealCards function triggered !');
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        //var newValue = event.data.data();

        // access a particular field as you would any JS property
        //var name = newValue.name;

        // perform desired operations ...
    // });
