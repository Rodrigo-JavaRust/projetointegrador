🛒 S-MART — Comparação Colaborativa de Preços e Lista de Compras Inteligente

O S-MART é uma aplicação web com foco em dispositivos móveis (*smartphones*), idealizada para auxiliar famílias na organização de suas compras e na busca pelos melhores preços de produtos alimentícios e itens essenciais em estabelecimentos físicos locais.

Baseado nos conceitos de **economia colaborativa** e **inclusão digital**, o projeto permite que o usuário monte sua lista de compras personalizada de maneira rápida e intuitiva, preparando a base para comparar preços entre supermercados da região.

🎯 Objetivos e Impacto Social

O projeto nasceu como uma atividade de extensão universitária para enfrentar o impacto da inflação dos alimentos no orçamento doméstico, especialmente de famílias em situação de vulnerabilidade socioeconômica. Seus pilares são:

- Economia Doméstica: Facilitar o planejamento de compras e a identificação de estabelecimentos mais econômicos.
- Fortalecimento do Comércio Local: Dar visibilidade a pequenos e médios mercados de bairro frente às grandes redes varejistas.
- Alinhamento aos ODS da ONU: Contribui diretamente para os Objetivos de Desenvolvimento Sustentável das Nações Unidas, com foco na Erradicação da Pobreza (ODS 1), Indústria, Inovação e Infraestrutura (ODS 9) e Redução das Desigualdades (ODS 10).

📱 Manual de Uso

O aplicativo foi desenhado para ser simples e direto, funcionando diretamente no navegador do celular ou computador. Veja como utilizar cada recurso:

1. Navegar pelo Catálogo de Produtos
Na tela inicial, os produtos estão organizados em 3 níveis hierárquicos:
1. Departamentos (Seções): Toque em uma das 15 categorias principais (como Açougue, Padaria, Hortifruti, Bebidas, Laticínios, Mercearia, Limpeza, entre outras) para abri-la.
2. Subcategorias: Dentro da seção escolhida, toque na subcategoria desejada (ex.: dentro de Mercearia, toque em Arroz ou Feijão).
3. Produtos: Visualize a lista de itens disponíveis naquela subcategoria.

2. Pesquisar Produtos ou Categorias em Tempo Real
Não quer procurar manualmente pelas seções? Utilize a Barra de Busca no topo da tela:
- Digite o nome de um produto (ex.: "Leite", "Picanha", "Detergente"), de uma subcategoria ou de um departamento.
- O sistema filtra a tela instantaneamente enquanto você digita e expande automaticamente as seções onde o produto foi encontrado.
- Caso o termo digitado não exista no catálogo, o aplicativo exibirá um aviso informando que nenhum resultado foi encontrado.

3. Adicionar Itens à Lista de Compras
- Ao encontrar o produto desejado, toque no botão redondo `+` ao lado do nome do item.
- O botão mudará imediatamente para um ícone de confirmação (`✓`) na cor verde, e uma notificação rápida aparecerá no canto da tela confirmando a adição.
- Caso toque novamente no mesmo produto, o sistema aumentará a quantidade daquele item na sua lista.

4. Gerenciar "Minha Lista"
Para ver e editar os itens selecionados, toque no botão “Lista” (ícone de carrinho no topo da tela, que exibe um contador vermelho com o total de itens):
- Uma gaveta lateral será aberta exibindo todos os produtos escolhidos e suas respectivas categorias.
- Aumentar ou diminuir quantidade: Use os botões `+` e `-` ao lado de cada item. Se diminuir a quantidade abaixo de 1, o item é removido automaticamente.
- Remover um item específico: Toque no ícone de lixeira ao lado do produto.
- Limpar toda a lista: Toque no botão "Limpar lista" no rodapé da gaveta e confirme na janela de diálogo para apagar todos os itens de uma vez.
- Salvamento Automático: Sua lista fica salva automaticamente no seu aparelho. Mesmo que você feche a aba ou recarregue a página, seus itens continuarão lá quando voltar.

5. Comparar Preços
- No rodapé da sua lista de compras, toque no botão "Comparar preços".
Nota: Na versão atual do protótipo, este botão valida se há itens na lista e exibe um aviso indicando que o módulo de comparação colaborativa será aberto na próxima etapa de integração com o servidor.

⚙️ Funcionalidades do Sistema

✅ Funcionalidades Já Implantadas
- Interface Responsiva: Layout adaptável a smartphones, tablets e desktops, com paleta visual pensada para o contexto de supermercado.
- Catálogo Estruturado em 3 Níveis: 15 departamentos, 92 subcategorias e mais de 550 produtos pré-cadastrados.
- Busca Inteligente com Auto-expansão: Filtro em tempo real por nome de departamento, subcategoria ou produto.
- Gestão Completa da Lista de Compras: Adição, incremento/decremento de quantidades, exclusão individual e limpeza total.
- Persistência Local de Dados: Uso de localStorage para manter a lista salva no navegador do usuário sem necessidade de login inicial.
