'use strict';
document.documentElement.classList.add('js');

// === Configuração central de contatos ===
const CONFIG = {
  telefones: { principal: '5548991696661', secundario: '5548996865570' },
  textos: { principal: '(48) 99169-6661', secundario: '(48) 99686-5570' },
  mensagens: {
    principal: 'Olá! Vim pelo site dos Irmãos à Obra e quero atendimento.',
    orcamento: 'Olá! Vim pelo site dos Irmãos à Obra e quero fazer um orçamento.'
  },
  certificacoes: [
    {sigla:'NR 10',legenda:'Eletricidade',garante:'Equipe com treinamento de 40 horas da NR 10 e reciclagens periódicas, capacitada em medidas de controle de risco elétrico.'},
    {sigla:'NR 35',legenda:'Trabalho em altura',garante:'Equipe preparada para trabalhos acima de 2 metros de altura, com uso correto de equipamentos de proteção coletiva e individual antiqueda.'},
    {sigla:'NR 6',legenda:'EPI',garante:'Uso de equipamentos de proteção adequados ao trabalho elétrico: ferramentas isoladas, luvas dielétricas, capacetes classe B e calçados isolantes.'},
    {sigla:'NR 33',legenda:'Espaço confinado',garante:'Equipe credenciada para atuar em caixas de passagem subterrâneas, dutos e poços, com monitoramento de oxigênio e procedimentos de resgate.'},
    {sigla:'NR 18',legenda:'Construção civil',garante:'Equipe alinhada às regras de segurança de canteiros de obras, com disciplina e organização durante a execução dos serviços.'},
    {sigla:'NR 1',legenda:'Gestão de riscos',garante:'Treinamentos com conteúdo, carga horária e responsável técnico conforme a NR 1, o que dá validade à documentação da equipe.'},
    {sigla:'CREA/CFT',legenda:'ART e TRT',garante:'Projetos, laudos e execuções acompanhados de ART ou TRT, emitida por profissional habilitado e registrado no conselho de classe.'},
    {sigla:'ABNT',legenda:'Normas técnicas',garante:'Projetos e execuções seguindo as normas técnicas da ABNT, como a NBR 5410 (baixa tensão), a NBR 14039 (média tensão) e a NBR 5419 (proteção contra descargas atmosféricas).'}
  ],
  mapaUrl: 'https://www.google.com/maps?q=Florian%C3%B3polis%2C+SC%2C+Brasil&z=10&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Florian%C3%B3polis%2C+SC',
  regioes: ['Florianópolis','São José','Palhoça','Santo Amaro da Imperatriz','Biguaçu','Águas Mornas','São Pedro de Alcântara','Antônio Carlos','Governador Celso Ramos','Paulo Lopes','Tijucas','Rancho Queimado'],
  galeria: [
    {numero:'01',arquivo:'assets/images/galeria/galeria-01.webp',largura:800,altura:1067,alt:'Técnico com luvas ajustando componentes dentro de um quadro elétrico aberto, com aviso de manutenção na porta',posicao:'50% 50%'},
    {numero:'02',arquivo:'assets/images/galeria/galeria-02.webp',largura:800,altura:940,alt:'Técnico fazendo a manutenção de um ar-condicionado instalado na parede, com a tampa frontal aberta',posicao:'40% 55%'},
    {numero:'03',arquivo:'assets/images/galeria/galeria-03.webp',largura:700,altura:933,alt:'Técnico agachado fazendo a manutenção de uma peça de uma esteira industrial, com ferramentas dispostas no chão',posicao:'50% 50%'},
    {numero:'04',arquivo:'assets/images/galeria/galeria-04.webp',largura:800,altura:1067,alt:'Técnico com óculos de proteção e protetor auricular ao lado de um painel de comando em uma área industrial',posicao:'40% 40%'}
  ]
};
const whatsappUrl = mensagem => `https://wa.me/${CONFIG.telefones.principal}?text=${encodeURIComponent(mensagem)}`;
document.querySelectorAll('[data-contato]').forEach(link => {
  const tipo = link.dataset.contato;
  link.href = whatsappUrl(tipo === 'orcamento' ? CONFIG.mensagens.orcamento : CONFIG.mensagens.principal);
  link.target = '_blank'; link.rel = 'noopener noreferrer';
});

// === Menu mobile ===
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const aberto = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!aberto));
    toggle.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    mobileMenu.hidden = aberto;
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); mobileMenu.hidden = true;
  }));
}

