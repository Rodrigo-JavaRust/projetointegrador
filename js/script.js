/* ============================================================
   S-MART — Lógica principal
   - Renderiza seções, subcategorias e produtos (3 níveis)
   - Acordeão inline aninhado (expandir/colapsar)
   - Lista de compras com persistência em localStorage
   - Busca em tempo real (seção, subcategoria e produto)
   - Offcanvas (gaveta lateral) para a lista
   ============================================================ */

'use strict';

/* ============================================================
   1. DADOS — Seções › Subcategorias › Produtos
   ============================================================ */
const SECTIONS = [
    {
        id: 'acougue',
        name: 'Açougue',
        icon: 'bi-egg-fried',
        subsections: [
            { name: 'Carnes bovinas', products: ['Picanha', 'Alcatra', 'Patinho', 'Coxão mole', 'Coxão duro', 'Acém', 'Costela bovina', 'Músculo', 'Filé mignon', 'Maminha', 'Fraldinha', 'Carne moída'] },
            { name: 'Carnes suínas', products: ['Lombo suíno', 'Costela suína', 'Pernil', 'Bisteca suína', 'Panceta', 'Lombo em cubos', 'Copa lombo', 'Filé suíno'] },
            { name: 'Aves', products: ['Peito de frango', 'Coxa e sobrecoxa', 'Asa de frango', 'Frango inteiro', 'Filé de peito', 'Coração de frango', 'Peito de peru', 'Sassami'] },
            { name: 'Linguiças e embutidos', products: ['Linguiça toscana', 'Linguiça calabresa', 'Salsicha', 'Mortadela', 'Presunto', 'Bacon', 'Salame', 'Apresuntado'] },
            { name: 'Peixes', products: ['Filé de tilápia', 'Salmão', 'Sardinha fresca', 'Merluza', 'Bacalhau', 'Camarão', 'Polvo', 'Pescada'] },
            { name: 'Carnes para churrasco', products: ['Espetinho misto', 'Linguiça para churrasco', 'Cupim', 'Maminha temperada', 'Coração temperado', 'Asinha temperada', 'Picanha em peça'] }
        ]
    },
    {
        id: 'padaria',
        name: 'Padaria',
        icon: 'bi-cake2',
        subsections: [
            { name: 'Pães', products: ['Pão francês', 'Pão de forma', 'Pão integral', 'Pão de hambúrguer', 'Pão de hot dog', 'Baguete', 'Pão sírio', 'Pão de leite', 'Ciabatta'] },
            { name: 'Bolos e tortas', products: ['Bolo de chocolate', 'Bolo de cenoura', 'Bolo de fubá', 'Torta de limão', 'Torta holandesa', 'Rocambole', 'Bolo de laranja'] },
            { name: 'Biscoitos', products: ['Biscoito amanteigado', 'Sequilhos', 'Biscoito de polvilho', 'Rosquinha', 'Cookie'] },
            { name: 'Salgados', products: ['Coxinha', 'Pão de queijo', 'Esfiha', 'Empada', 'Enroladinho de salsicha', 'Quibe', 'Pastel assado'] },
            { name: 'Doces', products: ['Sonho', 'Brigadeiro', 'Pudim', 'Mousse', 'Bomba de chocolate', 'Carolina'] },
            { name: 'Frios fatiados', products: ['Presunto fatiado', 'Mussarela fatiada', 'Peito de peru fatiado', 'Salame fatiado', 'Mortadela fatiada', 'Queijo prato fatiado'] }
        ]
    },
    {
        id: 'hortifruti',
        name: 'Hortifruti',
        icon: 'bi-flower1',
        subsections: [
            { name: 'Frutas', products: ['Maçã', 'Banana', 'Laranja', 'Mamão', 'Manga', 'Uva', 'Melancia', 'Abacaxi', 'Morango', 'Limão', 'Pera', 'Maracujá', 'Abacate'] },
            { name: 'Verduras', products: ['Alface', 'Rúcula', 'Couve', 'Espinafre', 'Agrião', 'Acelga', 'Repolho', 'Brócolis'] },
            { name: 'Legumes', products: ['Tomate', 'Cebola', 'Batata', 'Cenoura', 'Abobrinha', 'Pimentão', 'Pepino', 'Chuchu', 'Beterraba', 'Mandioca', 'Batata-doce'] },
            { name: 'Temperos frescos', products: ['Salsinha', 'Cebolinha', 'Coentro', 'Manjericão', 'Alho', 'Gengibre', 'Hortelã', 'Alecrim'] },
            { name: 'Ovos', products: ['Ovos brancos', 'Ovos vermelhos', 'Ovos de codorna', 'Ovos caipira'] },
            { name: 'Frutas secas e oleaginosas', products: ['Castanha de caju', 'Castanha-do-pará', 'Nozes', 'Amêndoas', 'Uva-passa', 'Damasco seco', 'Tâmara'] }
        ]
    },
    {
        id: 'bebidas',
        name: 'Bebidas',
        icon: 'bi-cup-straw',
        subsections: [
            { name: 'Refrigerantes', products: ['Refrigerante de cola', 'Guaraná', 'Refrigerante de laranja', 'Refrigerante de limão', 'Refrigerante de uva', 'Água tônica', 'Refrigerante diet'] },
            { name: 'Sucos', products: ['Suco de laranja', 'Suco de uva integral', 'Néctar de pêssego', 'Suco em pó', 'Suco de caju', 'Suco detox', 'Suco de maracujá'] },
            { name: 'Águas', products: ['Água mineral sem gás', 'Água mineral com gás', 'Água de coco', 'Água saborizada', 'Galão de água 20L'] },
            { name: 'Cervejas', products: ['Cerveja pilsen', 'Cerveja puro malte', 'Cerveja IPA', 'Cerveja sem álcool', 'Cerveja lata', 'Long neck'] },
            { name: 'Vinhos', products: ['Vinho tinto seco', 'Vinho branco', 'Vinho rosé', 'Espumante', 'Vinho suave', 'Vinho do porto'] },
            { name: 'Energéticos e isotônicos', products: ['Energético tradicional', 'Energético sem açúcar', 'Energético tropical', 'Isotônico', 'Repositor hidroeletrolítico'] },
            { name: 'Destilados', products: ['Cachaça', 'Vodca', 'Whisky', 'Gin', 'Rum', 'Tequila', 'Licor'] }
        ]
    },
    {
        id: 'laticinios',
        name: 'Laticínios',
        icon: 'bi-droplet-half',
        subsections: [
            { name: 'Leite', products: ['Leite integral', 'Leite desnatado', 'Leite semidesnatado', 'Leite sem lactose', 'Leite em pó', 'Leite fermentado'] },
            { name: 'Queijos', products: ['Queijo mussarela', 'Queijo prato', 'Queijo minas', 'Queijo coalho', 'Parmesão ralado', 'Queijo cottage', 'Cream cheese', 'Queijo provolone'] },
            { name: 'Iogurtes', products: ['Iogurte natural', 'Iogurte grego', 'Iogurte de morango', 'Iogurte desnatado', 'Bebida láctea', 'Iogurte infantil'] },
            { name: 'Manteiga e margarina', products: ['Manteiga com sal', 'Manteiga sem sal', 'Margarina cremosa', 'Margarina light', 'Creme vegetal'] },
            { name: 'Requeijão', products: ['Requeijão cremoso', 'Requeijão light', 'Requeijão zero lactose'] },
            { name: 'Cremes e condensados', products: ['Leite condensado', 'Creme de leite', 'Leite condensado light', 'Chantilly', 'Doce de leite em pote'] },
            { name: 'Sobremesas lácteas', products: ['Pudim pronto', 'Petit suisse', 'Sobremesa de chocolate', 'Manjar', 'Iogurte com cereais'] }
        ]
    },
    {
        id: 'mercearia',
        name: 'Mercearia',
        icon: 'bi-basket3',
        subsections: [
            { name: 'Arroz', products: ['Arroz branco', 'Arroz integral', 'Arroz parboilizado', 'Arroz arbóreo', 'Arroz japonês', 'Arroz sete grãos'] },
            { name: 'Feijão', products: ['Feijão carioca', 'Feijão preto', 'Feijão branco', 'Feijão fradinho', 'Feijão jalo', 'Lentilha', 'Grão-de-bico'] },
            { name: 'Massas', products: ['Espaguete', 'Macarrão parafuso', 'Penne', 'Macarrão instantâneo', 'Massa de lasanha', 'Nhoque', 'Massa de pastel'] },
            { name: 'Óleos e vinagres', products: ['Óleo de soja', 'Óleo de girassol', 'Azeite de oliva', 'Óleo de milho', 'Óleo de canola', 'Vinagre de álcool', 'Vinagre de maçã'] },
            { name: 'Açúcar e sal', products: ['Açúcar refinado', 'Açúcar cristal', 'Açúcar mascavo', 'Adoçante', 'Sal refinado', 'Sal grosso'] },
            { name: 'Café e chás', products: ['Café torrado e moído', 'Café em cápsula', 'Café solúvel', 'Chá preto', 'Chá de camomila', 'Chá verde', 'Chá mate'] },
            { name: 'Enlatados', products: ['Milho em conserva', 'Ervilha em conserva', 'Seleta de legumes', 'Atum em lata', 'Sardinha em lata', 'Molho de tomate', 'Extrato de tomate', 'Palmito'] },
            { name: 'Farinhas', products: ['Farinha de trigo', 'Farinha de mandioca', 'Farinha de rosca', 'Fubá', 'Amido de milho', 'Farinha integral', 'Farinha de aveia'] },
            { name: 'Molhos e condimentos', products: ['Ketchup', 'Maionese', 'Mostarda', 'Molho shoyu', 'Molho inglês', 'Pimenta', 'Vinagrete pronto', 'Molho barbecue'] },
            { name: 'Grãos e cereais', products: ['Aveia em flocos', 'Granola', 'Quinoa', 'Linhaça', 'Chia', 'Cuscuz', 'Milho de pipoca'] }
        ]
    },
    {
        id: 'limpeza',
        name: 'Limpeza',
        icon: 'bi-bucket',
        subsections: [
            { name: 'Detergentes', products: ['Detergente neutro', 'Detergente clear', 'Detergente limão', 'Detergente em gel', 'Lava-louças máquina'] },
            { name: 'Sabão e lavagem', products: ['Sabão em pó', 'Sabão líquido', 'Sabão em barra', 'Cápsulas de lavagem', 'Tira-manchas'] },
            { name: 'Amaciantes', products: ['Amaciante concentrado', 'Amaciante comum', 'Amaciante perfumado', 'Amaciante para bebê'] },
            { name: 'Desinfetantes', products: ['Desinfetante pinho', 'Desinfetante lavanda', 'Água sanitária', 'Cloro', 'Álcool líquido', 'Álcool em gel'] },
            { name: 'Esponjas e panos', products: ['Esponja de aço', 'Esponja multiuso', 'Pano de chão', 'Pano multiuso', 'Flanela', 'Luva de limpeza'] },
            { name: 'Limpadores', products: ['Limpador multiuso', 'Limpa-vidros', 'Limpador de piso', 'Sapólio', 'Desengordurante', 'Limpa-alumínio'] },
            { name: 'Descartáveis de limpeza', products: ['Saco de lixo', 'Papel toalha', 'Guardanapo', 'Filme plástico', 'Papel alumínio', 'Saco para freezer'] }
        ]
    },
    {
        id: 'higiene',
        name: 'Higiene Pessoal',
        icon: 'bi-droplet',
        subsections: [
            { name: 'Sabonetes', products: ['Sabonete em barra', 'Sabonete líquido', 'Sabonete íntimo', 'Sabonete esfoliante', 'Sabonete infantil'] },
            { name: 'Cabelos', products: ['Shampoo anticaspa', 'Shampoo hidratante', 'Condicionador', 'Creme para pentear', 'Máscara capilar', 'Shampoo infantil'] },
            { name: 'Higiene bucal', products: ['Creme dental', 'Creme dental branqueador', 'Enxaguante bucal', 'Fio dental', 'Escova de dente'] },
            { name: 'Papéis', products: ['Papel higiênico folha dupla', 'Papel higiênico folha simples', 'Papel higiênico neutro', 'Lenço de papel'] },
            { name: 'Desodorantes', products: ['Desodorante aerosol', 'Desodorante roll-on', 'Desodorante em creme', 'Antitranspirante'] },
            { name: 'Cuidados com a pele', products: ['Hidratante corporal', 'Creme para mãos', 'Protetor labial', 'Loção pós-banho', 'Óleo corporal'] },
            { name: 'Higiene feminina', products: ['Absorvente', 'Absorvente noturno', 'Protetor diário', 'Coletor menstrual', 'Lenço íntimo'] },
            { name: 'Barbear', products: ['Aparelho de barbear', 'Espuma de barbear', 'Gel de barbear', 'Lâmina de barbear', 'Pós-barba'] }
        ]
    },
    {
        id: 'congelados',
        name: 'Congelados',
        icon: 'bi-snow2',
        subsections: [
            { name: 'Pizzas', products: ['Pizza de mussarela', 'Pizza de calabresa', 'Pizza portuguesa', 'Pizza quatro queijos', 'Mini pizza'] },
            { name: 'Hambúrgueres', products: ['Hambúrguer bovino', 'Hambúrguer de frango', 'Hambúrguer vegetal', 'Kafta congelada'] },
            { name: 'Sorvetes', products: ['Sorvete de creme', 'Sorvete de chocolate', 'Sorvete de morango', 'Picolé', 'Pote 2 litros', 'Açaí'] },
            { name: 'Vegetais congelados', products: ['Brócolis congelado', 'Ervilha congelada', 'Batata pré-frita', 'Seleta congelada', 'Mandioca congelada', 'Polpa de fruta'] },
            { name: 'Pratos prontos', products: ['Lasanha congelada', 'Strogonoff congelado', 'Escondidinho', 'Tortinha', 'Pão de alho'] },
            { name: 'Empanados e salgados', products: ['Nuggets', 'Empanado de frango', 'Pão de queijo congelado', 'Coxinha congelada', 'Quibe congelado', 'Esfiha congelada'] }
        ]
    },
    {
        id: 'pet',
        name: 'Pet Shop',
        icon: 'bi-bag-heart',
        subsections: [
            { name: 'Ração para cães', products: ['Ração adulto cães', 'Ração filhote cães', 'Ração premium', 'Ração úmida sachê', 'Ração raças pequenas'] },
            { name: 'Ração para gatos', products: ['Ração adulto gatos', 'Ração filhote gatos', 'Ração castrados', 'Sachê para gatos', 'Ração urinária'] },
            { name: 'Petiscos', products: ['Petisco em osso', 'Bifinho', 'Petisco dental', 'Catnip', 'Sachê petisco'] },
            { name: 'Areia higiênica', products: ['Areia sílica', 'Areia grão fino', 'Areia perfumada', 'Tapete higiênico'] },
            { name: 'Acessórios', products: ['Coleira', 'Comedouro', 'Brinquedo pet', 'Guia', 'Cama pet'] },
            { name: 'Higiene pet', products: ['Shampoo pet', 'Colônia pet', 'Escova pet', 'Cortador de unha', 'Eliminador de odor'] }
        ]
    },
    {
        id: 'matinais',
        name: 'Matinais e Cereais',
        icon: 'bi-cup-hot',
        subsections: [
            { name: 'Cereais matinais', products: ['Sucrilhos', 'Cereal integral', 'Cereal de chocolate', 'Cereal de mel', 'Flocos de milho'] },
            { name: 'Granola e aveia', products: ['Granola tradicional', 'Granola light', 'Aveia em flocos', 'Mingau de aveia', 'Cereal em barra'] },
            { name: 'Achocolatados', products: ['Achocolatado em pó', 'Achocolatado light', 'Cappuccino', 'Chocolate quente', 'Mistura para vitamina'] },
            { name: 'Geleias e cremes', products: ['Geleia de morango', 'Geleia de uva', 'Creme de avelã', 'Pasta de amendoim', 'Mel', 'Doce de leite'] },
            { name: 'Pães de forma e torradas', products: ['Torrada tradicional', 'Torrada integral', 'Bisnaguinha', 'Pão de forma integral', 'Rosca doce'] }
        ]
    },
    {
        id: 'snacks',
        name: 'Doces e Snacks',
        icon: 'bi-cookie',
        subsections: [
            { name: 'Chocolates', products: ['Barra ao leite', 'Chocolate amargo', 'Bombom', 'Chocolate branco', 'Caixa de bombons', 'Wafer'] },
            { name: 'Balas e gomas', products: ['Bala mastigável', 'Goma de jujuba', 'Chiclete', 'Pirulito', 'Bala de hortelã', 'Marshmallow'] },
            { name: 'Salgadinhos', products: ['Batata chips', 'Salgadinho de milho', 'Amendoim japonês', 'Salgadinho de queijo', 'Tortilha', 'Batata palha'] },
            { name: 'Castanhas e amendoim', products: ['Amendoim torrado', 'Amendoim salgado', 'Mix de castanhas', 'Pistache', 'Amendoim doce'] },
            { name: 'Pipocas', products: ['Pipoca de micro-ondas', 'Pipoca pronta', 'Milho de pipoca', 'Pipoca doce'] }
        ]
    },
    {
        id: 'bebe',
        name: 'Mundo Bebê',
        icon: 'bi-balloon-heart',
        subsections: [
            { name: 'Fraldas', products: ['Fralda P', 'Fralda M', 'Fralda G', 'Fralda XG', 'Fralda noturna'] },
            { name: 'Lenços e higiene', products: ['Lenço umedecido', 'Algodão', 'Cotonete', 'Sabonete infantil', 'Shampoo infantil', 'Pomada para assadura'] },
            { name: 'Alimentação infantil', products: ['Papinha de frutas', 'Papinha salgada', 'Fórmula infantil', 'Cereal infantil', 'Suco infantil', 'Mingau'] },
            { name: 'Acessórios', products: ['Mamadeira', 'Chupeta', 'Bico de mamadeira', 'Babador', 'Prato infantil'] }
        ]
    },
    {
        id: 'bazar',
        name: 'Bazar e Utilidades',
        icon: 'bi-lightbulb',
        subsections: [
            { name: 'Pilhas e energia', products: ['Pilha AA', 'Pilha AAA', 'Pilha 9V', 'Bateria', 'Carregador de pilhas'] },
            { name: 'Iluminação', products: ['Lâmpada LED', 'Lâmpada fluorescente', 'Vela', 'Lanterna', 'Fita LED'] },
            { name: 'Utensílios de cozinha', products: ['Forma de gelo', 'Pano de prato', 'Filtro de café', 'Palito de dente', 'Abridor de lata'] },
            { name: 'Papelaria', products: ['Caneta', 'Lápis', 'Caderno', 'Fita adesiva', 'Cola'] },
            { name: 'Itens para festa', products: ['Copo descartável', 'Prato descartável', 'Talher descartável', 'Toalha de mesa', 'Vela de aniversário'] }
        ]
    },
    {
        id: 'saude',
        name: 'Saúde e Bem-estar',
        icon: 'bi-heart-pulse',
        subsections: [
            { name: 'Vitaminas e suplementos', products: ['Vitamina C', 'Multivitamínico', 'Vitamina D', 'Whey protein', 'Colágeno', 'Magnésio'] },
            { name: 'Primeiros socorros', products: ['Curativo adesivo', 'Gaze', 'Esparadrapo', 'Algodão', 'Água oxigenada', 'Soro fisiológico'] },
            { name: 'Proteção solar e repelente', products: ['Protetor solar FPS 30', 'Protetor solar FPS 50', 'Repelente', 'Pós-sol', 'Protetor labial FPS'] },
            { name: 'Cuidados diversos', products: ['Termômetro', 'Compressa térmica', 'Máscara descartável', 'Álcool 70%', 'Hidratante para mãos'] }
        ]
    }
];

