const express = require('express');
const storage = require('./storage/index');
const api = express();

api.get('/healthcheck', async (req, res) => {

    const collection = 'tables/UJgnB48Zgv0uCiyuSqui/cardsPlayed';
    const totalOfCardsPlayed = await storage.collection(collection)
        .get().then((querySnapshot) => {
            return querySnapshot.size;
    });

    res.send(`Number of items in collection (${collection}): ` + totalOfCardsPlayed)

});

api.listen(3001, () => {
    console.log('Api listening on 3001')
});