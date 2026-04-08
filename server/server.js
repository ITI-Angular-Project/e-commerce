import jsonServer from 'json-server';
import auth from 'json-server-auth';

// const jsonServer = require('json-server');
// const auth = require('json-server-auth');

const app = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

// /!\ Bind the router db to the app
app.db = router.db;

const routes = router.db.getState();

console.log('Available routes:');
Object.keys(routes).forEach((route) => {
  console.log(`/${route}`);
});
// You must apply the auth middleware before the router
app.use(middlewares);
app.use(auth);
app.use(router);
app.listen(3000);
