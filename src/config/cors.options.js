const corsOptions = {
    origin: ['http://localhost:3000', 'https://testserver2.tk/','https://rest-api-blogging-platform-production.up.railway.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

export default corsOptions; 


 