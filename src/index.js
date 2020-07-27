const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const connectionString = `mongodb://localhost:27017/docker-simple`;
const db = require('@paralect/node-mongo').connect(connectionString);
const logsService = db.createService('logs');
const meService = db.createService('me');


const router = new Router();
router.get('/me', async (ctx, next) => {
  const res = await meService.findOne({});
  ctx.body = res;
  return next();
});

router.get('/logs', async (ctx, next) => {
  const res = await logsService.find({});
  ctx.body = res;
  return next();
});

router.post('/logs', async (ctx, next) => {
  const data = ctx.request.body;
  const res = await logsService.create(data);
  ctx.body = res;
  return next();
});


const app = new Koa();
app.use(bodyParser());


app.listen(3000);
