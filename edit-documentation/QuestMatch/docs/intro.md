---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **QuestMatch in less than 5 minutes**.

## Getting Started

Get started by **going to the [GitHub project page](https://github.com/porfanid/QuestMatch)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.16.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

- [npm](https://www.npmjs.com/) version 9.6.6 or above

- [webstorm](https://www.jetbrains.com/webstorm/):
    I would recommend the community edition because it is free but it does not really matter

### Implement new feature

Implement a new QuestMatch Feature from the issues

The issue tracker on GitHub has the number of features that I want to see implemented on the app. You can select any of these based on a number of criteria:

- Whether you prefer front-end or back-end
- Whether you are a new or exxperienced programmer
- Whether you want to see a specific feature implemented


## Front End

### Suggesting a new a feature

My only request is that you create an issue for any specific feature you want to implement, in which you will describe the details and how you will implement it so that the rest of the contributors can view and hopefully help you implement this faster


### Start the site

Using the Webstorm IDE it is really easy to run the site. First, you have to open a terminal within the folder FrontEnd/front-end and type the command
```bash
npm install
```

Then you just open the IDE and you navigate to the folder FrontEnd/front-end, which is a webstorm project. You can then make your changes and see them by pressing the green arrow on the top right of the IDE.

Using the specific IDE is not necessary. You can use whichever IDE or editor you want.

### New developers

New developers, those who have no prior experience with the react.js(myself included), are welcomed in this project.

I would recommend that they start by solving the issues labeled: "good first issue" as they are the easiest to solve/implement and leve the rest for the more experienced prorammers. This is not a strict rule. I just recommend it so that each feature can get actually implemented wwithout much struggle. If someone thinks they are up for the challenge, of course they are more than welcome to try it.

## Back End


### Add an endpoint

You can add any endpoint that is being described in the issues. You should add one endpoint with each commit so that it will be easier for me to check on what endpoints have been added and be able to change the issues accordingly.

The back end is a simple express app with firebase integration, so that it will be both easy for everyone to implement new end points and to be easy for me to host it for free on Firebase, my primary hosting platform.
