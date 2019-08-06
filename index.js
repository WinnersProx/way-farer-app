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
const PORT = process.env.PORT || 3000;
const docsUrl = 'https://way-farer-app-rest.herokuapp.com/api/v1/api-docs/';
// internal server error implementation to use when database will be integrated
/*app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status : "error",
    error  : err.message
  });
  next();
});*/
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