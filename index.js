import express from 'express';
import apiRouter from './server/routes/';
import authentication from './server/middlewares/authentication';
import swaggerUi from 'swagger-ui-express';
import docs from './swagger.json';
const app = express();
const PORT = process.env.PORT || 3000;
const docsUrl = 'https://way-farer-app-rest.herokuapp.com/api/v1/api-docs/';

app.use(express.urlencoded({extended : false}));
app.use(authentication.initialize());
app.use(apiRouter);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use('**', (req,res) => {
	return res.status(404).send({
		status : "error",
		error  : `The requested resource was not found on the server, Kindly read documentation here : ${docsUrl}`
	});
})

app.listen(PORT, () => {
    console.log(`WayFarer server has been started on port:${PORT}`)
})

export default app