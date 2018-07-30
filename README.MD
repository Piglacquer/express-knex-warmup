#g90 Server

##Instructions
###Monday:
- Create a database, you can find the name of the database-to-be-created in the knexfile.
    - $createdb db_name
- Take existing file structure, create migrations and seeds
    - $knex migrate:make migration_name
    - $knex seed:make seed_name
- Create a migration that has four text inputs (first name, last name, previouse occupation, and hometown) and an id.
- Create a seed file with your information as the first item in your seed, then slack that data object out to g90.
- Run migrations and seeds
    - $knex migrate:latest
    - $knex seed:run
- Add the rest of your classmates the seed file
- Rollback your migration, then migrate and seed again.
- Troubleshoot