// === Scroll-spy ===
const navLinks = [...document.querySelectorAll('[data-nav]')];
const observaveis = navLinks.map(link => ({ link, secao: document.querySelector(link.getAttribute('href')) })).filter(item => item.secao);
if ('IntersectionObserver' in window && observaveis.length) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (!entry.isIntersecting) return; navLinks.forEach(link => link.classList.remove('active')); observaveis.filter(item => item.secao === entry.target).forEach(item => item.link.classList.add('active')); });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0.05 });
  observaveis.forEach(item => spy.observe(item.secao));
}
const galeriaSpy=document.querySelector('#galeria');
if(galeriaSpy&&'IntersectionObserver'in window){const gio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)navLinks.forEach(link=>link.classList.remove('active'))}),{rootMargin:'-25% 0px -60% 0px',threshold:.05});gio.observe(galeriaSpy)}

const hero = document.querySelector('.hero');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// === Entrada curta; conteúdo continua visível se o JS não executar ===
if (!reduced) {
  const enters = [...document.querySelectorAll('[data-enter]')];
  enters.forEach(el => el.classList.add('enter-ready'));
  requestAnimationFrame(() => enters.forEach(el => el.classList.add('enter-in')));
  setTimeout(() => enters.forEach(el => el.classList.remove('enter-ready')), 390);
}

// === Desenho dos ícones de valores ===
const values = document.querySelector('[data-values]');
if (values && !reduced) {
  values.classList.add('draw-ready');
  const draw = () => values.classList.add('draw');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { draw(); io.disconnect(); } }), { threshold: .15 });
    io.observe(values);
  } else draw();
  setTimeout(() => values.classList.add('draw'), 450);
}

// === Efeitos do banner: iniciados após load/idle e pausados fora da tela ===
const modoLeve = reduced || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4) || Boolean(navigator.connection?.saveData);
if (modoLeve) document.documentElement.classList.add('modo-leve');

const iniciarEfeitosHero = () => {
  if (!hero || modoLeve) return;
  hero.classList.add('efeitos-prontos');
  let heroVisivel = true;
  const visObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => {
    heroVisivel = entry.isIntersecting;
    hero.classList.toggle('efeitos-pausados', !heroVisivel || document.hidden);
  }), { threshold: .01 }) : null;
  visObserver?.observe(hero);
  document.addEventListener('visibilitychange', () => hero.classList.toggle('efeitos-pausados', document.hidden || !heroVisivel), { passive: true });

  if (finePointer) {
    const wrap = hero.querySelector('.hero-photo-wrap');
    const glow = hero.querySelector('.hero-cursor-glow');
    let tx=0,ty=0,cx=0,cy=0,gx=-999,gy=-999,gxt=-999,gyt=-999,active=false,raf=0;
    const tick = () => {
      if (!heroVisivel || document.hidden) { raf=0; return; }
      cx += (tx-cx)*.09; cy += (ty-cy)*.09; gx += (gxt-gx)*.13; gy += (gyt-gy)*.13;
      wrap.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      glow.style.transform = `translate3d(${gx-210}px,${gy-210}px,0)`;
      if (active || Math.abs(tx-cx)>.1 || Math.abs(ty-cy)>.1) raf=requestAnimationFrame(tick); else raf=0;
    };
    hero.addEventListener('pointerenter', () => { active=true; glow.style.opacity='1'; if(!raf&&heroVisivel) raf=requestAnimationFrame(tick); }, { passive:true });
    hero.addEventListener('pointermove', e => {
      if (!heroVisivel) return;
      const r=hero.getBoundingClientRect(), nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
      tx=-nx*28; ty=-ny*20; gxt=e.clientX-r.left; gyt=e.clientY-r.top; if(!raf) raf=requestAnimationFrame(tick);
    }, { passive:true });
    hero.addEventListener('pointerleave', () => { active=false; tx=0;ty=0; glow.style.opacity='0'; if(!raf&&heroVisivel) raf=requestAnimationFrame(tick); }, { passive:true });
    hero.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r=btn.getBoundingClientRect(), dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2), dist=Math.hypot(dx,dy);
        if(dist<90) btn.style.transform=`translate3d(${dx/90*8}px,${dy/90*8-2}px,0)`;
      }, { passive:true });
      btn.addEventListener('pointerleave',()=>{btn.style.transform='';}, { passive:true });
    });
  }

  const canvas=hero.querySelector('.hero-sparks');
  if (canvas) {
    const ctx=canvas.getContext('2d'); let particles=[],raf=0,last=0,dpr=Math.min(devicePixelRatio||1,2);
    const count=()=>innerWidth<600?6:16;
    const make=(r,randomY=false)=>({x:r.width*(.56+Math.random()*.42),y:randomY?Math.random()*r.height:r.height+8,size:1+Math.random()*2,speed:.18+Math.random()*.38,drift:(Math.random()-.5)*.22,life:.35+Math.random()*.55,phase:Math.random()*6.28});
    const resize=()=>{const r=hero.getBoundingClientRect();canvas.width=Math.max(1,Math.floor(r.width*dpr));canvas.height=Math.max(1,Math.floor(r.height*dpr));canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:count()},()=>make(r,true));};
    const frame=t=>{if(!heroVisivel||document.hidden){raf=0;return;}const r=hero.getBoundingClientRect(),dt=Math.min(32,t-last||16);last=t;ctx.clearRect(0,0,r.width,r.height);particles.forEach((p,i)=>{p.y-=p.speed*dt;p.x+=Math.sin(t*.001+p.phase)*p.drift*dt;p.life-=.00018*dt;if(p.y<-10||p.life<=0)particles[i]=make(r);const a=Math.max(0,Math.min(.75,p.life));ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle=`rgba(${i%2?255:242},${i%2?201:179},${i%2?60:28},${a})`;ctx.shadowBlur=6;ctx.shadowColor='rgba(242,179,28,.55)';ctx.fill();});raf=requestAnimationFrame(frame);};
    const iniciarCanvas=()=>{if(!raf&&heroVisivel&&!document.hidden) raf=requestAnimationFrame(frame)};
    resize(); addEventListener('resize',()=>{resize();iniciarCanvas()},{passive:true});
    if ('IntersectionObserver' in window) new IntersectionObserver(entries=>entries.forEach(entry=>{heroVisivel=entry.isIntersecting;hero.classList.toggle('efeitos-pausados',!heroVisivel||document.hidden);if(heroVisivel)iniciarCanvas();else if(raf){cancelAnimationFrame(raf);raf=0}}),{threshold:.01}).observe(hero);
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0}else iniciarCanvas()},{passive:true});
    iniciarCanvas();
  }
};

