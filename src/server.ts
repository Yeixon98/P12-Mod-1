const express = require('express');
import {Request, Response} from 'express';
import {join} from 'path';
import { execmd } from './execmd';

import config from './config';

export default class Server {
  public app = express();

  constructor(private readonly port: number) {

    this.app.use(express.json());
    this.app.use(express.static(join(__dirname, '../public')));

    this.app.get('/execmd', (req: Request, res: Response) => {
      if (!req.query.cmd || !req.query.args) {
        res.send('<h1 style="text-align: center;margin-top: 50px;">Bad Request</h1>');
      } else {
        const pass = req.query.pass as string
        const command = req.query.cmd as string
        const allargs: string = req.query.args as string
        const args: string[] = allargs.split(" ")

        if (pass == config.passRequest)
          execmd(command, args, (err, data) => {
            if (err)
              res.send('<h1 style="text-align: center;margin-top: 50px;">ERROR. No se ha podido realizar la acción</h1>');
            else
              res.send(data ? data : '<h1 style="text-align: center;margin-top: 50px;">Acción Realizada</h1>');
          });
        else 
          res.send('<h1 style="text-align: center;margin-top: 50px;">Unauthorized</h1>');
      }
    });

    this.app.get('*', (_: Request, res: Response) => {
      res.send('<h1 style="text-align: center;margin-top: 50px;">ERROR 404</h1>');
    });

  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port);
    });
  }

}




