## Command line 

_Deploy your functions to the cloud_
$ firebase deploy   

_Run the shell to test locally - and manually - the functions_
$ firebase experimental:functions:shell


_Uglify ES7 code to ES5_ /!\ Please change path since it will create a redundant recursive folder /!\ 
node ./node_modules/\@babel/cli/bin/babel ./ --out-dir minify --copy-files --ignore node_modules

## Troubleshooting 

Cannot find module '/Users/busson-arnaud/Sites/card-game-coinche/functions/node_modules/grpc/src/node/extension_binary/node-v48-darwin-x64-unknown/grpc_node.node' :
``` rm -rf node_modules && nvm use && yarn install ```

command not found: firebase
``` npm get prefix ```
puis éditez votre fichier .profile (ou bash_profile) et ajouter le path. Faire un source ~/.profile, ça doit marcher


## Documentation : 

- https://firebase.google.com/docs/functions/local-emulator (Run function locally)

- https://firebase.google.com/docs/functions/

- https://firebase.googleblog.com/2017/09/testing-functions-locally-with-cloud.html

_Some notes on Babel_
- https://codeburst.io/babel-preset-env-cbc0bbf06b8f

_Use ES7 with cloud functions_
- https://codeburst.io/es6-in-cloud-functions-for-firebase-2-415d15205468




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
