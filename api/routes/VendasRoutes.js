'use strict'

const express = require('express');
const router = express.Router();
const VendasModel = require('../models/VendasModel')

// rota para retornar todas as vendas limitando com 100
router.get('/vendas/json', (req, res) => {
  VendasModel.find({}, (err, data) => {
  	if (err) return res.json(err)
  		return res.json(data)
  }).limit(100)
})

// rota para retornar os dados agrupados
router.get('/vendas/agrupar/:option', (req, res) => {

  // switch case para descobrir em qual caso entrar
  // uf -- Por UF
  // cl -- Por Cliente
  // pr -- Por Produto
  switch (req.params.option) {
    case 'uf':
    GroupByUF();
    break;
    case 'cl':
    GroupByCliente()
    break;
    case 'pr':
    GroupByProduto()
    break;
    default:
    return res.json({error:true, message:"Opção não implementada"})
    break;
  }


  // retorno group by produto
  function GroupByProduto() {
    VendasModel.aggregate([
    {
      $group: {
        _id: '$produto_codigo',
        produto_descricao: {$first: '$produto_descricao'},
        total_de_vendas: {$sum: '$venda_valor_total'},
        quantidade_pedidos: { $sum: 1 }
      }
    },
    {
      $sort: { 'total_de_vendas': -1 }
    }
    ], (err, data) => {
      if (err) return res.json(err)
        return res.json(data)
    })
  }

  // retorno group by cliente
  function GroupByCliente() {
    VendasModel.aggregate([
    {
      $sort: { 'cliente_codigo': -1 }
    },
    {
      $group: {
        _id: '$cliente_codigo',
        cliente: {$first: '$cliente_nome'},
        total_de_vendas: {$sum: '$venda_valor_total'},
        quantidade_pedidos: { $sum: 1 }
      }
    }], (err, data) => {
      if (err) return res.json(err)
        return res.json(data)
    })
  }

  // retorno group by uf
  function GroupByUF() {
    VendasModel.aggregate([{
      $group: {
        _id: '$cliente_uf',
        total_de_vendas: {$sum: '$venda_valor_total'}
      }
    }], (err, data) => {
      if (err) return res.json(err)
        return res.json(data)
    })
  }
})

module.exports = router;