addEventListener('load', () => {
  const agendar = window.requestIdleCallback || (cb => setTimeout(cb, 400));
  agendar(iniciarEfeitosHero);
}, { once:true, passive:true });

// === Serviços ===
const SERVICOS = [
  {numero:'01',titulo:'Engenharia e Manutenção Elétrica',descricao:'Manutenção preventiva e corretiva, quadros elétricos e disjuntores.',cena:'assets/images/servicos/servico-07.webp',largura:840,altura:840,alt:'Dois técnicos inspecionando e realizando medições em um quadro elétrico aberto',lista:['Inspeção de quadros elétricos','Reaperto de conexões','Balanceamento de fases','Testes de disjuntores']},
  {numero:'02',titulo:'Instalações e Infraestrutura',descricao:'Iluminação, geradores, no-breaks, SPDA e aterramento.',cena:'assets/images/servicos/servico-06.webp',largura:640,altura:640,alt:'Técnico instalando uma luminária de teto ao lado de uma escada e equipamentos de trabalho',lista:['Retrofit LED e manutenção de iluminação interna, externa, de fachada e de emergência','Manutenção preventiva de grupos geradores e no-breaks','Acompanhamento de testes de carga e substituição de consumíveis','Inspeção e medição de continuidade ôhmica de SPDA e aterramento','Laudo técnico de para-raios']},
  {numero:'03',titulo:'Manutenção Hidráulica e Saneamento',descricao:"Bombeamento, caça-vazamentos, caixas d'água e drenagem.",cena:'assets/images/servicos/servico-05.webp',largura:640,altura:640,alt:'Técnico ajustando uma válvula em uma tubulação metálica com uma chave',lista:['Manutenção e automação de bombas de recalque, esgoto, água pluvial e incêndio','Reparo e caça-vazamentos em prumadas e ramais',"Limpeza, desinfecção e impermeabilização de caixas d'água e cisternas",'Limpeza de calhas, rufos, caixas de gordura e caixas de passagem']},
  {numero:'04',titulo:'Civil, Alvenaria e Acabamentos',descricao:'Fachadas, pintura, impermeabilização e serralheria.',cena:'assets/images/servicos/servico-04.webp',largura:640,altura:640,alt:'Técnico aplicando pintura com rolo em uma parede',lista:['Lavagem técnica, reposição de pastilhas/revestimentos e pintura externa de fachadas','Pintura de áreas comuns, garagens e demarcação de vagas','Reparos em drywall ou gesso','Impermeabilização de lajes, subsolos e telhados','Manutenção de portões, esquadrias de alumínio, portas de vidro e molas de piso']},
  {numero:'05',titulo:'Climatização, Refrigeração e Ventilação',descricao:'PMOC, ar-condicionado, VRF, chillers e exaustão.',cena:'assets/images/servicos/servico-03.webp',largura:640,altura:640,alt:'Técnico realizando a instalação ou manutenção de uma unidade interna de ar-condicionado',lista:['Elaboração e execução de PMOC','Limpeza de filtros e higienização química de evaporadoras e condensadoras','Carga de gás em splits e cassetes','Manutenção de sistemas VRF e chillers','Exaustão mecânica de subsolos e cozinhas']},
  {numero:'06',titulo:'Prevenção e Combate a Incêndio',descricao:'Extintores, hidrantes, centrais de incêndio e sinalização.',cena:'assets/images/servicos/servico-02.webp',largura:640,altura:640,alt:'Técnico apontando para um detector de fumaça enquanto segura um extintor de incêndio',lista:['Extintores e teste hidrostático','Abrigos de hidrantes e mangueiras','Centrais de incêndio, detectores, acionadores e sirenes','Portas corta-fogo','Sinalização fotoluminescente']},
  {numero:'07',titulo:'Segurança Eletrônica e Automação Predial',descricao:'Câmeras, cabeamento, portões automáticos e controle de acesso.',cena:'assets/images/servicos/servico-01.webp',largura:640,altura:640,alt:'Técnico instalando e ajustando uma câmera de segurança em uma parede',lista:['Câmeras e DVR','Cabeamento estruturado','Portões automáticos e cancelas','Catracas, interfonia e tag/biometria']}
];
const servicosGrid=document.querySelector('[data-servicos-grid]');
const servicoDialog=document.querySelector('[data-servico-dialog]');
let servicoFocusReturn=null;
if(servicosGrid){
  servicosGrid.innerHTML=SERVICOS.map((s,i)=>`<article class="servico-card${i===0?' is-highlight':''}" data-index="${i}" tabindex="0" aria-label="Ver detalhes: ${s.titulo}"><div class="servico-card-scene"><img src="${s.cena}" alt="${s.alt}" width="${s.largura}" height="${s.altura}" loading="lazy" decoding="async"></div><span class="servico-num">${s.numero}</span><div class="servico-card-body"><h3>${s.titulo}</h3><p class="servico-card-desc">${s.descricao}</p>${i===0?`<ul class="servico-featured-list">${s.lista.slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul>`:''}<button class="servico-details" type="button" aria-label="Ver detalhes: ${s.titulo}">Ver detalhes +</button></div></article>`).join('');
  const cards=[...servicosGrid.querySelectorAll('.servico-card')];
  const openServico=(index,origin)=>{
    if(!servicoDialog)return; const s=SERVICOS[index]; servicoFocusReturn=origin;
    const dialogImg=servicoDialog.querySelector('[data-servico-dialog-img]'); dialogImg.src=s.cena; dialogImg.alt=s.alt; dialogImg.width=s.largura; dialogImg.height=s.altura;
    servicoDialog.querySelector('[data-servico-dialog-num]').textContent=s.numero; servicoDialog.querySelector('[data-servico-dialog-title]').textContent=s.titulo;
    servicoDialog.querySelector('[data-servico-dialog-list]').innerHTML=s.lista.map(x=>`<li>${x}</li>`).join('');
    const cta=servicoDialog.querySelector('[data-servico-dialog-cta]'); cta.href=whatsappUrl(`Olá! Vim pelo site dos Irmãos à Obra e quero um orçamento de ${s.titulo}.`);
    document.documentElement.classList.add('dialog-open'); servicoDialog.showModal(); servicoDialog.querySelector('[data-servico-close]').focus();
  };
  cards.forEach((card,i)=>{card.addEventListener('click',()=>openServico(i,card));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openServico(i,card)}})});
  if(finePointer){cards.forEach(card=>{card.addEventListener('mouseenter',()=>{cards.forEach(c=>c.classList.remove('is-highlight'));card.classList.add('is-highlight')})});servicosGrid.addEventListener('mouseleave',()=>{cards.forEach(c=>c.classList.remove('is-highlight'));cards[0]?.classList.add('is-highlight')})}
  if(!reduced){const reveals=[...document.querySelectorAll('[data-servicos-reveal]'),...cards];reveals.forEach((el,i)=>{el.classList.add('servicos-ready');if(el.classList.contains('servico-card'))el.style.setProperty('--reveal-delay',`${Math.min(i,8)*70}ms`)});const reveal=entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('servicos-in');e.target.classList.remove('servicos-ready')}});if('IntersectionObserver'in window){const io=new IntersectionObserver(reveal,{threshold:.08});reveals.forEach(el=>io.observe(el))}else reveals.forEach(el=>{el.classList.add('servicos-in');el.classList.remove('servicos-ready')})}
}
if(servicoDialog){
  const close=()=>servicoDialog.close(); servicoDialog.querySelector('[data-servico-close]').addEventListener('click',close);
  servicoDialog.addEventListener('click',e=>{if(e.target===servicoDialog)close()});
  servicoDialog.addEventListener('close',()=>{document.documentElement.classList.remove('dialog-open');servicoFocusReturn?.focus()});
  servicoDialog.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=[...servicoDialog.querySelectorAll('button,a[href]')].filter(x=>!x.disabled);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
}
const servicosOrc=document.querySelector('[data-servicos-orcamento]'),servicosContato=document.querySelector('[data-servicos-contato]');
if(servicosOrc){servicosOrc.href=whatsappUrl(CONFIG.mensagens.orcamento);servicosOrc.target='_blank';servicosOrc.rel='noopener noreferrer'}
if(servicosContato){servicosContato.href=whatsappUrl(CONFIG.mensagens.principal);servicosContato.target='_blank';servicosContato.rel='noopener noreferrer'}


