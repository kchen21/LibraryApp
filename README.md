# Library App

[Library App live][firebase]

[firebase]: https://library-app-541e0.firebaseapp.com/

Library App is a single-page web application built using Ember.js 2 following a tutorial at [YoEmber](http://yoember.com/). It features:

## User Pages

1. a Home page where a user can submit an email address to get notified when Library App launches
1. a Libraries page which shows information about local libraries and allows that information to be edited
2. a Books page which lists all the books available, including information such as Title, Author, Release Year, and Location
3. an Authors page which lists all the authors along with their respective books
4. a Contact page which allows a user to submit a message to the Admin

## Admin Pages

1. an Invitations page which lists the reference ID and email of each user that requested to get notified when Library App launches
2. a Contact Messages page which lists the reference ID, email, and message of each user that contacted the Admin
3. a Seeder page that shows the number of Libraries, Authors, and Books stored in the database, and allows the Admin to seed the database and delete data

Library App uses Firebase for database and app hosting. Seed data is generated using Faker.
