## Architecture

Warning: There MUST have an package.json in the "functions source directory" (required by firebase)

- public : Contain babelified code that will be deploy
- .nvmrc : Contain the node version that works with the projects. Use ```nvm use``` to automatically select the correct node version
- babelify.sh : Contain code that babelify the source code
- firebase.json : Contain some settings for firebase, especially the folder that would deployed
- index.js : Contain the source code. You dev on this one

## Firebase.json sample

- https://github.com/jthegedus/firebase-functions-next-example/blob/master/firebase.json
- https://github.com/firebase/functions-samples/blob/master/paypal/firebase.json
- https://stackoverflow.com/questions/47756264/cloud-functions-firebase-cli-predeploy-error-typescript/48000503#48000503
- https://github.com/firebase/functions-samples/tree/master/typescript-getting-started

Each firebase "services" as its own key (ex : "hosting", "functions", )

functions:source => Is where your package.json for "functions" reside

"hosting" key => Only use for static "public" file (index.html, css file ...)

## Command line 

_Deploy your functions to the cloud (this will automatically call predeploy hook from firebase.json)_
$ yarn deploy

_Run the shell to test locally - and manually - the functions_
$ yarn shell

_Uglify ES7 code to ES5_ (already included in yarn deploy and yarn shell ) 
node ./node_modules/\@babel/cli/bin/babel ./index.js --out-dir public --copy-files --ignore node_modules

## Troubleshooting 

You need firebase version >=3.17.3 for the hook to be trigger

Cannot find module '/Users/busson-arnaud/Sites/card-game-coinche/functions/node_modules/grpc/src/node/extension_binary/node-v48-darwin-x64-unknown/grpc_node.node' :
``` rm -rf node_modules && nvm use && yarn install ```

command not found: firebase
``` npm get prefix ```
then edit your ~/.profile (or bash_profile) and add the path. Finally do ```source ~/.profile```. firebase command it should works


## Documentation : 

- https://firebase.google.com/docs/functions/local-emulator (Run function locally)

- https://firebase.google.com/docs/functions/

- https://firebase.googleblog.com/2017/09/testing-functions-locally-with-cloud.html

_Firebase cli doc_
- https://firebase.google.com/docs/cli/

_Firebase deployment doc (firebase.json file)_
- https://firebase.google.com/docs/hosting/deploying

_Some notes on Babel_
- https://codeburst.io/babel-preset-env-cbc0bbf06b8f

_Use ES7 with cloud functions_
- https://codeburst.io/es6-in-cloud-functions-for-firebase-2-415d15205468


## Todo 

- Create lint rule (use the same as client/ module)
- Babelify 
- Create some unit test