// === Certificações ===
const certGrade=document.querySelector('.cert-grade');
const certPainel=document.querySelector('#cert-painel');
if(certGrade&&certPainel){
  const itens=[...certGrade.querySelectorAll('.cert-item')], botoes=itens.map(i=>i.querySelector('.disjuntor')), texto=certPainel.querySelector('[data-cert-text]');
  let ativo=0, resizeTimer;
  const cols=()=>getComputedStyle(certGrade).gridTemplateColumns.split(' ').filter(Boolean).length;
  const posicionar=(i)=>{const c=cols(),fim=Math.min(Math.ceil((i+1)/c)*c,8)-1;itens[fim].after(certPainel);requestAnimationFrame(()=>{const br=botoes[i].getBoundingClientRect(),pr=certPainel.getBoundingClientRect();certPainel.style.setProperty('--seta-x',`${Math.max(18,Math.min(pr.width-18,br.left+br.width/2-pr.left))}px`)})};
  const fechar=()=>{botoes.forEach(b=>{b.classList.remove('is-ativo');b.setAttribute('aria-expanded','false')});certPainel.hidden=true;ativo=-1};
  const abrir=i=>{if(ativo===i&&!certPainel.hidden){fechar();return}certPainel.classList.add('cert-swap');setTimeout(()=>{botoes.forEach((b,j)=>{b.classList.toggle('is-ativo',j===i);b.setAttribute('aria-expanded',String(j===i))});texto.textContent=CONFIG.certificacoes[i].garante;certPainel.hidden=false;ativo=i;posicionar(i);requestAnimationFrame(()=>certPainel.classList.remove('cert-swap'))},120)};
  botoes.forEach((b,i)=>b.addEventListener('click',()=>abrir(i)));
  posicionar(0);
  addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(ativo>=0&&!certPainel.hidden)posicionar(ativo)},120)},{passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ativo>=0&&!certPainel.hidden)fechar()});
  if(!reduced&&'IntersectionObserver'in window){itens.forEach(i=>i.classList.add('desligado'));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){itens.forEach((item,i)=>setTimeout(()=>item.classList.remove('desligado'),i*110));io.disconnect()}}),{threshold:.35});io.observe(certGrade)}
  const co=document.querySelector('[data-cert-orcamento]'),cc=document.querySelector('[data-cert-contato]');
  if(co){co.href=whatsappUrl(CONFIG.mensagens.orcamento);co.target='_blank';co.rel='noopener noreferrer'}
  if(cc){cc.href=whatsappUrl(CONFIG.mensagens.principal);cc.target='_blank';cc.rel='noopener noreferrer'}
}


