import express from 'express';
import bodyParser from 'body-parser';
import urlShortener from 'node-url-shortener';
import cors from 'cors'

const app = express();
var port =   process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.listen(port, function(){
    console.log('¡Server up in port '+port+'!');
});

app.get('/api', (req, res) => {
    res.end('Esta es la api!!!');
})

app.get('/', (req, res) => {
    res.end('¡Welcome!');
})

app.post('/url', function(req, res) {
    const url = req.body.url;
    urlShortener.short(url, function(err, shortUrl){
        res.send(shortUrl);
    });
});

