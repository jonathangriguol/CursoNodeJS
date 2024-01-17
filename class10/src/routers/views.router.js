import express  from "express";

const viewsRouter = express.Router();

viewsRouter.get('/home', (req, res) => {
    res.render('home.handlebars', {});
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts.handlebars', {});
});

export default viewsRouter;