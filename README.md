## WAYFARER APP

[![Build Status](https://travis-ci.org/WinnersProx/way-farer-app.svg?branch=develop)](https://travis-ci.org/WinnersProx/way-farer-app) [![Coverage Status](https://coveralls.io/repos/github/WinnersProx/way-farer-app/badge.svg)](https://coveralls.io/github/WinnersProx/way-farer-app?branch=ft-filter-api-167426897) [![Maintainability](https://api.codeclimate.com/v1/badges/ac59e2bbb7a54a77685e/maintainability)](https://codeclimate.com/github/WinnersProx/way-farer-app/maintainability)

## Platform Description

 Wayfarer is a public bus transportation booking services platform where users can find diverse trips and book a spot in any available trip.

## Features

- Users view the dashboard section that expressively describes the platform.
- Users can sign up.
- Users can sign in.
- Admins can create a trip.
- Admins can cancel a trip.
- Users can view all trips.
- Users can view a specific trip.
- Users can book a seat on a trip.
- Admin can view all bookings.
- A user can view all of his bookings.
- A user can delete his booking.
- Users can filter trips based on origin.
- Users can filter trips based on destination.
- Users can specify a seat number when making a booking.

## API Endpoints Specifications

- ApiRoot = https://way-farer-app-rest.herokuapp.com/api/v1.

| Endpoint | Request | Status | Description |
| --- | --- | --- | --- |
| / | GET | 200 OK | Helps users to access to the root of the api |
| /auth/signup | POST | 201 Created | Makes a post request to register a new user or create an account |
| /auth/signin | POST | 200 OK | Sign in the user already having a user account |
| /trips | POST | 201 OK | Create a trips on which users can book seats |
| /trips/:trip-id | GET | 200 OK | For users to view all available trips |
| /trips/:trip-id | GET | 200 OK | For users to view a specific trip |
| /trips/:trip-id/cancel | PATCH | 200 OK | For the admin to cancel a trip |
| /trips/bookings | POST | 201 OK | For the the users to book a seat |
| /trips/bookings | GET | 200 OK | For both admin and users to view bookings  |
| /bookings/:booking-id | DELETE | 200 OK | For both admin and users to delete a specific booking |
| /filter/trips | GET | 200 OK | For users to filter available trips based on origin or destination |


## Tools

Tools used for development of this API are;
- Documentation : [Swagger](https://swagger.io/).
- Framework: [ExpressJS](http://expressjs.com/).
- Code Editor/IDE: [VSCode](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com/).
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).
- API Testing environment: [Postman](https://www.getpostman.com).

## Getting Started

1. Clone the github repository [here](https://github.com/WinnersProx/way-farer-app). 
2. Kindly read very well the provided documentation

## Deployment

- Github Pages : https://winnersprox.github.io/way-farer-app.
- Heroku Deployment : https://way-farer-app-rest.herokuapp.com/api/v1.

## Api Documentation

Get started with WayFarer Api endpoints documentation [here](https://way-farer-app-rest.herokuapp.com/api/v1/api-docs).

## Key Contributor

- Bihame Sikubwabo Vainqueur

## Acknowledgements

- Andela Homestudy : https://homestudy.andela.com
- Pluralsight      : https://app.pluralsight.com