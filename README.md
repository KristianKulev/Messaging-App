Messaging app, implemented using React/Redux && Node

* To run the FE

  1. `cd FE`
  2. `npm i`
  3. `npm start`
  4. server is started on localhost:3000, access the app there
  5. go to http://localhost:3000/login and use users:
    {
      username: 'tester',
      password: 'asd'
    }

    or

    {
      username: 'admin',
      password: 'pass'
    }

    or use /register to register a new user.
  6. /dashboard is where you can find users by username and start a conversation with them

* To run the BE

  1. `cd BE`
  2. `npm i`
  3. `nodemon -w server.js`
  4. server is started on localhost:8080