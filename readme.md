

# To-Do-TY API

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/api-to-do-ty)

**To-Do-TY** is a TypeScript-based API designed for efficient task management. It features JWT authentication to ensure secure route access.

## Features

- **JWT Authentication**: Secure route access with JSON Web Tokens.
- **Task Management**: Create, update, and delete tasks.

## Tech Stack

The To-Do-TY API utilizes the following technologies:

- [Node.js](https://nodejs.org/) - JavaScript runtime for server-side code.
- [Express.js](https://expressjs.com/) - Framework for building web applications.
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript with static types.
- [JWT](https://jwt.io/) - Authentication mechanism using JSON Web Tokens.
- [Swagger](https://swagger.io/) - API documentation and testing.
- [Jest](https://jestjs.io/) - Testing framework for JavaScript and TypeScript.


### Tech Stack

The To-Do-TY API uses the following technologies:

- [Node.js](https://nodejs.org/) - JavaScript runtime for server-side code.
- [Express.js](https://expressjs.com/) - Framework for building web applications.
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript with static types.
- [JWT](https://jwt.io/) - Authentication mechanism using JSON Web Tokens.
- [Swagger]() - 
- [Jest]() - 

### Installation

To set up and run the API locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/api-to-do-ty.git
   ```
   
2. **Install dependencies:**:
   ```sh
    npm install
   ```
   
3. **Run the development server:**:
   ```sh
    npm run dev
   ```

4. **Run tests:**:
    ```sh
    npm run test
   ```
   
5. **Run the API documentatio wtih Swagger:**:
   ```sh
    npm run server
   ```
  Open your browser and navigate to http://localhost:3000/api-docs to view the Swagger documentation.
  
  
### Docker Setup

 To run the API using Docker and Docker Compose, follow these steps:
 
1. **Build the Docker image**:
   ```sh
    docker-compose build
   ```
 
2. **Start the services:**:
   ```sh
    docker-compose up
   ```
 This will start both the API and MongoDB services. The API will be accessible at http://localhost:3000. 


3. **Stop the services:**:
   ```sh
    docker-compose down
   ```

You can test the API using tools like Insomnia or Postman. Import the API documentation from Swagger for easy testing of endpoint.



### License

Distributed under the MIT License. See LICENSE [LICENSE](LICENSE)for more information.
   
   
   