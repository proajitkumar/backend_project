Folder Structure

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside `src` folder
 -  `config` -> In this folder anything and everything regarding any configuration or setup of a library or module will be done. For example: setting up `dotenv`  so that we can use the environment variable anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration of this library should also be done here.

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controller to it.

 - `middlewares` -> they are just going to intercept the incoming request where can write our validators, authenticator etc.

 - `controllers` -> they are kind of a last middleware as post them call you business layer to execute the business logic. In controllers we just receive the incoming request and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send output

 - `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries and ORM queries will go here.

 - `services` -> contains  the business logic and interact with repositories for data from the database.

 - `utils` -> contains helper methods, error classes etc.


### Setup the project

 - Inside the `src/config.json` folder create a file named as `config.json` and write the following code:
 ```
 {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
 }

 ```
 - Go inside `src` folder and execute following command:
 ```
  npx sequelize init
 ```
 - By executing this command you will get `migration` and `seeders` folder along for `config.json` inside `config` the folder.

 - If you are setting up your development environment, then write the username of your db, password of your db and in dialect mention wherever db you are using for ex: mysql, mariadb etc
 - If you are setting up test or prop environment, make sure you also replace the host with the hosted db url.

 - To run the server execute
 ```
 npm run dev
 ```
