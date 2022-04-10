const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const homeRouter = require('./routes/home');
const aboutmeRouter = require('./routes/aboutme');
const utilsRouter = require('./routes/utils');
const workandpayRouter = require('./routes/workandpay');
const enrollRouter = require('./routes/enroll');


const app = express();
const hbs = exphbs.create({extname: 'hbs'});
app.engine('hbs', hbs.engine);
app.set('view engine','hbs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));

app.use('/', homeRouter);
app.use('/aboutme',aboutmeRouter);
app.use('/utils', utilsRouter);
app.use('/workandpay', workandpayRouter);
app.use('/enroll', enrollRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started an: http://localhost:${PORT}`));