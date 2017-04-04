'use strict'

const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/teste-vendas')
const Schema = mongoose.Schema

const _schema = {
  orcamento: Number,
  data_emissao: Date,
  cliente_codigo: Number,
  cliente_nome: String,
  cliente_logradouro: String,
  cliente_numero: Number,
  cliente_bairro: String,
  cliente_cidade: String,
  cliente_uf: String,
  cliente_cep: Number,
  produto_codigo: Number,
  produto_descricao: String,
  venda_quantidade: Number,
  venda_valor_unitario: Number,
  venda_valor_total: Number
}

const VendasSchema = new Schema(_schema, { versionKey: false } )
const VendasModel = mongoose.model('venda', VendasSchema)

const instream = fs.createReadStream('vendas.csv')
const outstream = new stream
const rl = readline.createInterface(instream, outstream)

rl.on('line', function(line) {
  var ln = line.split('|||')
  var data = {
    orcamento: ln[0],
    data_emissao: ln[1],
    cliente_codigo: ln[2],
    cliente_nome: ln[3],
    cliente_logradouro: ln[4],
    cliente_numero: ln[5],
    cliente_bairro: ln[6],
    cliente_cidade: ln[7],
    cliente_uf: ln[8],
    cliente_cep: ln[9],
    produto_codigo: ln[10],
    produto_descricao: ln[11],
    venda_quantidade: ln[12],
    venda_valor_unitario: ln[13],
    venda_valor_total: ln[14]
  }
  
  VendasModel.create(data, (err, data) => {
    if (err) return console.log(err)
  })
  
})

rl.on('close', function() {
  mongoose.connection.close()
  console.log('Arquivo Finalizado')
})