const STORAGE_KEY = 'smart_shopping_list_v2';

/* ============================================================
   2. PERSISTÊNCIA — localStorage
   ============================================================ */
const Store = {
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.error('S-MART: erro ao carregar lista', err);
            return [];
        }
    },
    save(list) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (err) {
            console.error('S-MART: erro ao salvar lista', err);
        }
    }
};

/* ============================================================
   3. ESTADO DO APP
   ============================================================ */
let cart = Store.load();   // lista de compras carregada
let currentQuery = '';     // termo de busca atual

/* ============================================================
   4. FUNÇÕES UTILITÁRIAS
   ============================================================ */
function makeId(sectionId, subName, product) {
    return `${sectionId}__${subName}__${product}`
        .toLowerCase()
        .replace(/\s+/g, '-');
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

function isInCart(sectionId, subName, product) {
    return cart.some(item => item.id === makeId(sectionId, subName, product));
}

/* ============================================================
   5. AÇÕES DA LISTA DE COMPRAS
   ============================================================ */
function addToCart(section, subName, product) {
    const id = makeId(section.id, subName, product);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id,
            sectionId: section.id,
            sectionName: section.name,
            subName,
            name: product,
            quantity: 1,
            addedAt: Date.now()
        });
    }

    Store.save(cart);
    renderCart();
    updateCartBadges();
    showToast(`"${product}" adicionado à lista`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    Store.save(cart);
    renderCart();
    updateCartBadges();
    refreshAddButtons();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity < 1) {
        return removeFromCart(id);
    }
    Store.save(cart);
    renderCart();
    updateCartBadges();
}

