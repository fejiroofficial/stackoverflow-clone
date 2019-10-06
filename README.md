# stackoverflow-clone-api

[![Build Status](https://travis-ci.com/fejiroofficial/stackoverflow-clone.svg?branch=master)](https://travis-ci.com/fejiroofficial/stackoverflow-clone)
[![Coverage Status](https://coveralls.io/repos/github/fejiroofficial/stackoverflow-clone/badge.svg?branch=master)](https://coveralls.io/github/fejiroofficial/stackoverflow-clone?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/cbfc19c558897560d6fe/maintainability)](https://codeclimate.com/github/fejiroofficial/stackoverflow-clone/maintainability)

Stackoverflow-clone is a platform where people can ask questions and provide answers.


## Features
1. Users can create an account and log in.
2. Users can ask questions on the platform.
3. Users can view all questions asked on the platform.
4. Users can upvote or downvote a question.
5. Users can provide answers to questions asked on the platform.
6. Users can search for questions, answers and users on the platform
7. Users can subscribe to a question and be notified when an answers is provided.   

## Technologies Used

* [NodeJS](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)
* [Mongodb](https://www.mongodb.com/)


## Installation

Install [`node`](https://nodejs.org/en/download/), version 8 or greater

Clone the repo:
```sh
git clone https://github.com/fejroofficial/iReporter.git
```

Start server:
```sh
npm start
```

### Testing tools

- [Mocha](https://mochajs.org/) - A Javascript test framework.
- [Chai](http://chaijs.com) - A BDD / TDD Assertion library.
- [Istanbul](https://istanbul.js.org) - Javascript code coverage tool.
- [nyc](https://github.com/istanbuljs/nyc) - The Istanbul command line interface.

## :star: Documentation :star:

## Endpoints
**Routes**
- POST `/api/v1/auth/signup` Use this route to create a new user account. The following fields are required:
    - `firstName` The firstname of the user
    - `lastName` The lastname of the user
    - `email` The email of the user
    - `password` The user's password
  
- POST `/api/v1/auth/login` Use this route to create a new user account. The following fields are required:
    - `email` The email or username of the user
    - `password` The user's password 

- POST `/api/v1/questions` Use this route to create a question. The following fields are required:
    - `title` The title of the question to be asked
    - `description` The description of the question to be asked

- POST `/api/v1/questions/:id/answers` Use this route to post an answer to a question. The following fields are required:
    - `answer` The answer to be provided for a question

- POST `/api/v1/questions/:id/votes` Use this route to upvote or downvote. The following fields are required:
    - `vote` Boolean(True for upvote, False for downvote)

- POST `/api/v1/questions/:id/subscribe` Use this route to subscribe to a question.

- GET `api/v1/questions` Use this route to view all questions.

- GET `api/v1/search?question|answer|user` Use this route to search for either questions or answers or users but not both.

