## Command line 

_Deploy your functions to the cloud_
$ firebase deploy   

_Run the shell to test locally - and manually - the functions_
$ firebase experimental:functions:shell


_Uglify ES7 code to ES5_ (Work in Progress) 
node ./node_modules/\@babel/cli/bin/babel ./index.js --out-dir public --copy-files --ignore node_modules

## Troubleshooting 

Cannot find module '/Users/busson-arnaud/Sites/card-game-coinche/functions/node_modules/grpc/src/node/extension_binary/node-v48-darwin-x64-unknown/grpc_node.node' :
``` rm -rf node_modules && nvm use && yarn install ```

command not found: firebase
``` npm get prefix ```
then edit your ~/.profile (or bash_profile) and add the path. Finally do ```source ~/.profile```. firebase command it should works


## Documentation : 

- https://firebase.google.com/docs/functions/local-emulator (Run function locally)

- https://firebase.google.com/docs/functions/

- https://firebase.googleblog.com/2017/09/testing-functions-locally-with-cloud.html

_Some notes on Babel_
- https://codeburst.io/babel-preset-env-cbc0bbf06b8f

_Use ES7 with cloud functions_
- https://codeburst.io/es6-in-cloud-functions-for-firebase-2-415d15205468


## Todo 

- Create lint rule (use the same as client/ module)
- Babelify 
- Create some unit test