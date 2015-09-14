Landing
===

## Develop
1. `npm install`
2. `gulp dev` (browser should open automatically using browsersync)

## Deploy to a dokku instance
This expects you have a server with dokku where your credentials (public key) registered.

1. `ssh -t dokku@<ip> apps:create <page name>`
2. `git remote add <remote name> dokku@<ip/server address>:<page name>`
3. `git push <remote name> <branch>:master`
4. `Open landingpage at <page name>.<ip/server address>`
