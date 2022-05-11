let chai_ = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
import { Request, Response } from 'express';
import config from '../src/config'

chai_.use(chaiHttp)
const url= 'http://localhost:5001';

describe('API Tests', () => {
  it('API ls public', (done) => {
    chai_.request(url)
    .get('/execmd?cmd=ls&args=public&pass=' + config.passRequest)
    .end((_: Request, res: Response) => {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('API cat README.md', (done) => {
    chai_.request(url)
    .get('/execmd?cmd=cat&args=README.md&pass=' + config.passRequest)
    .end((_: Request, res: Response) => {
      expect(res).to.have.status(200);
      done();
    });
  });
});