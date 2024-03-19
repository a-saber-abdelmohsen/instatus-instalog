import { Express, Request, Response } from 'express'
import { createEvent, getEvents } from './controllers/events.controller';
import { createAction, getAllActions } from './controllers/actions.controller';


function routes(app: Express) {

    var cors = require('cors')
    var corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.all("/health", cors(corsOptions), (req: Request, res: Response) => res.sendStatus(200));

    app.post("/events", cors(corsOptions), createEvent);
    app.get("/events", cors(corsOptions), getEvents);

    app.post("/actions", cors(corsOptions), createAction);
    app.get("/actions", cors(corsOptions), getAllActions);
}


export default routes;