# QuestMatch
![Build and Deploy Status](https://github.com/porfanid/QuestMatch/workflows/Backend%20Deployment/badge.svg)&nbsp;![Firebase Status](https://img.shields.io/badge/Firebase-Active-brightgreen.svg)

![License](https://img.shields.io/github/license/porfanid/QuestMatch)  ![Node.js Version](https://img.shields.io/badge/Node.js-18.16.0-brightgreen.svg)  ![npm Version](https://img.shields.io/badge/npm-9.6.6-red.svg)

## BackEnd

### Functions that need to be here

These are functions that will be used to create the back end of the server. This consists of many parts.

1. the database, which will store the users, chats, groups etc,
2. The access that will control wether the Captcha has been set up correctly or not(I do not yet know if this will be necessary, but I think it will)
3. It will also check the user's login credentials when one tries to connect.
4. It will also be used to send emails and notifications to users.

### Programming Language

The programming language that will be used for the back end will be node js and an express server.
This is because nodejs is compatible with firebase and it has the easiest implementation.
