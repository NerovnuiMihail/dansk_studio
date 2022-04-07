const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');


const app = express();
const hbs = exphbs.create({extname: 'hbs'});
app.engine('hbs', hbs.engine);
app.set('view engine','hbs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная'
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started an: http://localhost:${PORT}`));