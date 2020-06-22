import express, { response } from 'express';
import routes from './routes';

const app = express();

app.get('/', () => {
  return response.json({
    message: "It's working",
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started!');
});
