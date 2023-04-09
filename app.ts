var express = require('express');
const cors = require('cors');
const path = require('path');

require("./db.connection");

const indexRouter = require('./routes/index');
const errorMiddleware = require('./middleware/error')
const analyticsRouter = require('./routes/analytics');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/analytics', analyticsRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});

module.exports = app;