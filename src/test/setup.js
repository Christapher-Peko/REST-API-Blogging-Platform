import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


let mongo; // Declare the mongo variable

// config run before all test
beforeAll(async () => {
    //test env's
    process.env.JWT_SECRET = "123456";
    //to skip api key check in test env
    process.env.TEST = true;
    



    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });
});

// config run before each test - clear DB
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

// Add your tests here
