# g95-Database
## Welcome to the step-by-step instructions for building our very own g95 database and server with Node, Express, Knex, and Postgresql!

### Tuesday
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
  
  Now that we have our basic express server together, we're going to start messing with knex and postgresql
  - Go back to your terminal and ```npm install knex pg```
    - You can install multiple dependencies in one line 😊
  - We also need to create a database
    - ```createdb DATABASE_NAME_THAT_MAKES_SENSE_FOR_G95_DATABASE```
  - Okay... We have our dependencies installed and have created a database. What's next?
  - ```knex init```
    - This will create a file called 'knexfile.js'
  - Take a look at that file. It's a configuration file and it has a bunch of keys within a module.exports, which will make them available to files outside of your knexfile.
