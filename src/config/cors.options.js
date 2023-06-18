const corsOptions = {
    origin: ['http://localhost:3000', 'https://www.testserver1.cf','https://messaging-app-theta.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

export default corsOptions;


