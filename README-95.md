# g95-Database
## Welcome to the step-by-step instructions for building our very own g95 database and server with Node, Express, Knex, and Postgresql!

### Query for Put 

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

### Route for Put

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

## Thursday

And for this fine day of Thursday, we're going to write two different queries and the routes to use them!

---

### Query for Post (Insert)

Let's start with the query to 'insert' something into our table.
- Head to your queries file and make a new query function called ```create(){}```
- This function needs to take a parameter so that it has something to insert into the students table, call it what you will.
  ```create(callItWhatYouWill){}```
- Inside of the curlies, we __always__ start with _return_.
- Similar to the other two routes, we want to ```return database('students')``` but we want to 'insert' the thing we're passing into the query into the table.
```javascript
  create(callItWhatYouWill){
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
- AN ANONYMOUS FUNCTION THAT TAKES TWO PARAMETERS, REQUEST AND RESPONSE (and sometimes next)
```app.post('/', (request, response) => {})```
- From the client, something is going to have to be passed in the request body for entry in the database, so we'll pass the request body into the query we call.
```javascript
  app.post('/', (request, response) => {
    queries.create(request.body)
  }
```
- That should insert the thing into the table, but we still need to let the client know that everything went smoothly.
- If you tagged that ```.returning('*')``` onto the end of the query, we can send a status and that array (returning returns an array) back to the client.
- Otherwise, we can just send a nice [201](https://http.cat/201) status back.
```javascript
   app.post('/', (request, response) => {
      queries.create(request.body)
        .then(response.status(201)
   }
```
- WOO! TEST IT! ALL GOOD? ADD. COMMIT. PUSH.
---

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
  app.delete('/:id', (request, response) => {
    queries.delete(request.params.id)
  }
```
- Then we can send back a status to the client letting everyone know that whatever the wanted deleted has been erased.
- That'll be a [204](https://http.cat/204) status code, indicating that there is no longer any content.
- Go ahead and send that status code in a '.then()'
- SAVE, TEST IT.
- Does it work? SAME AS ALWAYS: ADD, COMMIT, PUSH!!!
 ---

That's all for today!

## Wednesday

Today we're going to start by creating some student data objects, changing our migrations, and adding to our seeds.
  - First thing first, everyone should create an object for themselves and slack it out in ONE thread.
  - Here's what the format should be:
    ```{firstName: '', lastName: '', hometown: '', prevOccupation: '', favoriteNum: int, pastime: ''}```
  - Once you've done that and you're all caught up with what we did yesterday, it's time to change our seeds and migrations to match this new data format.
  - When changing your migration, remember that we HAVE to have an id:
    ```entityInTable.increments('id')```
  - We _don't_ have to add an id into our student objects because it's done automatically once you set that column up in the migration.
  - We _do_ need to add columns for all these new keys we expect our entities to have.
  - Using the added resource about knex columns in the __Migrations__ section, add the appropriate columns to your migration file.
  - Once you're done, rollback your original migration, then RUN THE LATEST ONE!
  - It worked? IT WORKED!
  - Add. Commit. Push.💅💅💅
  ---
  
  Next we need to take all the data from Slack, and paste it into our seed file.
  - Hopefully, everyone copy and pasted the code snippet, and the format is the same throughout.
  - Paste each student entity into your seed file, check for formatting errors, then... RUN THE SEED!
  - Now we have WAY more data in our database.
  - Add, commit, and puuuuuush! 💅💅💅
  ---
  Now, I want you to write another query and another route.
  - This query and route will be used to get a student by their first name and send it to the client.
  
  ### Get By Name Query
  - In your queries file, go ahead and make a new query function called 'read'
  - read will take one parameter, firstName
    ```read(firstName){}```
  - In this query, we're going to want to return the entity in the table where firstName is equal to firstName
  - Using the resources I added for writing queries (in the Writing Queries section), and the knowledge you have about basic query structure, finish this one on your own.
  ```javascript
       read(firstName){
        return database('students')
          .where('firstName', firstName)
       }
  ```
  
  ### Get By Name Route
  We've written our query, so let's go back to our app.js and make use of it!
  - Make another get route, but this time we're going to do something a little bit different
  ```app.get('/:firstName', (request, response) => {})```
  - Notice the difference? There's now a colon in our route, this is allows us to access that piece of the url and pass it into our query
  - To see this, I just want you to console.log(request.params) within that route.
  ```app.get('/:firstName', (request, response) => console.log(request.params)```
  - Run it, and in the browser, go to localhost:yourPort/asdf
  - Check the console, and you should see something like this: ```{firstName: asdf}```
  - Guess how we can use this in our query!!!!
  - Delete your console.log, bring in the new query you wrote, and pass it ```req.params.firstName```
  - Follow the pattern from the previous get route!
  - Once you're done, go to localhost:yourPort/Joey and see if it works!
  - If all went well, you should now be able to grab a student by their first name!!!
  - WOO! Add, commit, push. 💅💅💅
  ---
  
## Tuesday
  We're going to start off by creating a basic server with Node and Express.
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
  - We also need to create a database
    - ```createdb DATABASE_NAME_THAT_MAKES_SENSE_FOR_G95_DATABASE```
  - Okay... We have our dependencies installed and have created a database. What's next?
  - ```knex init```
    - This will create a file called 'knexfile.js'
  - Take a look at that file. It's a configuration file, and it has a bunch of keys within a module.exports, which will make them available to files outside of your knexfile.
  - You'll notice that the top level keys are: development, staging, and production
  - We're not going to mess with staging. Go ahead and delete everything within that key, leaving development and production
  - Also notice that both are using 'sqlite3' as their client. Well, we're not. We're using postgresql.
  - Change the client on both development and production to: ```'pg'```
  - We're also going to need to change the connection for both of them.
    - Connection for development: ```connection: 'postgresql://localhost/DATABASE_NAME_THAT_MAKES_SENSE_FOR_G95_DATABASE```
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
  - Make sure that your column names match between your migration file and your seed file! Copy+paste!
  - Everything behaving the way it should? Add. Commit. Push.💅💅💅
  
  ---
  ### Queries Setup
  We now have a new table in our database, with a schema, and some data. Lets make some queries with Knex to reach into that database and grab some data for us.
  - We'll start by creating a queries file in the top level of our project called queries.js.
  - Now, we need to require in our knexfile.js. BUT, we don't want to import all of it.
    - We want to import only the production config OR the development config.
    - When we deploy to Heroku, Heroku creates an environment variable (accessed with process.env) called ```NODE_ENV```
    - If our database is being hosted on Heroku, by default that variable will evaluate to ```'production'```.
    - We don't want to write ```'production'```, because the only time we want it to run the production configuration is when it's actually hosted on Heroku.
  - So, we want to import the correct configuration of knex.
  - That line of code looks like this:
    ```const connection = require('./knexfile)[process.env.NODE_ENV || 'development'] ```
  - Remember, our knexfile exports an object, and we can use [bracket] notation to dive into that object.
  - Next we need to create another variable that will bring in the knex library and give it that connection as well
    ```const database = require('knex')(connection)```
  - With those two variables in place, we can start writing our queries
  - Create a module.exports statement, like this:
    ```module.exports = {}```
  - Inside of those curlies is where we will write our queries.💅💅💅
  
  ---
  ### Writing Queries
  Our queries file is set up, so lets go ahead and write our first query.
  - We'll call it: listAll
    ```javascript
    module.exports = {
      listAll(){
            
      }
    }```
  - Inside of ALL of your queries, you will start with a ```return```
  - Since we want to list all of the entities in our database, we can just return the the whole table
    ``` return database('students')```
  - We're saying database only because that's what we named the variable in our Knex setup step
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

