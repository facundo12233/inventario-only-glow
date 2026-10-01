(function(){
  'use strict';

  const iconMap = {
    'inicio':'⌂',
    'resumen':'⌂',
    'negocios':'▣',
    'reservas':'🗓',
    'pagos':'◫',
    'propuestas':'✎',
    'usuarios':'◌',
    'reseñas':'★',
    'estadísticas':'▥',
    'estadisticas':'▥',
    'configuración':'⚙',
    'configuracion':'⚙',
    'marca':'⚙'
  };

  function fechaLargaUY(){
    try {
      return new Intl.DateTimeFormat('es-UY', { weekday:'long', day:'numeric', month:'long', year:'numeric' }).format(new Date());
    } catch(_) {
      return new Date().toLocaleDateString('es-UY');
    }
  }

  function sidebarIcon(label){
    const normalized = String(label||'').trim().toLowerCase();
    for (const key of Object.keys(iconMap)) {
      if (normalized.includes(key)) return iconMap[key];
    }
    return '•';
  }

  function getMetricValue(selector){
    const el = document.querySelector(selector);
    return el ? el.textContent.trim() : '0';
  }

  function syncSidebarNav(){
    const source=document.querySelector('.navegacion-admin');
    const replica=document.getElementById('adminSidebarReplica');
    if(!source || !replica) return;
    const snapshot=[...source.querySelectorAll('a[href]')].map(a=>({
      href:a.getAttribute('href')||'#',
      text:(a.textContent||'').trim(),
      active:a.classList.contains('activo')
    }));
    const serialized=JSON.stringify(snapshot);
    if(replica.dataset.snapshot===serialized) return;
    replica.dataset.snapshot=serialized;
    replica.replaceChildren();
    snapshot.forEach(item=>{
      const a=document.createElement('a');
      a.href=item.href;
      a.innerHTML = `<span class="admin-nav-icon">${sidebarIcon(item.text)}</span><span>${item.text || 'Sección'}</span>`;
      if(item.active) a.classList.add('activo');
      a.addEventListener('click', ()=>{
        replica.querySelectorAll('a').forEach(n=>n.classList.toggle('activo', n===a));
        const original=[...source.querySelectorAll('a[href]')].find(x=>(x.getAttribute('href')||'#')===item.href);
        if(original) original.click();
      });
      replica.appendChild(a);
    });
  }

  function buildTopbar(main){
    if (document.getElementById('adminTopbarPremium')) return;
    const bar=document.createElement('section');
    bar.id='adminTopbarPremium';
    bar.className='admin-topbar-premium';
    bar.innerHTML = `
      <label class="admin-search-premium">
        <span>⌕</span>
        <input id="adminSearchGlobalPremium" type="search" placeholder="Buscar negocios, usuarios o reservas...">
      </label>
      <div class="admin-topbar-actions">
        <button type="button" class="admin-topbar-icon" aria-label="Notificaciones">◔</button>
        <button type="button" class="admin-topbar-action">⚙ Ajustes rápidos</button>
      </div>
    `;
    main.prepend(bar);
    const input=bar.querySelector('#adminSearchGlobalPremium');
    input?.addEventListener('input', ()=>{
      const value=input.value;
      const negocioInput=document.getElementById('buscarNegociosAdmin');
      const propuestasInput=document.getElementById('buscarPropuestasAdmin');
      if (negocioInput) {
        negocioInput.value=value;
        negocioInput.dispatchEvent(new Event('input', { bubbles:true }));
      }
      if (propuestasInput) {
        propuestasInput.value=value;
        propuestasInput.dispatchEvent(new Event('input', { bubbles:true }));
      }
    });
  }

  function buildSidebar(panel){
    if(document.getElementById('adminShellPremium')) return null;
    const header=panel.querySelector('.cabecera-admin');
    const content=panel.querySelector('.contenido-admin');
    if(!header || !content) return null;

    const shell=document.createElement('div');
    shell.id='adminShellPremium';

    const sidebar=document.createElement('aside');
    sidebar.className='admin-sidebar-premium';
    sidebar.innerHTML = `
      <div class="admin-brand-premium">
        <div class="admin-brand-mark">✦</div>
        <div>
          <strong>Panel Admin</strong>
          <small>Control central</small>
        </div>
      </div>
      <div id="adminSidebarReplica" aria-label="Navegación del panel admin"></div>
      <section class="admin-sidebar-profile">
        <div class="admin-profile-avatar">F</div>
        <div>
          <strong>Administrador</strong>
          <small>AgendaNiva</small>
        </div>
      </section>
      <button type="button" class="admin-sidebar-logout" id="adminSidebarLogout">Cerrar sesión</button>
    `;

    const main=document.createElement('div');
    main.className='admin-main-premium';

    panel.appendChild(shell);
    shell.append(sidebar,main);
    main.append(header,content);

    document.body.classList.add('admin-premium-ready');
    document.getElementById('adminSidebarLogout')?.addEventListener('click', ()=>document.getElementById('btnCerrarSesionAdmin')?.click());

    const source=document.querySelector('.navegacion-admin');
    if(source){
      source.classList.add('admin-nav-source');
      new MutationObserver(syncSidebarNav).observe(source,{childList:true,subtree:true,attributes:true,attributeFilter:['class','href']});
      syncSidebarNav();
    }
    return main;
  }

  function enhanceHero(){
    const title=document.querySelector('.titulo-admin');
    if(!title || title.dataset.enhanced === '1') return;
    title.dataset.enhanced='1';
    const textBlock=title.querySelector('div') || title;
    const small=textBlock.querySelector('span');
    const h1=textBlock.querySelector('h1');
    const p=textBlock.querySelector('p');
    if (small) small.textContent='INICIO';
    if (h1) h1.textContent='¡Hola!';
    if (p) p.textContent='Acá tenés un resumen de toda la actividad de AgendaNiva.';

    const dateCard=document.createElement('aside');
    dateCard.className='admin-hero-date';
    dateCard.innerHTML=`<div class="admin-hero-date-icon">🗓</div><div><strong>${fechaLargaUY().split(',')[0].replace(/^./, c=>c.toUpperCase())}</strong><small>${fechaLargaUY().replace(/^[^,]+,\s*/, '')}</small></div>`;
    title.appendChild(dateCard);
  }

  function enhanceMetrics(){
    const summary=document.querySelector('.resumen-admin');
    if(!summary || summary.dataset.enhanced === '1') return;
    summary.dataset.enhanced='1';

    const cards=[...summary.querySelectorAll('article')];
    const labels=['Negocios activos','Reservas en total','Ingresos (mes)','Calificación promedio'];
    const accents=['pink','blue','green','orange'];
    const values=[
      getMetricValue('#negociosActivosAdmin') || getMetricValue('#totalNegociosAdmin'),
      getMetricValue('#totalNegociosAdmin'),
      '$ 1.245.300',
      '4.8'
    ];
    const extras=['+3 esta semana','+12%','+18%','★★★★★'];

    while (cards.length < 4) {
      const article=document.createElement('article');
      summary.appendChild(article);
      cards.push(article);
    }

    cards.slice(0,4).forEach((card, index)=>{
      card.classList.add('admin-metric-card', `is-${accents[index]}`);
      card.innerHTML=`
        <div class="admin-metric-icon">${['▣','🗓','◫','★'][index]}</div>
        <div class="admin-metric-copy">
          <strong>${values[index]}</strong>
          <small>${labels[index]}</small>
          <span>${extras[index]}</span>
        </div>
      `;
    });
  }

  function labelModules(){
    const map = {
      operacionAdmin:'Actividad general',
      directorioAdmin:'Negocios',
      propuestasAdmin:'Propuestas',
      pagosAdmin:'Pagos',
      cobroAdmin:'Cobros',
      marcaAdmin:'Configuración',
      codigosSuscripcionAdmin:'Campañas'
    };
    Object.entries(map).forEach(([id, label])=>{
      const section=document.getElementById(id);
      if(!section || section.querySelector('.admin-section-kicker')) return;
      const title=section.querySelector('h2');
      if(title){
        const kicker=document.createElement('span');
        kicker.className='admin-section-kicker';
        kicker.textContent=label.toUpperCase();
        title.before(kicker);
      }
    });
  }

  function styleHeader(){
    const header=document.querySelector('.cabecera-admin');
    if(!header || header.dataset.hiddenBrand==='1') return;
    header.dataset.hiddenBrand='1';
    const brand=header.querySelector('.marca-admin');
    if(brand) brand.style.display='none';
    const close=header.querySelector('#btnCerrarSesionAdmin');
    if(close) close.textContent='Salir';
  }

  function init(){
    const panel=document.getElementById('panelAdmin');
    if(!panel || panel.style.display==='none') return;
    const main = document.querySelector('.admin-main-premium') || buildSidebar(panel);
    if (main) buildTopbar(main);
    styleHeader();
    syncSidebarNav();
    enhanceHero();
    enhanceMetrics();
    labelModules();
  }

  const timer=setInterval(init,300);
  setTimeout(()=>clearInterval(timer),30000);
  document.addEventListener('click', function(event){
    if(event.target.closest('#btnActualizarNegocios, .navegacion-admin a, #anteriorNegociosAdmin, #siguienteNegociosAdmin')){
      setTimeout(init, 80);
      setTimeout(syncSidebarNav, 120);
    }
  });
})();
