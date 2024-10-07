/* eslint-disable linebreak-style */
import { after, describe } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import db from '../../db/dbconfig.js';

chai.use(chaiHttp);
const { expect } = chai;

after(async () => {
  await db.destroy();
});

describe('GET em /eventos', () => {
  it('Deve retornar uma lista de eventos', (done) => {
    process.env.EVENTO_FLAG = 'true';
    chai.request(app)
      .get('/eventos')
      .set('accept', 'aplication/json')
      .end((erro, res) => {
        expect(res.body).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('descricao');
        done();
      });
  });

  it('Deve retorna erro 404', (done) => {
    process.env.EVENTO_FLAG = 'false';
    chai.request(app)
      .get('/eventos')
      .set('Accept', 'application/json')
      .end((erro, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
