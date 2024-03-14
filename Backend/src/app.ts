import express, {Request, Response} from 'express'
import routes from './routes';
import helmet from 'helmet';

const app = express();
app.use(express.json());
app.use(helmet())
//app.use(express.urlencoded( { extended: true} ))
routes(app);



app.listen(3000, () => {
    console.log("Application listening at http://localhost:3000");
})