function clearCart() {
    if (cart.length === 0) return;
    if (!confirm('Tem certeza que deseja limpar toda a sua lista?')) return;

    cart = [];
    Store.save(cart);
    renderCart();
    updateCartBadges();
    refreshAddButtons();
    showToast('Lista limpa');
}

/* ============================================================
   6. RENDERIZAÇÃO DAS SEÇÕES (3 níveis)
   ============================================================ */
function renderSections() {
    const list = document.getElementById('sectionsList');

    list.innerHTML = SECTIONS.map(section => {
        const productCount = section.subsections.reduce((n, s) => n + s.products.length, 0);

        return `
        <article class="section-item" data-section="${section.id}">
            <button class="section-header" type="button"
                    aria-expanded="false" aria-controls="sub-${section.id}">
                <span class="section-icon" aria-hidden="true">
                    <i class="bi ${section.icon}"></i>
                </span>
                <span class="section-info">
                    <span class="section-name">${escapeHtml(section.name)}</span>
                    <span class="section-meta">${section.subsections.length} subcategorias · ${productCount} produtos</span>
                </span>
                <i class="bi bi-chevron-down section-chevron" aria-hidden="true"></i>
            </button>

            <div class="subsections" id="sub-${section.id}" role="region">
                <div class="subsections-inner">
                    ${section.subsections.map((sub, i) => {
                        const subId = `${section.id}-sub-${i}`;
                        return `
                        <div class="subsection-group" data-sub-index="${i}">
                            <button class="subsection-header" type="button"
                                    aria-expanded="false" aria-controls="prod-${subId}">
                                <span class="subsection-name">${escapeHtml(sub.name)}</span>
                                <span class="subsection-count">${sub.products.length}</span>
                                <i class="bi bi-chevron-down subsection-chevron" aria-hidden="true"></i>
                            </button>
                            <div class="products" id="prod-${subId}" role="region">
                                <div class="products-inner">
                                    ${sub.products.map(product => {
                                        const inCart = isInCart(section.id, sub.name, product);
                                        return `
                                        <div class="product-item">
                                            <span class="product-name">${escapeHtml(product)}</span>
                                            <button class="btn-add ${inCart ? 'added' : ''}" type="button"
                                                    data-section-id="${section.id}"
                                                    data-sub="${escapeHtml(sub.name)}"
                                                    data-product="${escapeHtml(product)}"
                                                    aria-label="Adicionar ${escapeHtml(product)} à lista">
                                                <i class="bi ${inCart ? 'bi-check-lg' : 'bi-plus-lg'}"></i>
                                            </button>
                                        </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </article>
        `;
    }).join('');

    // Listener: cabeçalho da seção (expandir/colapsar nível 1)
    list.querySelectorAll('.section-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.section-item');
            const expanded = item.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', String(expanded));
        });
    });

    // Listener: cabeçalho da subcategoria (expandir/colapsar nível 2)
    list.querySelectorAll('.subsection-header').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            const group = btn.closest('.subsection-group');
            const expanded = group.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', String(expanded));
        });
    });

    // Listener: botão de adicionar produto (nível 3)
    list.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            const sectionId = btn.dataset.sectionId;
            const subName = btn.dataset.sub;
            const product = btn.dataset.product;
            const section = SECTIONS.find(s => s.id === sectionId);
            if (!section) return;

            addToCart(section, subName, product);

            // Feedback visual imediato
            btn.classList.add('added', 'popping');
            btn.querySelector('i').className = 'bi bi-check-lg';
            btn.setAttribute('aria-label', `${product} já está na lista`);
            setTimeout(() => btn.classList.remove('popping'), 350);
        });
    });
}