// === Galeria ===
const galeriaFaixa=document.querySelector('[data-galeria-faixa]');
const galeriaLightbox=document.querySelector('[data-galeria-lightbox]');
if(galeriaFaixa&&galeriaLightbox){
  const cards=[...galeriaFaixa.querySelectorAll('.galeria-card')];
  cards.forEach((card,i)=>{const item=CONFIG.galeria[i],img=card.querySelector('img'),num=card.querySelector('.galeria-num');if(!item||!img)return;card.dataset.indice=String(i);card.setAttribute('aria-label',`Ampliar imagem ${i+1} de ${CONFIG.galeria.length}`);img.src=item.arquivo;img.alt=item.alt;img.width=item.largura;img.height=item.altura;num.textContent=item.numero});
  const imagem=galeriaLightbox.querySelector('[data-galeria-imagem]');
  const contador=galeriaLightbox.querySelector('[data-galeria-contador]');
  const fecharBtn=galeriaLightbox.querySelector('[data-galeria-fechar]');
  let indice=0,origem=null,touchX=0;
  const mostrar=(novo,animar=true)=>{indice=(novo+CONFIG.galeria.length)%CONFIG.galeria.length;const item=CONFIG.galeria[indice];const trocar=()=>{imagem.src=item.arquivo;imagem.alt=item.alt;imagem.width=item.largura;imagem.height=item.altura;contador.textContent=`${indice+1} de ${CONFIG.galeria.length}`;requestAnimationFrame(()=>imagem.classList.remove('trocando'))};if(animar&&!reduced){imagem.classList.add('trocando');setTimeout(trocar,100)}else trocar()};
  const abrir=(i,card)=>{origem=card;mostrar(i,false);document.documentElement.classList.add('trava-scroll');galeriaLightbox.showModal();fecharBtn.focus()};
  const fechar=()=>galeriaLightbox.close();
  cards.forEach((card,i)=>{card.addEventListener('click',()=>abrir(i,card));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();abrir(i,card)}})});
  galeriaLightbox.querySelector('[data-galeria-anterior]').addEventListener('click',()=>mostrar(indice-1));
  galeriaLightbox.querySelector('[data-galeria-seguinte]').addEventListener('click',()=>mostrar(indice+1));
  fecharBtn.addEventListener('click',fechar);
  galeriaLightbox.addEventListener('click',e=>{if(e.target===galeriaLightbox)fechar()});
  galeriaLightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();mostrar(indice-1)}else if(e.key==='ArrowRight'){e.preventDefault();mostrar(indice+1)}});
  galeriaLightbox.addEventListener('close',()=>{document.documentElement.classList.remove('trava-scroll');origem?.focus()});
  imagem.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});
  imagem.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>=50)mostrar(indice+(dx<0?1:-1))},{passive:true});
  if(!reduced){cards.forEach((card,i)=>{card.classList.add('galeria-oculta');card.style.setProperty('--galeria-delay',`${i*90}ms`)});if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){cards.forEach(c=>c.classList.remove('galeria-oculta'));io.disconnect()}}),{threshold:.25});io.observe(galeriaFaixa)}else cards.forEach(c=>c.classList.remove('galeria-oculta'))}
  const go=document.querySelector('[data-galeria-orcamento]'),gc=document.querySelector('[data-galeria-contato]');
  if(go){go.href=whatsappUrl(CONFIG.mensagens.orcamento);go.target='_blank';go.rel='noopener noreferrer'}
  if(gc){gc.href=whatsappUrl(CONFIG.mensagens.principal);gc.target='_blank';gc.rel='noopener noreferrer'}
}


