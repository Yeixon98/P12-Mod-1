const express = require('express');
import {Request, Response} from 'express';
import {join} from 'path';
import { execmd } from './execmd';

import config from './config';

/**
 * Clase Server que representa la API
 */
export default class Server {
  public app = express();

  /**
   * Constructor que crea todo lo necesario apra la API y añade sus endpoints
   * @param port Puerto de escucha
   */
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
          execmd(command, args).then(res_ => {
            res.status(200).json({message: res_, status: true})
          }).catch(err_ => {
            res.status(500).json({error: err_, status: false})
          })
        else 
          res.send('<h1 style="text-align: center;margin-top: 50px;">Unauthorized</h1>');
      }
    });

    this.app.get('*', (_: Request, res: Response) => {
      res.send('<h1 style="text-align: center;margin-top: 50px;">ERROR 404</h1>');
    });

  }

  /**
   * Activa la escucha de la API
   */
  start(): void {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port);
    });
  }

}




