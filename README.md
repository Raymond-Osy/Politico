# Politico

[![Build Status](https://travis-ci.com/Raymond-Osy/Politico.svg?branch=develop)](https://travis-ci.com/Raymond-Osy/Politico)
[![Coverage Status](https://coveralls.io/repos/github/Raymond-Osy/Politico/badge.svg?branch=develop)](https://coveralls.io/github/Raymond-Osy/Politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a9e97da306eeb1a2f7cd/maintainability)](https://codeclimate.com/github/Raymond-Osy/Politico/maintainability)

Politico is a web app where citizens can vote in, express a desire to context for an office or give mandate to a politician that is running for a governmental office.

## Table of Content

* [Features](#features)
* [Technology](#technology)
* [Installation](#installation)
* [Testing](#testing)
* [API](#API)
* [Author](#Author)

## Features
Politico consist of the following features:
###  Users
- Users and Admins can sign Up or sign In
- Admin (electoral body) can create political parties.
- Admin (electoral body) can delete a political party.
- Admin (electoral body) can create different political offices
​- Users can vote for only one politician per political office
- Users can see the results of election

## Technology

**Politico** makes use of modern technologies. The core ones are:

* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Major codes are written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.

## Installation
1. Clone the repository:
```
https://github.com/Raymond-Osy/Politico.git
```
2. Navigate into the cloned repository:
```
cd Politico
```
3. Install dependencies.
```
npm install
```
4. Start the application
```
npm run dev
```
5. Install postman to test all endpoints

## Testing
- To test locally, run `npm run test` or you can simply test it on postman using the local host: http://localhost:8000/api/v1/auth/

- To test the endpoint hosted on the cloud(Heroku), use this link: https://politicom.herokuapp.com/api/v1/auth/

## API
Checkout the documentations [Here](https://politicom.docs.apiary.io/) to see how the endpoints works
<table>
<tr><th>Http verb</th><th>Endpoint</th><th>Action</th></tr>
<tr> <td>GET</td> <td> /parties </td> <td>Get all Parties</td></tr>
<tr> <td>GET</td><td>/parties/(:id)  </td><td>Get a Parties with the given ID</td></tr>
<tr> <td>POST</td> <td>/parties </td><td>Create a new Party</td></tr>
<tr><td>PATCH</td><td>/parties/:id/name</td><td>  Updates the name in a given party </td></tr>
<tr><td>DELETE</td><td>/parties/(:id)</td><td>  Delete Party with the given ID </td></tr>
<tr><td>POST</td> <td>/offices </td><td>Create a new office</td></tr>
<tr> <td>GET</td> <td> /offices </td> <td>Get all offices</td></tr>
<tr> <td>GET</td><td>/offices/(:id)  </td><td>Get an office with the given ID</td></tr>
<tr> <td>POST</td> <td>/auth/signup </td><td>user creates an account</td></tr>
<tr> <td>POST</td> <td>/auth/login </td><td>user logs in to account</td></tr>
</table>

## Author
[Raymond Akalonu](https://www.gitshowcase.com/raymond-osy)

<i>Project still in progress...</i>