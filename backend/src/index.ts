import express from 'express';
import bodyParser from 'body-parser';
import urlShortener from 'node-url-shortener';
import cors from 'cors';
/* @ts-ignore */
import UserRoutes from './routes/UserRoutes';
/* @ts-ignore */
import SearchHistoryRoutes from './routes/SearchHistoryRoutes';
/* @ts-ignore */
import ApiRoutes from './routes/ApiRoutes';
/* @ts-ignore */
import AuthRoutes from './routes/AuthRoutes'

const auth = require('./middleware/AuthJwt')
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

//with this route we start session and it provides us with the jwt
app.use('/api/', AuthRoutes);
//This route requires authentication with jwt
app.use('/api/user', auth, UserRoutes);
//This route requires authentication with jwt
app.use('/api/searchHistory', auth, SearchHistoryRoutes);
//This route requires authentication with jwt
app.use('/api/search', auth, ApiRoutes);


sequelize.sync({ force: false, logging: console.log }).then( () => {
    console.log("¡We connect to the database!");
    app.listen(port, function(){
        console.log('¡Server up in port '+port+'!');
    });
}).catch((error: any) => {
    console.log(error)
});