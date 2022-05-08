import "reflect-metadata";
import express from 'express';
import bodyParser from "body-parser";
import * as personController from './controllers/person.controller';
import * as groupController from './controllers/group.controller';
import * as db from './data-access/data-source';


export class App {
  public srv = express();
  
  constructor() {
    db.initDb();
    this.initExpressMiddleware();
    this.initRoutes();
    this.start();
  }

  start() {
    const port = 3001;
    this.srv.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }

  private initExpressMiddleware() {
    this.srv.use((req, res, next) => {
      const start = Date.now();
      next();
      const delta = Date.now() - start;
      console.log(`${req.method} ${req.url} ${delta}ms`);
    });
  }

  private initRoutes() {
    this.srv.use(bodyParser.json());
    this.srv.use('/', personController.router);
    this.srv.use('/', groupController.router);
  }
}
export default new App();