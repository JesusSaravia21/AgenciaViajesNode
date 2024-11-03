import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';



console.log(process.env.DATABASE);

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( err => console.log('Error al conectar a la base de datos:', err));

//Definir el puerto
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Creando nuestro propio middleware

app.use( (req, res, next) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next(); //Aqui forzamos que se vaya al siguiente middleware
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));


//Usar router
app.use('/', router);

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})