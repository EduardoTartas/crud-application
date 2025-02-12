import express from 'express';
import cors from 'cors';
import router from './routes/carRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cors('http://localhost:5173/'));

app.use(router);

app.use(errorHandler);

const PORT =  3000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

