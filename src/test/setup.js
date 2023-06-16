// import { MongoMemoryServer } from 'mongodb-memory-server';
const MongoMemoryServer = require 'mmongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app.js';

// declare global {
//   namespace NodeJS {
//     interface Global {
//       signin(): Promise<string[]>;
//     }
//   }
// }

// declare global {
//   namespace NodeJS {
//     interface Global {
//       signin(): string[];
//     }
//   }
// }


// declare global {
//   var signin: () =>string[];
// }



// let mongo: any;

// config run before all test
beforeAll(async () => {
    process.env.JWT_KEY = '132456';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });
});
// config run before all test-- clear db
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



// global.signin = async () => {
//   const email = 'test@test.com';
//   const password = 'password';

//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({
//       email,
//       password
//     })
//     .expect(201);

//   const cookie = response.get('Set-Cookie');

//   return cookie;
// };