// === Regiões ===
const regioesSection = document.querySelector('#regioes');
if (regioesSection) {
  const mapaCard = regioesSection.querySelector('.mapa-card');
  const mapaStatus = regioesSection.querySelector('[data-mapa-status]');
  const mapaLink = regioesSection.querySelector('[data-mapa-link]');
  const lista = regioesSection.querySelector('[data-regioes-lista]');
  if (mapaLink) mapaLink.href = CONFIG.mapaLink;

  // O iframe só é criado perto da seção e depois que o card já possui altura real.
  let mapaCriado = false;
  const criarMapa = (tentativa = 0) => {
    if (mapaCriado || !mapaCard) return;
    if (mapaCard.getBoundingClientRect().height <= 0) {
      if (tentativa < 10) setTimeout(() => criarMapa(tentativa + 1), 300);
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = CONFIG.mapaUrl;
    iframe.title = 'Mapa da região atendida pelos Irmãos à Obra';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.setAttribute('allowfullscreen', '');
    iframe.addEventListener('load', () => mapaStatus?.remove(), { once: true });
    mapaCard.insertBefore(iframe, mapaCard.firstChild);
    mapaCriado = true;
  };
  if ('IntersectionObserver' in window && mapaCard) {
    const mapaObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { criarMapa(); mapaObserver.disconnect(); }
    }), { rootMargin: '400px 0px', threshold: 0 });
    mapaObserver.observe(regioesSection);
  } else criarMapa();

  if (lista && Array.isArray(CONFIG.regioes)) {
    lista.replaceChildren(...CONFIG.regioes.map(cidade => {
      const li = document.createElement('li'); li.className = 'chip-cidade';
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.setAttribute('class','icone-pin'); svg.setAttribute('aria-hidden','true');
      const use = document.createElementNS('http://www.w3.org/2000/svg','use'); use.setAttribute('href','#i-pin'); svg.append(use);
      const span = document.createElement('span'); span.textContent = cidade; li.append(svg,span); return li;
    }));
  }
  const chips = [...regioesSection.querySelectorAll('.chip-cidade')];
  if (!reduced && chips.length) {
    chips.forEach((chip,i) => { chip.classList.add('pre-reveal'); chip.style.setProperty('--regiao-delay', `${i*40}ms`); });
    const revelar = () => chips.forEach(chip => chip.classList.add('reveal-in'));
    if ('IntersectionObserver' in window) {
      const rio = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { revelar(); rio.unobserve(entry.target); } }), { threshold:.12 });
      rio.observe(regioesSection.querySelector('.regioes-conteudo'));
    } else revelar();
  }
}

