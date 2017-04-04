SELECT vnd_orcamento.orcamento,
       vnd_orcamento.data_emissao,
       cli_cliente.codigo,
       upper(cli_cliente.nome) as nome,
       upper(cli_endereco.endereco) as logradouro,
       cli_endereco.numero,
       upper(cli_endereco.bairro) as bairro,
       upper(cli_endereco.cidade) as cidade,
       upper(cli_endereco.uf) as uf,
       cli_endereco.cep,
       pro_produto.codigo,
       pro_produto.descricao,
       vnd_orcamento_item.quantidade,
       vnd_orcamento_item.vlr_unitario,
       (vnd_orcamento_item.quantidade * vnd_orcamento_item.vlr_unitario)::numeric(18,6) as vlr_total

  FROM vnd_orcamento

  JOIN cli_cliente
    ON cli_cliente.filial = vnd_orcamento.filial_orc
   AND cli_cliente.codigo = vnd_orcamento.cliente

  JOIN cli_endereco
    ON cli_endereco.filial = cli_cliente.filial
   AND cli_endereco.cliente = cli_cliente.codigo
   AND cli_endereco.sequencia = vnd_orcamento.endereco_entrega

 JOIN vnd_orcamento_item
   ON vnd_orcamento_item.filial_orc = vnd_orcamento.filial_orc
  AND vnd_orcamento_item.orcamento = vnd_orcamento.orcamento

 JOIN pro_produto
   ON pro_produto.filial_pro = vnd_orcamento_item.filial_orc
  AND pro_produto.codigo = vnd_orcamento_item.produto

 WHERE vnd_orcamento.tipo != 'O'
   AND vnd_orcamento.gerou_nf_caixa = 'S'
   AND cli_cliente.nome NOT ILIKE '%consu%'

ORDER BY vnd_orcamento.orcamento