import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs for Blog Application",
            version: "1.0.0",
            description: `Welcome to the API documentation for the Blog Application. This documentation provides comprehensive details about the available endpoints and their usage. It also offers an overview of the application's functionalities and source code.

To explore the complete functionalities and access the source code, please visit the <a href='https://github.com/ChristapherAntony/REST-API-Blogging-Platform'>GitHub repository</a>.

Try It Out:
To test the API endpoints, please select the deployed server from the list below and authorize the requests with the following API key:

API_KEY: <a>"Bearer 648f0c1e196c47ba4037f142"<a/>

Please note that the API key should be included in the 'Authorization' header as a Bearer token.

If you have any feedback or need further assistance, feel free to contact 

<a href='https://www.linkedin.com/in/christapherantony-5568a3156/'>Christapher Antony</a>.

christapher012@gmail.com
`,

        },

        // servers: [
        //     {
        //         url: "https://testserver2.tk/",
        //         description: "This is a deployed server"
        //     },
        //     {
        //         url: "http://localhost:3000/",
        //         description: "This is a development server"
        //     },
            
        // ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "API key required to access the protected routes.",
                    bearerFormat: "Bearer <API_KEY>",
                }

            },
        },
        security: [
            {
                ApiKeyAuth: [],
            }
        ],
    },
    apis: ["./src/routes/*.js", "./docs/schema/*.js"],
};


const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    // Swagger page
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

}

export default swaggerDocs;










// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "REST API Docs for Blog Application",
//             version: "1.0.0",
//             description: "This is the API documentation for the Blog Application. It provides details about the available endpoints and their usage. To view more about the functionalities and source code, please visit the <a href='https://github.com/ChristapherAntony/BlogApplication'>GitHub repository</a>.",
//             url: "https://github.com/ChristapherAntony/BlogApplication",
//             contact: {
//                 name: "Christapher Antony",
//                 url: "https://www.linkedin.com/in/christapherantony-5568a3156/",
//             },
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000/",
//                 description: "This is a development server"
//             },
//             {
//                 url: "https://testserver2.tk/",
//                 description: "This is a deployed server"
//             }
//         ],

//         components: {
//             securitySchemas: {
//                 bearerAuth: {
//                     type: "http",
//                     scheme: "bearer",
//                     bearerFormat: "JWT",
//                 },
//                 ApiKeyAuth: {
//                     type: "apiKey",
//                     in: "headers",
//                     name: "Authorization"
//                 }
//             },
//         },
//         security: [
//             {
//                 bearerAuth: [],
//             },
//             {
//                 ApiKeyAuth: []
//             }
//         ]
//     },
//     apis: ["./src/routes/*.js", "./docs/schema/*.js"],
// };