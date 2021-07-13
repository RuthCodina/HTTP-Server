//solo para que arranque la aplicación
import app from './app';
import './database';

//setting
app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), ()=>{
    console.log('Server Listen on port', app.get('port'));
});