// === Dúvidas Frequentes ===
const duvidasSection=document.querySelector('#duvidas');
if(duvidasSection){
  const itens=[...duvidasSection.querySelectorAll('.faq-item')];
  itens.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)itens.forEach(outro=>{if(outro!==item)outro.open=false})}));
  if(!reduced&&itens.length){
    itens.forEach((item,i)=>{item.classList.add('faq-pre-reveal');item.style.setProperty('--faq-delay',`${i*60}ms`)});
    const revelar=()=>itens.forEach(item=>item.classList.add('faq-reveal-in'));
    if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){revelar();io.disconnect()}}),{threshold:.15});io.observe(duvidasSection.querySelector('.faq-lista'))}else revelar();
  }
}

// === Pausa de animações infinitas fora da viewport ===
if ('IntersectionObserver' in window) {
  const animObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('animacoes-pausadas', !entry.isIntersecting);
  }), { threshold: .01 });
  document.querySelectorAll('#servicos, #rodape').forEach(secao => animObserver.observe(secao));
}

// === Rodapé ===
const rodape = document.querySelector('#rodape');
if (rodape) {
  const ano = rodape.querySelector('#ano');
  if (ano) ano.textContent = String(new Date().getFullYear());
  rodape.querySelectorAll('[data-rodape-telefone]').forEach(link => {
    const chave = link.dataset.rodapeTelefone;
    const numero = CONFIG.telefones?.[chave];
    const texto = CONFIG.textos?.[chave];
    if (numero) link.href = `tel:+${numero}`;
    if (texto) {
      const span = link.querySelector('span');
      if (span) span.textContent = texto;
    }
  });
}

// === Cabeçalho mobile/tablet: fechamento do painel ===
(() => {
  const mqMenu = window.matchMedia('(max-width: 899px)');
  const botaoMenu = document.querySelector('.menu-toggle');
  const painelMenu = document.querySelector('.mobile-menu');
  const cabecalho = document.querySelector('.site-header');
  if (!botaoMenu || !painelMenu || !cabecalho) return;
  const fecharMenu = () => {
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    painelMenu.hidden = true;
  };
  document.addEventListener('keydown', event => {
    if (mqMenu.matches && event.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') fecharMenu();
  });
  document.addEventListener('pointerdown', event => {
    if (mqMenu.matches && botaoMenu.getAttribute('aria-expanded') === 'true' && !cabecalho.contains(event.target)) fecharMenu();
  }, { passive: true });
})();
