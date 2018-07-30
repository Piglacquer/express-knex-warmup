# g90 Server

## Instructions
### Monday:
- Time to create a nice, shiny new db!
    - $createdb g90-server

- Make sure you have express, knex, and postgreSQL installed in the cloned repo
    - $npm install -S express
    - $npm install -S knex
    - $npm install -S pg 

- In your app.js file, fill in the variables.
    - Our app.js file is where we are using EXPRESS, which will take http REQUESTS from the client, tell the database what to do, then send the client a RESPONSE

- Create an index.js file 
    - We are creating this file to pull some information out of our app.js file. Here we will be telling express where to listen.
    - Create another const named app
    - This const, named app, will require the app file
    - It will then tell app to listen to either an environment variable named PORT or 3000 

- Initialize knex, a tool to write sql queries for our database
    - $knex init 

- Notice that it created some files. What are they?

- Update your knex file with the correct development and production information 
    - Notice that everything is written inside of module.exports, why?
    - You only need to keep development and production.
    - For development, your client should be: 'pg'
    - The development connection will be to: 'postgres//localhost/g90-server' (notice that the name of the database is part of our connection url)
    - For production, your client should still be to 'pg' (you're not changing what your database is written in)
    - The production connection will be an environment variable called DATABASE_URL

- Create your database-connection.js file 
    - Create a const named CONFIG
    - CONFIG will require your knexfile
    - In addition, it will be looking in that file's exports at either [an environment variable called 'NODE_ENV'] OR ['development']
    - This is confusing, but remember that module.exports in your knex file exports an OBJECT and there are two ways to look for keys in an object
    - next it will send out it's module.exports, which will equal require('knex')(CONFIG)
    - This file will be used later in your queries 😈

- Now we will move onto creating our migrations and seeds. 

- Create a migration
    - $knex migrate:make migration_name
    - make your migration_name something sensible, it's what the table will be called
    - inside of your migration file, create and incrementing 'id' column and 4 text columns for 'first name', 'last name', 'prior occupation', and 'hometown' (hint: don't use spaces)

- Create a seed file
    - $knex seed:make seed_name
    - the first seed you make should have your information (first name, etc.)

- Run migrations and seeds
    - $knex migrate:latest
    - $knex seed:run

- If those didn't work, troubleshoot
- If they did, check out your data in psql with the commands that Peter taught you


- If all went well, you successfully created the skeleton for an express // postgres // knex backend.

- Tomorrow we will write some routes and queries so you can see your data outside of psql and IN THE BROWSER!!!