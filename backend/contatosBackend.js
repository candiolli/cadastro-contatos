var express = require('express');
var app = express();
var mongoose = require("mongoose");


app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var contatos = null;
var operadoras = null;
var usuarios = null;

//db connection
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');

//schema
var contatosSchema = new mongoose.Schema({
  nome: String, 
  telefone: Number, 
  data: Date, 
  operadora: {
    nome: String, 
    codigo: Number, 
    categoria: String
  }
});

var usuariosSchema = new mongoose.Schema({
	nome : String,
	login : String,
	cidade : String,
	estado : String
});

var operadorasSchema = new mongoose.Schema({
	nome: String, 
	codigo: Number, 
	categoria: String, 
	preco: Number
});

//Model
var ContatosModel = db.model('contatos', contatosSchema);
var OperadorasModel = db.model('operadoras', operadorasSchema);
var UsuariosModel = db.model('usuarios', usuariosSchema);


app.listen(process.env.PORT || 3412);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/contatos', function(req, res) {
  
  ContatosModel.find().lean().exec(function(err, contatos) {
      res.end(JSON.stringify(contatos));
  });

});

app.post('/contatos', function(req, res) {

	console.log(res);
	/*ContatosModel.save(res.body);*/


  /*contatos.push(req.body);
  res.json(true);*/
});

app.get('/operadoras', function(req, res) {
  
  OperadorasModel.find().lean().exec(function(err, oper) {
      res.end(JSON.stringify(oper));
  });

});
