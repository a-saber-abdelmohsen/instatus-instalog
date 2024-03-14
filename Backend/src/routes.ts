import { Express, Request, Response } from 'express'
import { createEvent } from './controllers/events.controller';

function routes(app: Express) {
    app.all("/health", (req: Request, res: Response) => res.sendStatus(200));


    // app.get("/api/books/:bookId/:authorId",
    //     (req: Request<{ bookId: string, authorId: string }, {}, {}, {}>, res: Response) => {
    //         console.log(req.params);

    //     })

    app.post("/events", createEvent)
}


export default routes;