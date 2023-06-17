# RESTful API for a Blogging Platform
This project implements a RESTful API for a Blogging Platform using Node.js, Express.js, and MongoDB. It provides endpoints for user registration, authentication, and blog management.


## Table of Contents
* [Features](#features)
* [API documentation](#api-documentation)
* [Folder Structure](#folder-structure)
* [Technologies Used](#technologies-used)

* [Getting Started](#getting-started)



## Features

- User registration and authentication (signup, login, logout)
- Blog functionality (create, edit, delete, view by ID, view all blogs)
- Comment, like, and tag functionalities (work in progress)
- Validation of input fields using express-validator
- Response normalization strategies for consistent error and success responses
- Unit testing of APIs using Jest and Supertest
- API documentation with Swagger

## API documentation
The API documentation is available at [API Docs](https://testserver2.tk/api-docs). It provides details about the available endpoints, request/response structures, and examples.

## Folder Structure

The project has the following folder structure:

- `docs`: Contains the API documentation and setup for Swagger.
  - `schemas`: Stores the YAML files defining the data schemas used in the API.
  - `swagger.js`: Acts as the entry point for the API documentation, referencing the individual endpoint files and components.

- `src`: Contains all the source code of the project.
  - `config`: Contains configuration files for the project.
  - `controllers`: Holds the controller modules responsible for handling the request/response flow.
  - `middleware`: Includes custom middleware modules for request processing.
  - `models`: Contains the data model or schema definitions.
  - `repositories`: Contains the repository modules responsible for data access and manipulation.
  - `routes`: Contains the route modules that define the API endpoints and their corresponding controller methods.
    - `__test__`: Includes all the unit testing implementations for the routes.
    - `routes.js`: Defines the API routes and their corresponding controllers.
  - `services`: Contains additional service modules for maintaining business logic and reusability.
  - `test`: Includes the test files and configurations for unit testing.
  - `utils`: Contains utility modules and helper functions used across the project.
     
- `.env.template`: Contains template for creating environment variales.




## Technologies Used

|   Stack                                | Technology Used                    |
|     :---:                              |     :---:                          |  
| Backend                                | Node.js , Express.js,               |  
| Database                               | MongoDB-Mongoose                  |
| Authentication                         |JSON Web Token    |     
| Unit testing                        |  Jest, Supertest, mongodb-memory-server         |
| Documentation                         |  Swagger                               |
| Version control                        |  Git                               |
| Deployed in                      |  DigitalOcean                              |



## Getting Started
To get started  you can simply clone this `REST-API-Blogging-Platform` repository and install the dependencies.

Clone the `REST-API-Blogging-Platform` repository using git:

```bash
git clone https://github.com/ChristapherAntony/REST-API-Blogging-Platform.git
```

Create a .env file in the server and client directory . Add environment-specific variables  specified in '.env.template' file in respective directory
```bash
MONGODB_URI=<--your mongo db URL--->
PORT=<---port--->
NODE_ENV=<--- production or development--->      
JWT_SECRET=<---your_jwt_secret_value--->

```

Install dependencies :
```bash
cd REST-API-Blogging-Platform
npm install
```
Start the server :
```bash
npm start
```
Run unit test with jest:
```bash
npm run test
```


## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## Feedback and Contact

Feel free to contact me if you have any questions or feedback regarding this project. Your input is highly appreciated.

Looking forward to your response and feedback!

[@ChristapherAntony](https://www.linkedin.com/in/christapherantony-5568a3156/)
