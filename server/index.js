import express from 'express';
import 'dotenv/config';
import http from 'http';
import connectToDB from './database/mongoDb.js';
import User from './model/user.model.js';
import UserRoutes from './routes/user.routes.js';

const app = express();


// app.use(cors({
//     exposedHeaders: ['jwtToken'] // to allow frontend to read this header from response. If dont want to do it here then you can do it in client side fetch API also by passing  option 'credentials: "include"' in fetch.
// })); // This is global for all requests.

app.use(express.json());
app.use('/api/user', UserRoutes);
// http://localhost:5001/api/user/login

app.all('*', (req, res) => {
    res.status(404).send("Page Not Found!");
    res.status(404).json({message: "API Not Found!"});
})

const PORT = process.env.port || 5001;

// const server = http.createServer(app);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectToDB();
})