# g102-Database
## Welcome to the step-by-step instructions for building our very own g102 database and server with Node, Express, Knex, and Postgresql!

## Thursday

### Delete Query

Now for a nice delete request

- Head back to your queries file and make another query called 'delete()', and pass in 'id'.
- Same as the other routes, we're going to start the logic of our function with 'return database' statement and pass in the table
- Then we'll describe WHERE it should be looking (where the 'id' column is equal to id)
- Next we'll DELETE it
```javascript
   delete(id){
    return database('students')
      .where('id', id)
      .delete()
  }
```
- That's it! Starting to see a pattern of how these queries are working?
---

### Delete Route

On to the route to handle the request and use the queries to do our/the clients bidding!

- Back to your app.js!
- We need to create a new route, this one will look _similar_ to the get by firstName route.
- What HTTP method are we going to use to delete?
- DELETE!
```app.delete()```
- Since this looks similar to our get by firstName route, but we're using the id, what do you think the route should be?
```app.delete('/:id')```
- Then we do the same thing we've done for every route, pass a second argument that is an anonymous function that takes in request and response as it's parameters
- When we call our query in this route, what are we going to pass in? What's that thing called that we pass dynamically into the URL?
- REQUEST.PARAMS
- What's the name of the param that we want in there? ID! Why? BECAUSE WE CALLED IT ID!
```javascript
  app.delete('/id', (request, response) => {
    queries.delete(request.params.id)
  }
```
- Then we can send back a status to the client letting everyone know that whatever the wanted deleted has been erased.
- That'll be a [204](https://http.cat/204) status code, indicating that there is no longer any content.
- Go ahead and send that status code in a '.then()'
- SAVE, TEST IT.
- Does it work? SAME AS ALWAYS: ADD, COMMIT, PUSH!!!
 ---

### Update Query

Lets talk about what we need for the put route! 
- This one will be a bit of an amalgamation of the previous routes because it needs two arguments. 
- It needs to identify the row it will be changing, and also what to change in the row.
- Start by creating a new function in your queries file, let's call it updateStudent.
```updateStudent(id, student){}```
- Same as with all the other queries, we're going to ```return knex('tableName')```
- Next we need to tell it where to do the thing ```.where('id', id)```
- Then update the thing we're going to update! ```.update(student)```
- That's it! Just pay attention to what you're passing into the query and you should be good.
- You can also add a returning method or pass returning into the update arguments. Check knex docs for more info.
  - Pertinent if you want to confirm the change without a get request.
---

### Put Route for Update

We have our query setup, so lets make a new route that looks similar to the 'getById/Name'
- Start out the same as we have for all the other routes, but use a different HTTP method, put.
```app.put()```
- For this example we're going to use request params and the request body to update our database.
  - Params to specify the id of which item we want to update
  - Body to pass the key:values that we want to update
```javascript
  app.put('/:id', (request, response) => {
    queries.updateStudent(request.params.id, request.body).then(data => res.json(data))
  }
```

- Test it out! In postman be sure to specify the PUT method, pass the id in the URL, and pass the key:value pairs in the body.
---

YOU DID IT!!!! YOU NOW HAVE A FULLY FUNCTIONING CRUD BACKEND USING NODE, EXPRESS, POSTGRESQL, AND KNEX!!!! YOU'RE AWESOME! A WIZARD, SOME MIGHT SAY!!!

NOW ADD, COMMIT (WRITE A MEANINGFUL COMMIT MESSAGE, DAMMIT), AND PUSH! THEN PUSH TO HEROKU! AHHHHH!!!!



## Wednesday
Let's start this Wednesday by installing both __body-parser__ and __cors__ into your project. Make sure you require them into your express server and tell it to ```app.use``` them. We'll need body-parser for our post route and cors will be needed once we start making requests to our API from the front-end you'll create on Friday.


Now, lets write us some queries!

  ### Get By Id Query
  - In your queries file, go ahead and make a new query function called 'getById'
  - getById will take one parameter, id
    ```getById(id){}```
  - In this query, we're going to want to return the entity in the table where 'id' (the column/attribute) is equal to id (the parameter).
  - Using the resources I added for writing queries (in the Writing Queries section), and the knowledge you have about basic query structure, finish this one on your own. Don't be afraid to check out the knex docs.
  ---

  ### Get By ID Route
  We've written our query, so let's go back to our app.js and make use of it!
  - Make another get route, but this time we're going to do something a little bit different
  ```app.get('/:id', (request, response) => {})```
  - Notice the difference? There's now a colon in our route, this is allows us to access that piece of the url and pass it into our query
  - To see this, I just want you to console.log(request.params) within that route.
  ```app.get('/:id', (request, response) => console.log(request.params)```
  - Run it, and in the browser, go to localhost:yourPort/asdf
  - Check the console, and you should see something like this: ```{id: asdf}```
  - Guess how we can use this in our query!!!!
  - Delete your console.log, bring in the new query you wrote, and pass it ```req.params.id```
  - Follow the pattern from the previous get route!
  - Once you're done, go to localhost:yourPort/1 and see if it works!
  - If all went well, you should now be able to grab a student by their id!!!
  - WOO! Add, commit, push. 💅💅💅
  - Now deploy to heroku 📸
  ---

