import express from 'express'
import apiRouter from './server/routes/'
import authentication from './server/middlewares/authentication';
// some middlewares
const app = express()
app.use(express.urlencoded({extended : false}));
app.use(authentication.initialize());
app.use(apiRouter);

const PORT = process.env.PORT || 3000
// internal server side error handlers
app.use((err, req, res, next) => {
    return res.status(err.status || 500)
    .send({
        status : "error",
        error: {
            message: err.message,
            error: err
        }
    });
    next();
});
app.listen(PORT, () => {
    console.log(`WayFarer server has been started on port:${PORT}`)
})

export default app