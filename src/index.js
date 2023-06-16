import connectDb from "./config/db.config.js";
import config from "./config/env.config.js";
import swaggerDocs from "../docs/swagger.js";
import { app } from "./app.js";

// Start server
const start = async () => {
    connectDb();
    swaggerDocs(app, config.port)
    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}...✅ `);
    });
};
start();
