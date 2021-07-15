# Users

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` and run parallel node application on http://localhost:8084

OR 

Run directly from node server with compiled  build of angular ui  on main url http://localhost:8084

## Build

Run `ng build` to build the project. 

## Use API

Run on http://localhost:8084/api/1.0/*

## Config Paths

Angular API declaration in : /client/src/app/_helper/http.service (change baseUrl)

Nodejs Config: 

DB Config: /server/config/production.env

Logger: server/config/log4js.json

Database Name: demoapp

Database Used: mysql

Used Sequelize ORM (nodejs) for models in services and auto create tables in database 

## Add Test admin User

http://localhost:8084/api/1.0/user
{
    "email":"admin@laxmanrai.com",
    "name":"laxman",
    "password":"laxman",
    "role":"Admin"
}

