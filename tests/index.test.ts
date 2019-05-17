// tslint:disable-next-line:no-var-requires
const Koa = require('koa');
// tslint:disable-next-line:no-var-requires
const request = require('supertest');
// tslint:disable-next-line:no-var-requires
const monitor = require('../dist/index').default;

const port = 3000;
const code200 = 200;
const code404 = 404;
const app = new Koa();
const auth = {
  name: 'monitor',
  password: 'monitor'
};

describe('daruk-monitor-middleware error', function cb() {
  let server;
  before((done) => {
    app.use(
      monitor({
        auth
      })
    );

    server = app.listen(port, done);
  });

  after((done) => {
    server.close(done);
  });

  it('/monitor/ start up with v8ProfilerPath error', (done) => {
    request(server)
      .get('/monitor/profiler/function')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return res.text === `The argument 'id' must be a non-empty string. Received ''`;
      })
      .end(done);
  });
});

describe('daruk-monitor', function cb() {
  let server;
  before((done) => {
    app.use(
      monitor({
        auth
      })
    );

    server = app.listen(port, done);
  });

  after((done) => {
    server.close(done);
  });

  it('/monitor auth failed', function(done) {
    // tslint:disable-next-line
    this.timeout(1000);

    request(server)
      .get('/monitor/profiler?period=1000')
      .expect(code200)
      .auth(auth.name, auth.password + 'error')
      .end((err, res) => {
        if (err.message === 'expected 200 "OK", got 401 "Unauthorized"') {
          done();
        }
      });
  });

  it('/monitor/not-found should not throw error when request non-existing route', (done) => {
    request(server)
      .get('/monitor/not-found')
      .auth(auth.name, auth.password)
      .expect(code404)
      .end(done);
  });

  it('/monitor/profiler', (done) => {
    request(server)
      .get('/monitor/profiler')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return 'cpu' in res.body && 'memory' in res.body;
      })
      .end(done);
  });

  it('/monitor/profiler/function', (done) => {
    request(server)
      .get('/monitor/profiler/function')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return res.text;
      })
      .end(done);
  });

  it('/monitor/profiler/mem', function(done) {
    // tslint:disable-next-line
    this.timeout(10000);
    request(server)
      .get('/monitor/profiler/mem')
      .expect(code200)
      .auth(auth.name, auth.password)
      .end(done);
  });

  it('/monitor/profiler/mem-analytics', function(done) {
    // tslint:disable-next-line
    this.timeout(15000);
    request(server)
      .get('/monitor/profiler/mem-analytics')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return res.body;
      })
      .end(done);
  });
});
