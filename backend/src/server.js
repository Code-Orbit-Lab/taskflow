const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

async function start() {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`[server] Running on port ${env.port} (${env.nodeEnv})`);
  });
}

start();
