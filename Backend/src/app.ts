import express, {Request, Response} from 'express'
import routes from './routes';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'; // For YAML files
var cors = require('cors')

const app = express();

const openapiDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use(cors())
app.use(express.json());
app.use(helmet())
//app.use(express.urlencoded( { extended: true} ))
routes(app);



app.listen(3000, () => {
    console.log("Application listening at http://localhost:3000");
})