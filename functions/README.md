deploy firebase function : 

$ firebase deploy



Démarrage de la partie :

// ToDo :
- Move "table" action from "users" folder to separate "table" folder
- Pour le moment je suis arrêté au moment de la distribution des cartes. J'ai créé une function, mais je n'arrive pas à la tester...
- Test, test, test ...

Solution 1 :

Chaque fois qu'un user est ajouté dans la table (une fois qu'il a mis son nom) :
    - On créé une nouvelle table (on le fait coté front pour le moment)
    - On ajoute 3 users (coté front également) et on les attaches à la table en question
    
    - chaque fois qu'un user est créé (coté function):
        Si il y a 4 joueurs sur une meme table, on distribue les cartes aux joueurs attachés
        
        
Solution 2 :

Chaque fois qu'un user est ajouté dans la table (une fois qu'il a mis son nom) :
    - On créé une nouvelle table (détection coté back)