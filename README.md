
  # User Authentication API

  This project is a User Authentication API built with NestJS.

  ## Installation
  
  This backend application is built with NestJS, a progressive Node.js framework. To install the application, follow the steps below:

  1. Build and up the Docker container which contains the PostgreSQL database:
  ```bash
  docker-compose up
  ```

  2. Install the dependencies:
  ```bash
  npm install
  ```

  note: create a `.env` file base on the .env.example file and set the environment variables.

  3. Run the application in development mode:
  ```bash
  npm run start:dev
  ```

  ## Usage

  The API has the following endpoints:

  - `POST /api/v1/register`: Register a new user
  - `POST /api/v1/login`: Login a user
  - `GET /api/v1/protected`: Test a protected route

  ## Swagger Documentation

  The API documentation is available at `http://localhost:3000/api/v1/docs`.
  You can use Swagger to test the API endpoints, be sure to be logged in to access the protected routes puting the token in the `Authorize` button.

  ## Testing

  Here we have test for each endpoint, into the file `test/app.e2e-spec.ts`.

  To run the tests, use the following command:
  ```bash
  npm run test:e2e
  ```

  note: be sure to have the application and the database running before running the tests.



