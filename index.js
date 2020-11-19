const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');

const userRouter = require('./routes/users');
const blogRouter = require('./routes/blogs');
const likeDislikeRouter = require('./routes/likeDislike');

app.use(express.json());
app.use(morgan('dev'));
app.use(userRouter);
app.use(blogRouter);
app.use(likeDislikeRouter);

// error
app.use(function (req, res, next) {
    if (!req.user) return next(createError(401, 'Please login!'))
    next()
});

// PORT
const PORT = process.env.PORT || 2023

// the PORT listener
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} PORT`);
})