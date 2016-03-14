var express = require('express');
var app = express();
var mongoose = require("mongoose");

//connect to database
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');

//create schema for blog post
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

//compile schema to model
var ContatosModel = db.model('contatos', contatosSchema)

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
