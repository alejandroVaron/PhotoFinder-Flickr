import express from 'express';
import bodyParser from 'body-parser';
import urlShortener from 'node-url-shortener';
import cors from 'cors';
/* @ts-ignore */
import UserRoutes from './routes/UserRoutes';
/* @ts-ignore */
import SearchHistoryRoutes from './routes/SearchHistoryRoutes';
/* @ts-ignore */
import ApiRoutes from './routes/ApiRoutes'

const sequelize = require('../db/database');
const app = express();
var port =   process.env.PORT || 3000;
if(!process.env.DATABASE_URL){
    port = 3000;
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req: any, res: any) => {
    res.end('¡Welcome!');
})

app.post('/url', function(req: any, res: any) {
    const url = req.body.url;
    urlShortener.short(url, function(err: any, shortUrl: any){
        res.send(shortUrl);
    });
});

app.use('/api/user', UserRoutes);
app.use('/api/searchHistory', SearchHistoryRoutes);
app.use('/api/search', ApiRoutes);


sequelize.sync({ force: false, logging: console.log }).then( () => {
    console.log("¡We connect to the database!");
    app.listen(port, function(){
        console.log('¡Server up in port '+port+'!');
    });
}).catch((error: any) => {
    console.log(error)
});