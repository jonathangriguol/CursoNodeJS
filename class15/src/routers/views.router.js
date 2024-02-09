import express  from "express";

const viewsRouter = express.Router();

viewsRouter.get('/home', (req, res) => {
    res.render('home.handlebars', {});
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts.handlebars', {});
});

viewsRouter.get('/chat', (req, res) => {
    res.render('chat.handlebars', {});
});

export default viewsRouter;