/* Atualiza apenas o estado visual dos botões de "+ adicionar"
   (sem recriar o DOM, para não fechar acordeão aberto). */
function refreshAddButtons() {
    document.querySelectorAll('.btn-add').forEach(btn => {
        const inCart = isInCart(btn.dataset.sectionId, btn.dataset.sub, btn.dataset.product);
        btn.classList.toggle('added', inCart);
        btn.querySelector('i').className = inCart ? 'bi bi-check-lg' : 'bi bi-plus-lg';
    });
}

/* ============================================================
   7. RENDERIZAÇÃO DO CARRINHO (offcanvas)
   ============================================================ */
function renderCart() {
    const items = document.getElementById('cartItems');
    const empty = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    const pill = document.getElementById('cartCountPill');

    const total = cart.reduce((sum, i) => sum + i.quantity, 0);

    if (cart.length === 0) {
        items.innerHTML = '';
        empty.classList.remove('hidden');
        footer.classList.add('hidden');
        pill.classList.add('hidden');
        return;
    }

    empty.classList.add('hidden');
    footer.classList.remove('hidden');
    pill.classList.remove('hidden');
    pill.textContent = total;

    items.innerHTML = cart.map(item => {
        const cat = item.subName
            ? `${escapeHtml(item.sectionName)} · ${escapeHtml(item.subName)}`
            : escapeHtml(item.sectionName);
        return `
        <div class="cart-item" data-id="${escapeHtml(item.id)}">
            <div class="cart-item-info">
                <p class="cart-item-name">${escapeHtml(item.name)}</p>
                <span class="cart-item-cat">${cat}</span>
            </div>
            <div class="qty-control" role="group" aria-label="Quantidade">
                <button class="qty-btn" type="button" data-action="dec" aria-label="Diminuir quantidade">
                    <i class="bi bi-dash"></i>
                </button>
                <span class="qty-value" aria-live="polite">${item.quantity}</span>
                <button class="qty-btn" type="button" data-action="inc" aria-label="Aumentar quantidade">
                    <i class="bi bi-plus"></i>
                </button>
            </div>
            <button class="btn-remove" type="button" data-action="rm" aria-label="Remover ${escapeHtml(item.name)}">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        `;
    }).join('');

    // Listeners dos botões dentro do carrinho
    items.querySelectorAll('.cart-item').forEach(row => {
        const id = row.dataset.id;
        row.querySelector('[data-action="inc"]').addEventListener('click', () => changeQty(id, +1));
        row.querySelector('[data-action="dec"]').addEventListener('click', () => changeQty(id, -1));
        row.querySelector('[data-action="rm"]').addEventListener('click', () => {
            removeFromCart(id);
            showToast('Item removido');
        });
    });
}

