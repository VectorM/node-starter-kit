import express, { Router } from 'express';


const app = express();

const port = process.env.PORT || 3000;

const bookRouter = Router();

bookRouter.route('/Books')
  .get((req,res) => {
    const responeJson = {hello: "This is my api"};

    res.json(responeJson)
  })

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send('Welcome to my API')
})

app.listen(port, () => {
  console.log(`Running on PORT: ${port}`);
})
