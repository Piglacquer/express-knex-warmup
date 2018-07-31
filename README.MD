# g90 Server

## Instructions
### Tuesday
- We got our skeleton built! 🎉HOORAY🎉! If you haven't packed your seed file full of your classmates, put those humans in there (representations of them should be in slack).
- Now, we have no way of looking at the data outside of psql. Lets get our application ready to accept some requests!

- First, we need to add body-parser and cors to our project. These are middlewares that help format our requests and responses to be more easily used.
    - $npm install -S body-parser cors

- Then we need to make sure that express is using these things. Remember that our app.js is where we are working with express.
    - In our app.js, we need to create a couple of new const variables
    - One will be bodyParser, and it will require in body-parser
    - One will be cors, and it will require in cors
    - Whodathunkit!
    - That doesn't tell express to use these things, however. Look at what express (invoked) is called. We should already have a variable set up for that.
    - We want that (invocation) of express to .use(theMiddlewaresWeInstalled)
    - Since there are two new middlewares, you will need to tell express to .use() each of them individually
    - body-parser has multiple methods, the most useful for our purposes will be the .json() method, so when you tell express to use body-parser, make sure you tag the .json() method on the end.

- Express is now using all these cool middlewares. Lets write a basic GET route to see if we can see a response in the browser.
    - What is our invoked express called again?
    - oh yeah, app
    - so to make a basic GET route, we need to call the .get method on express()
    - The GET method takes two arguments, the ROUTE and a FUNCTION.
    - The route assumes that the base URL is already there.
    - The function takes in three parameters, request, response, and next.
    - Inside of your function, let's send a response
    - response.send('Whatever the hell you want your message to be')

- We also want a catch for our errors, so that we can see what happened if it all goes to shit.
    - Underneath your get route, create another app.use()
    - This .use() method takes one argument, a function.
    - This function takes four parameters, error, request, response, and next
    - In this function we are going to console.error our error.stack
    - Next we are going to send a status and a message.
    - Use res.status to send a 400 and then chain a .send() on to send a message.

- We have a basic get route! Try to run it with:
    - $npm start

- AN ERROR?! WHY! Go check your package.json. What's your start script?
    - Fix it.

- Now try to start your server again. It should work. Try your route in the browser! Where is our app listening again? Check your files.

- Once you see your message in the browser, lets write a couple of queries to pass into our routes. This will allow us to serve data from our database!

- Create a new file called queries.js
    - the first thing we need to do is import our database-connection file into our queries file. 
    - Lets call that const 'database', all it's doing is requiring in the database-connection file.

- Now lets write our queries for getting all and getting one.
    - First, we need to make these queries available outside of this file, so create a module.exports statement, and set it equal to an object.
    - We will write our queries within this object
    - Let's write the function to get ALL first
    - You don't need a function keyword for these, just give it a name and pass in no parameters. THE FUNCTION NAME SHOULD MAKE SENSE
    - Open your curly braces
    - What do we want to return? Oh yeah, all the things. 
    - All we need to do is return the database called ('whateverYouCalledYourTable')
    - That's our get all!

- Next, we're going to get one user by their ID
    - Create another function, THE FUNCTION NAME SHOULD MAKE SENSE
    - Pass in a parameter called something like 'id'
    - Guess what, we're going to return something again.
    - It will be the same return as before, but we need to specify something specific
    - This will be a lot like our sql queries
    - We need to select all where 'id' or whatever is equal to id.
    - The item in quotes is the column in your table the one without will be the parameter you passed in
    - 🤙 These two queries are done!

- Lets go back to our app.js file, where our routes are being written.
    - We need to require our queries file into our app
    - Call the const queries or something easily identifiable
    - Next we need to alter the original get request we had made
    - To access the queries we imported, we need to dot notate into that object.
    - If you're confused about what it looks like, console.log(queriesOrWhateverYouNamedIt) inside of the get route and check it out
    - We're dealing with our get all route first. 
    - The first thing we want to do inside the function is to call queries, then chain the name of your get all method onto it
    - Chain a .then() onto it with one parameter that will represent your data, then give it a response.json({parameterName})
    - If you want redundant error handling you can add a .catch to that and console.error
    - We're done with that route 👌

- Next we will get one item based on id
    - make another get route, but this time we will tag ':id' onto the route.
    - this represents a dynamic route, the colon is the symbol we use to denote this
    - Remember, these routes take two parameters, the ROUTE and a function
    - That function takes two parameters as well, REQUEST AND RESPONSE
    - Open up your curlies. Much like the last one we'll call queries, then dot notate into the query we made to get with the id
    - When we call that method off of queries, we'll pass in 'request.params.id'
    - request.params are the things you're passing to the request through the url
    - Take a look at them those req.params, console.log them prior to your queries call.
    - If you've satisfied your curiousity there, it's time to finish our second get
    - Go ahead and chain a .then onto the previous method, pass in one parameter called 'data' or something, then give it a fat arrow and open your curlies
    - inside of those curlies, we're going to call response.json()
    - Within the response.json() pass in an object that encloses the parameter we named previously
    - If you want to be redundant with your error handling (not necessary, maybe not even a good practice), you can put a .catch after that

- RUN IT! Try both your get all route, and your get one

- WOO! THEY WORKED! 🤩🎉 We have created an express server that handles requests to a couple different routes and returns data from our database!!!!!!

- Well, if there was an error, troubleshoot! Ask yo neighbor! Ask one of us instructors!


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

- Notice that it created a file.

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

- Create a migration (column names and types, also called schema)
    - $knex migrate:make migration_name
    - make your migration_name something sensible, it's what the table will be called
    - inside of your migration file you will see exports.up and exports.down
    - for exports.up, you want to RETURN a knex.schema that will .createTable()
    - .createTable takes two parameters, the tablename AS A STRING, and a function
    - the function takes one parameter, which will reference an entry into the table
    - that function could look something like this: students => {
        students.increments('studentId')
    }
    - create and incrementing 'id' column and 4 text columns for 'first name', 'last name', 'prior occupation', and 'hometown' (hint: don't use spaces)
    - in the exports.down you want to drop the table if it exists
    - You will RETURN a knex.schema that will .dropTableIfExists()
    - .dropTableIfExists takes one parameter, the name of your table

- Create a seed file
    - $knex seed:make seed_name
    - I always match my seed name to the table name
    - Look at your seed file, I think you can figure it out
    - You shouldn't have to add an ID field (I think), it should auto-increment them.
    - the first seed you make should have your information (first name, etc.)

- Run migrations and seeds
    - $knex migrate:latest
    - $knex seed:run

- If all went smoothly, check out your data in psql with the commands that Peter taught you
- If it didn't, troubleshoot


- 🎉HOORAY🎉 You successfully created the skeleton for an express // postgres // knex backend.

- Don't forget to push up to your github!

- Tomorrow we will write some routes and queries so you can see your data outside of psql and IN THE BROWSER!!!