/* ============================================================
   8. BADGE — contador no ícone do carrinho
   ============================================================ */
function updateCartBadges() {
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);
    ['cartBadge', 'cartBadgeMobile'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = total;
        el.classList.toggle('hidden', total === 0);
        // Pequena animação ao mudar
        el.classList.add('bump');
        setTimeout(() => el.classList.remove('bump'), 250);
    });
}

/* ============================================================
   9. TOAST
   ============================================================ */
function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toastEl = document.createElement('div');
    toastEl.className = 'toast toast-smart';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'polite');
    toastEl.innerHTML = `
        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
        <span>${escapeHtml(message)}</span>
    `;
    container.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl, { delay: 1800 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

/* ============================================================
   10. BUSCA (seção, subcategoria e produto)
   ============================================================ */
function setupSearch() {
    const input = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    if (!input) return;

    input.addEventListener('input', (event) => {
        currentQuery = event.target.value.toLowerCase().trim();
        const q = currentQuery;
        let visibleSections = 0;

        document.querySelectorAll('.section-item').forEach(item => {
            const section = SECTIONS.find(s => s.id === item.dataset.section);
            if (!section) return;

            const matchSection = !!q && section.name.toLowerCase().includes(q);
            let sectionHasMatch = false;

            item.querySelectorAll('.subsection-group').forEach(group => {
                const idx = Number(group.dataset.subIndex);
                const sub = section.subsections[idx];
                if (!sub) return;

                const matchSub = sub.name.toLowerCase().includes(q);
                const matchProd = sub.products.some(p => p.toLowerCase().includes(q));
                const subMatches = matchSub || matchProd;

                // Mostra a subcategoria se: sem busca, a seção casa, ou a própria casa
                const showGroup = !q || matchSection || subMatches;
                group.style.display = showGroup ? '' : 'none';

                const subHeader = group.querySelector('.subsection-header');
                if (q && subMatches && !matchSection) {
                    sectionHasMatch = true;
                    group.classList.add('expanded');
                    subHeader?.setAttribute('aria-expanded', 'true');
                } else if (!q) {
                    group.classList.remove('expanded');
                    subHeader?.setAttribute('aria-expanded', 'false');
                }
            });

            const sectionVisible = !q || matchSection || sectionHasMatch;
            item.style.display = sectionVisible ? '' : 'none';
            if (sectionVisible) visibleSections++;

            const sectionHeader = item.querySelector('.section-header');
            if (q && (matchSection || sectionHasMatch)) {
                item.classList.add('expanded');
                sectionHeader?.setAttribute('aria-expanded', 'true');
            } else if (!q) {
                item.classList.remove('expanded');
                sectionHeader?.setAttribute('aria-expanded', 'false');
            }
        });

        noResults.classList.toggle('hidden', visibleSections > 0);
    });
}

/* ============================================================
   11. OFFCANVAS (gaveta da lista)
   ============================================================ */
function setupCart() {
    const offcanvasEl = document.getElementById('cartOffcanvas');
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

    document.getElementById('cartBtn')?.addEventListener('click', () => offcanvas.show());
    document.getElementById('cartBtnMobile')?.addEventListener('click', () => offcanvas.show());
    document.getElementById('clearBtn')?.addEventListener('click', clearCart);
    document.getElementById('compareBtn')?.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Adicione itens à lista primeiro');
            return;
        }
        // Próxima fase: ir para a tela de comparação de preços
        showToast('Comparação de preços em breve!');
    });
}

/* ============================================================
   12. INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderSections();
    renderCart();
    updateCartBadges();
    setupSearch();
    setupCart();

    const totalProdutos = SECTIONS.reduce(
        (n, s) => n + s.subsections.reduce((m, sub) => m + sub.products.length, 0), 0
    );
    console.log('%cS-MART iniciado ✓', 'color:#2D8B47;font-weight:700');
    console.log(`Catálogo: ${SECTIONS.length} seções · ${totalProdutos} produtos`);
    console.log(`Lista atual: ${cart.length} itens distintos`);
});
