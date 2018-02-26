## Documentation

https://firebase.google.com/docs/firestore/query-data/get-data

https://firebase.google.com/docs/reference/js/firebase.firestore

https://groups.google.com/forum/#!topic/google-cloud-firestore-discuss/D0yA368nlag



- Le Joueur réel joue une carte
    - create trick
- Coté function, l'event onCreate de "trick" est triggé
    - On regarde à qui est le tour (giveHandNextPlayer)
    - Et si le nouveau joueur est un "robot" on le fait jouer (create trick coté back)
    - Sinon on ne fait rien (on attends que )
