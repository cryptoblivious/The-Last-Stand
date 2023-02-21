import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ foo: 'bar' });
});

let port = 3000;

app.listen(port, () => {
  console.log('Server started, listening on port ' + port);
});
