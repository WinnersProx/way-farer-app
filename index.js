import express from 'express';
import apiRouter from './server/routes/';
import authentication from './server/middlewares/authentication';
import swaggerUi from 'swagger-ui-express';
import docs from './swagger.json';
// some middlewares
const app = express()
app.use(express.urlencoded({extended : false}));
app.use(authentication.initialize());
app.use(apiRouter);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`WayFarer server has been started on port:${PORT}`)
})

export default app