### Query for Post (Insert)

Let's write query to 'insert' something into our table.
- Head to your queries file and make a new query function called ```createStudent(){}```
- This function needs to take a parameter so that it has something to insert into the students table, call it what you will.
  ```createStudent(callItWhatYouWill){}```
- Inside of the curlies, we __always__ start with _return_.
- Similar to the other two routes, we want to ```return database('students')``` but we want to 'insert' the thing we're passing into the query into the table.
```javascript
  createStudent(callItWhatYouWill){
    return database('students')
      .insert(callItWhatYouWill)
```
- Boom, query done.
- If, by any chance, you wanted to return the object you're inserting into the table, you can tag a ```.returning('*')``` onto the end.
---

### Route for Post

Head back over to your app.js!

- What HTTP method do we use to add to a server or database?
- Oh yeah, that's right, a POST.
```app.post()```
- Now what's the route going to be? It's up to you! '/' is always easy, and since it's a different HTTP method it won't get confused with your GET to the same route.
```app.post('/')```
- WHAT DOES EVERY ROUTE TAKE AS A SECOND ARGUMENT?!
- AN ANONYMOUS FUNCTION THAT TAKES TWO PARAMETERS, REQUEST AND RESPONSE (and, if you want, next)
```app.post('/', (request, response) => {})```
- From the client, something is going to have to be passed in the request body for entry in the database, so we'll pass the request body into the query we call.
```javascript
  app.post('/', (request, response) => {
    queries.createStudent(request.body)
  }
```
- That should insert the thing into the table, but we still need to let the client know that everything went smoothly.
- If you tagged that ```.returning('*')``` onto the end of the query, we can send a status and that array (```returning``` returns an array) back to the client.
- Otherwise, we can just send a nice [201](https://http.cat/201) status back.
```javascript
   app.post('/', (request, response) => {
      queries.create(request.body)
        .then(response.status(201))
   }
```
- WOO! TEST IT! ALL GOOD? ADD. COMMIT. PUSH.
- DEPLOY IT TO HEROKU AND SEE IF IT WORKS! How do you see if it works? Postman. If you haven't used Postman yet, we can do a breakout on it.
---

🛥🌮👼

## Tuesday
  We're going to start off by creating a student object for each and every one of you.
  - The format should be like this:
  ```javascript 
    {
        name: '',
        fave_animal: 'photo.url',
        previous_occupation: '',
        hometown_lat: number,
        hometown_long: number,
        useless_superpower: ''
    }
```
- Put it all in a thread in the class channel. We'll use this as seed data for your database.

### Project Setup
  - Create a new folder from within your terminal!
  - Navigate into that folder
  - We need to do three things right off the bat, create a package.json, set up a git repository, and create an app.js
    - ```npm init```
    - ```git init```
    - ```touch app.js```
  - Navigate to your github and create a new repository
    - Copy the link for your git repository
    - Go to your terminal and add a new remote called origin
    - ```git remote add origin URL```
  - Go ahead and add your project, commit, and push to your repo 💅💅💅
  ---
 
### Express Setup
  Let's get that express server running!
  - Remember what basic dependencies our express server needs?
  - ```npm install express```, that's it!
  - Now build out that basic express server the way we have done before.
    - Create a const called express that requires in express
    - Create another const called app that invokes express
    - Create another const called port that equals ```process.env.PORT``` OR ```whatever port you want it to run on```
    - A tiny bit of information on why you use process.env.PORT [heroku docs](https://devcenter.heroku.com/articles/runtime-principles#web-servers)
    - Tell express() to listen to port and then pass in an anonymous function with ```console.log(`listening on ${port}`)``` or something like that.
  - RUN IT AND SEE IF IT WORKS!
    - ```$node app.js```
  - All good? Add, commit, and push to github. 💅💅💅
  ---
    
  Lets write a basic get route now.
  - Below your app.listen give it an ```app.get()```
  - We're going to pass in the route, which will be the base route ```'/'```
  - We're also going to pass in an anonymous function with two parameters, request and response
  - ES5: ```function(request, response){}```
  - ES6: ```(request, response) => {}```
  - Inside of that function, we're going to send a response ```res.send()
  - We'll send back... something... how about ```('THE ROUTE WORKED!')```
  - RUN IT! 
  - Worked? Hooray! Add. Commit. Push. 💅💅💅
  ---

### Knex and PostgreSQL setup (in project)
  Now that we have our basic express server together, we're going to start messing with knex and postgresql
  - Go back to your terminal and ```npm install knex pg```
    - You can install multiple dependencies in one line 😊
    - ```pg``` is the dependency we use for postgres
  - We also need to create a database
    - ```createdb DATABASE_NAME_THAT_MAKES_SENSE_FOR_G102_DATABASE```
  - Okay... We have our dependencies installed and have created a database. What's next?
  - Inside of your project directory you need to run ```knex init```
    - This will create a file called 'knexfile.js'
  - Take a look at that file. It's a configuration file, and it has a bunch of keys within a module.exports, which will make them available to files outside of your knexfile.
  - You'll notice that the top level keys are: development, staging, and production
  - We're not going to mess with staging. Go ahead and delete everything within that key, leaving development and production
  - Also notice that both are using 'sqlite3' as their client. Well, we're not. We're using postgresql.
  - Change the client on both development and production to: ```'pg'```
  - We're also going to need to change the connection for both of them.
    - Connection for development: ```connection: 'postgresql://localhost/DATABASE_NAME_THAT_MAKES_SENSE_FOR_G102_DATABASE```
    - Connection for production: ```connection: process.env.DATABASE_URL```
  - Delete the rest of the key: value pairs, leaving only client and connection for both. We won't need the extra information.
  - Knex is now configured for development and production! 💅💅💅
  - Add. Commit. Push.
  ---
  
### Migrations
  Next, lets make our migrations and seeds
  
  - ```knex migrate:make students```
  - This will make a migration file, the long string of digits before "students" is a timestamp. These files run in chronological order.
  - Open this file (it's in the migrations folder)
  - You'll notice that there are two sections: _exports.up_ and _exports.down_
  - _exports.up_ will be run with ```knex migrate:latest```
    - This command will create the table and the schema
  - _exports.down_ will be run with ```knex migrate:rollback```
    - This command will drop the table and schema
#### exports.up
  - Inside your exports.up, you'll need to write the code to create the table and to create the columns and datatypes (schema) in that table
  - ```return knex.schema.createTable('table_name', (entityInTable) => {}```
  - You'll notice that createTable takes two arguments, the name of your table, and an anonymous function
  - 'entityInTable' is in place of whatever you want to call a specific entity in your table
    - For instance, if your table is named 'students', a good specific entity-name would be 'student'.
  - Inside of the curlies is where you write the code to create your columns.
  - Your table ALWAYS needs a primary key, more info about [primary keys](http://www.postgresqltutorial.com/postgresql-primary-key/)
  - ```entityInTable.increments('id')```
  - Here's some info about column types with [knex](https://knexjs.org/#Schema-Building).
  - And here's an example with the id column included in the migration:
  ```javascript
    return knex.schema.createTable('table_name', (entityInTable) => {
      entityInTable.increments('id')
    }
  ```
  - Go ahead and add all the fields for each student object, INCLUDING an id.
#### exports.down
- Inside of your exports.down, you'll need to write the code to drop a table. If you ever need to undo your migration, this is the line that'll do it.
- The syntax looks similar to what you wrote in your exports.up function.
```javascript
    return knex.schema.dropTableIfExists('table_name')
```
#### Time to run it
- Remember how to run your migration? Check line 76.
- DID IT WORK? WOO!!!!! 
    - If it didn't, check the error messages and troubleshoot.


- Add. Commit. Push.💅💅💅
  ---

### Seeds
  - ```knex seed:make 01_students```
  - Your seeds will run in alphabetical order, so their names need to help specify their order.
  - If you look at your seed file you'll see something like this:
    ```javascript
    exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
      return knex('table_name').del()
      .then(function () {
    // Inserts seed entries
        return knex('table_name').insert([
          {id: 1, colName: 'rowValue1'},
          {id: 2, colName: 'rowValue2'},
          {id: 3, colName: 'rowValue3'}```
         ]);
        });
       };```
  - You will replace ```table_name``` with the name of the table you wish to run this seed on. Pretty simple, right?
  - If you used ```entityInTable.increments('id')```, you won't need to pass an id into your seed file. It will assign that automatically.
  - Make sure that your column names match between your migration file and your seed file! Copy+paste! Use autocomplete!
#### Time to run it
- To get that seed data into your table, use the command: ```knex seed:run```
  - Everything behaving the way it should? Add. Commit. Push.💅💅💅
  
  ---
  ### Queries Setup
  We now have a new table in our database, with a schema, and some data. Lets make some queries with Knex to reach into that database and grab some data for us.

  #### Database Connection
  - The first thing we need to do is establish a connection to our database. We're going to break this out into a separate file, called 'database-connection.js'
  - Our goal in this file is to make sure that our queries can get into the database that we've created. Without specifying how to access the database, our queries won't be able to carry out their tasks. Simple enough.
  - ```javascript
      // Set our environment
        const environment = process.env.NODE_ENV || 'development'

        // Use connection info from knexfile
        const config = require('../knexfile')

        // Coordinate the two above
        const configEnv = config[environment]

        // Bring in knex as a library
        const knex = require('knex')

        // Put it all together
        const connection = knex(configEnv)

        // Export so we can use it in our routes
        module.exports = connection
    ```
    - Remember our knexfile? We had two different environments set up, development and production.
    - When you deploy your database, Heroku has an _environment variable_ called ```NODE_ENV```, it's value will be 'production'. If knex doesn't find that environment variable, it will go to 'development'. That's why we only have those two values for environment
    - When we combine the knex file and the environment, we are BRACKET notating into the object exported in our knexfile
    - Since we named our import 'config', it will either be config.production or config.development
    - We then pass those into knex so all the pieces work together.
  
  ---
  #### Writing Queries

- We'll start by creating a queries file in the top level of our project called queries.js.
  - First things first, import that database-connection file we just created
    - Lets call it 'database'
    - ```const database = require('./database-connection')```
- We'll then write a module.exports statement and open some curlies.
  - Inside of those curlies is where we will write our queries.💅💅💅
  
  Our queries file is set up, so lets go ahead and write our first query.
  - We'll call it: listAll
    ```javascript
    module.exports = {
      listAll(){
            
      }
    }
    ```
  - Inside of ALL of your queries, you will start with a ```return```
  - Since we want to list all of the entities in our table, we can just return the the whole table
    ``` return database('table_name')```
  - THATS IT!
  - Each query we write will share a very similar form. We don't need a function keyword before function name, and we always start with a return.💅💅💅
  - Knex query resources: [Knex Cheatsheet](https://devhints.io/knex), [Knex Docs](https://knexjs.org/#Builder-select).
  
  ---
  ### Running Queries with Express
  We've now written our first query, so lets use it to serve some data through our Express server!
  - Go back to app.js
  - Towards the top, where we were requiring in Express and invoking it, we want to also require in our queries file.
    ```const queries = require('./queries')```
  - Now we have access to everything within the module.exports inside of queries.js!
  - Inside of the app.get we wrote when setting up the server, we're going to utilize that query.
  - Delete: ```res.send('THE ROUTE WORKED')```
  - Now we will call our query, and send the data back to the client:
    ```queries.listAll().then(students => res.send(students))```
  - Save, and run it! If you don't remember where to go once it's running, check the port number you assigned at the top of your app.js
  - DID YOU GET THE DATA? YOU GOT THE DATA!
  - Add. Commit. Push. 💅💅💅

  ---

### Deploy to Heroku

- First things first, you'll need a Heroku account. If you haven't done that yet, go ahead and create one. 
- Next, you'll need to install the Heroku CLI
- For instructions, follow this link: https://devcenter.heroku.com/articles/heroku-cli
- After you have logged in, use the ```heroku create``` command within your project to add a new project to heroku and also to add a remote to your local git repository.
    - I suggest you add a name to the end of the create command, like ```heroku create DATABASE_NAME_THAT_MAKES_SENSE_FOR_G102_DATABASE```
- Make sure that you have a new remote added to your project ```git remote -v```
    - You should see both _origin_ and _heroku_
- Now you're nearly there. If we just had a server, you would be ready to deploy, but since we're using a postgresql database on top, there're a few more steps.
- We need to add a database to heroku, to do this, we'll use this command: ```heroku addons:create heroku-postgresql:hobby-dev```
- To read more about this: https://devcenter.heroku.com/articles/heroku-postgresql
- Now you're ready to deploy!!
- Go ahead and push your project to the heroku remote!
- Once you've done that, you need to run your migrations and seeds on _heroku_, just like we did locally.
    - ```heroku run knex migrate:latest```
    - ```heroku run knex seed:run```
- DID EVERYTHING WORK?! WOO!!!!! YOU NOW HAVE A DEPLOYED SERVER+DATABASE COMBO!
- To find out where your project is deployed, go to your heroku dashboard, click the project you made, then go to settings, and look for the _domain_. Click it and you should go to a page and receive a nice JSON object!
- WOOOOOOO!!
