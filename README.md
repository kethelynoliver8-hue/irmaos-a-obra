# Irmãos à Obra — base do site

Base one-page pronta para GitHub Pages. Nesta etapa existem apenas: cabeçalho, banner principal e botão flutuante de WhatsApp. Os links Serviços, Orçamento, Certificações e Regiões já estão preparados para as próximas seções, mas ainda não têm seções correspondentes.

## Publicar no GitHub Pages
1. Crie um repositório e envie **todo o conteúdo desta pasta** para a raiz do repositório.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch principal e a pasta **/(root)**, depois salve.
5. Aguarde o GitHub publicar o endereço do site.

## Arquivos principais
- `index.html`: estrutura e SEO.
- `styles.css`: todo o visual e responsividade.
- `script.js`: objeto `CONFIG`, contatos, menu mobile e scroll-spy.
- `assets/images/banner-irmaos.webp`: imagem principal do banner.
- `assets/images/selo-garantia.webp`: medalhão da garantia.
- `assets/logo/logo-irmaos.webp`: logo transparente.
- `assets/icons/`: favicon e ícones SVG.

## Trocar telefones e mensagens
Edite somente o objeto `CONFIG` no começo de `script.js`. Os links marcados com `data-contato` são atualizados automaticamente.

## Trocar imagens
Mantenha os mesmos nomes/caminhos ou atualize as referências no `index.html`. Os caminhos são relativos e usam letras minúsculas para compatibilidade com GitHub Pages.

## Próximas seções
Quando Serviços, Orçamento, Certificações e Regiões forem criadas, use respectivamente os IDs `servicos`, `orcamento`, `certificacoes` e `regioes`. O scroll-spy já ignora com segurança destinos que ainda não existem.

## Revisão do banner — animações e encaixe na primeira tela
- Títulos e botões usam Montserrat; corpo permanece Inter.
- Banner desktop usa `100svh - 90px`, com compactação extra para telas de até 700px de altura.
- Subtítulo foi reorganizado com o selo entre as duas partes solicitadas.
- WhatsApp flutuante e ícones foram normalizados em proporção 1:1.
- Efeitos: zoom lento, parallax/luz no mouse, fagulhas leves, faísca em “elétrica.”, botões magnéticos/brilho e desenho dos ícones de valores.
- `prefers-reduced-motion` desliga os efeitos animados.

## V3 — banner alinhado ao mockup
- Removido integralmente o efeito de faísca da palavra “elétrica.”; o texto permanece dourado sólido.
- Foto reposicionada, símbolo dourado translúcido incluído atrás dos irmãos e listras superiores refeitas.
- Subtítulo voltou a ser um único parágrafo acima do medalhão; medalhão ampliado e centralizado no bloco de texto.
- Botões do hero padronizados em 290 × 64 px no desktop e 100% × 56 px no celular.
- WhatsApp unificado em `assets/icons/whatsapp.svg`, com proporção 1:1 em todos os usos.
- Faixa de valores refeita em linha com divisórias verticais no desktop e grade 2 colunas no celular.

## V4 — ajustes definitivos do banner
- Removidas integralmente as listras douradas e o símbolo translúcido sobre a foto.
- H1 fixado em 3 linhas no desktop e subtítulo em 2 linhas; bloco alinhado à mesma borda do container do cabeçalho.
- Medalhão alinhado à esquerda no desktop e centralizado no celular.
- Ícones de WhatsApp/telefone unificados em sprite SVG inline; orçamento usa telefone no cabeçalho/banner e WhatsApp permanece nos contatos WhatsApp/mobile.

## V9 — seção Serviços
- Nova seção `#servicos` logo abaixo do banner, com cabeçalho, grade bento de 7 serviços e faixa final de contato.
- Cenas: `assets/images/servicos/servico-01.webp` até `servico-07.webp`. Para trocar uma cena, substitua o PNG mantendo o mesmo nome/caminho.
- Títulos, descrições, listas, cenas e textos alternativos ficam no array `SERVICOS` em `script.js`.
- O modal de cada serviço usa a mensagem: `Olá! Vim pelo site dos Irmãos à Obra e quero um orçamento de [nome do serviço].`, sempre com o número central do `CONFIG`.
- O item “Serviços” do menu já aponta para `#servicos` e entra no scroll-spy existente.


## V10 — Certificações
- Nova seção `#certificacoes` inserida imediatamente após Serviços.
- Personagem: `assets/images/personagem-certificacoes.webp`.
- Os oito itens e textos ficam no HTML e em `CONFIG.certificacoes` no `script.js`.
- O painel interativo abre, troca de linha conforme o breakpoint e fecha por clique repetido ou Esc.
- A faixa final reutiliza o padrão visual e as mensagens de contato da seção Serviços.


## Galeria
Nova seção #galeria após Certificações, com quatro WebP, lightbox acessível e faixa responsiva. Não há item de menu para a Galeria.


## V18 — ajustes pontuais
- Regiões e Dúvidas mantêm o mesmo padding vertical padrão da Galeria.
- O item Orçamento dos menus desktop e mobile abre o WhatsApp com a mensagem de orçamento e não participa do scroll-spy.


## Desempenho
- Banner desktop: WebP, até 1920 px de largura e meta de até 220 KB. A fonte original tem 1672 px e não foi ampliada para evitar perda visual.
- Banner mobile: WebP, 800 px de largura, mesma proporção e enquadramento por CSS, meta de até 90 KB.
- Serviços: WebP; cards comuns até 640 px / 90 KB e card principal até 900 px / 140 KB.
- Selo: WebP 300 px / 40 KB. Logo: WebP 224 px / 25 KB.
- Galeria: WebP até 800 px / 120 KB.
- Primeira tela (banner + logo + selo): meta total de até 350 KB.
- O mapa é criado sob demanda quando Regiões se aproxima da viewport.
- Efeitos do hero iniciam após `load` em período ocioso e pausam fora da viewport. Aparelhos com poucos recursos usam `.modo-leve`.
