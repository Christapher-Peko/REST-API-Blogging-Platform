import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs for Blog Application",
            version: "1.0.0",
            description: "This is the API documentation for the Blog Application. It provides details about the available endpoints and their usage. To view more about the functionalities and source code, please visit the <a href='https://github.com/ChristapherAntony/BlogApplication'>GitHub repository</a>.",
            url: "https://github.com/ChristapherAntony/BlogApplication",
            contact: {
                name: "Christapher Antony",
                url: "https://www.linkedin.com/in/christapherantony-5568a3156/",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description:"This is a development server"
            },
            {
                url: "https://testserver2.tk/",
                description:"This is a deployed server"
            }
        ],

        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
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