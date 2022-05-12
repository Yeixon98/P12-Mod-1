import 'mocha';
import {expect} from 'chai';
import {execmd} from '../src/execmd'

describe('execmd Funtion', () => {
  it('ls public', (done) => {
    execmd("ls", ["public"]).then(res => {
      expect(res).to.be.equal('index.html\n');
      done();
    })
  });

  it('cat README.md', (done) => {
    execmd("cat", ["README.md"]).then(res => {
      expect(res).to.be.equal(`# Practica 12 - Modificación - 1
### 12/05/2022

[![Tests](https://github.com/Yeixon98/P12-Mod-1/actions/workflows/tests.yml/badge.svg)](https://github.com/Yeixon98/P12-Mod-1/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/Yeixon98/P12-Mod-1/badge.svg?branch=master)](https://coveralls.io/github/Yeixon98/P12-Mod-1?branch=master)\n`);
      done();
    })
  });

  it('Bad Command', (done) => {
    execmd("catHOLA", ["public"]).then(res => {
    }).catch(err => {
      expect(err).to.be.equal('Ha ocurrido un error en la ejecucion');
      done()
    })
  });
});