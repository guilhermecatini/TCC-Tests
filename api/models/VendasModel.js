'use strict'

const mongoose = require('mongoose')
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

module.exports = VendasModel