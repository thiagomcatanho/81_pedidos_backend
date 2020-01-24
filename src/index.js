const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
	extends: true
}));

app.use('/', require('./routes'));

app.listen(8084, function(){
    console.log('Server On ! Port: 8084');
});