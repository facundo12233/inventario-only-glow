(function(){
  'use strict';

  function fechaLargaUY(){
    try{
      return new Intl.DateTimeFormat('es-UY', { weekday:'long', day:'numeric', month:'long', year:'numeric' }).format(new Date());
    }catch(_){
      return new Date().toLocaleDateString('es-UY');
    }
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
      a.textContent=item.text || 'Sección';
      if(item.active) a.classList.add('activo');
      a.addEventListener('click', ()=>{
        replica.querySelectorAll('a').forEach(n=>n.classList.toggle('activo', n===a));
        const original=[...source.querySelectorAll('a[href]')].find(x=>(x.getAttribute('href')||'#')===item.href);
        if(original) original.click();
      });
      replica.appendChild(a);
    });
  }

  function addSidebar(panel){
    if(document.getElementById('adminShellPremium')) return;
    const header=panel.querySelector('.cabecera-admin');
    const content=panel.querySelector('.contenido-admin');
    if(!header || !content) return;

    const shell=document.createElement('div');
    shell.id='adminShellPremium';

    const sidebar=document.createElement('aside');
    sidebar.className='admin-sidebar-premium';

    const brand=(header.querySelector('.marca-admin') || document.querySelector('.marca-admin'))?.cloneNode(true);
    if(brand) sidebar.appendChild(brand);

    const meta=document.createElement('div');
    meta.className='admin-sidebar-meta';
    const dateChip=document.createElement('div');
    dateChip.className='admin-date-chip';
    dateChip.textContent=fechaLargaUY();
    const statusChip=document.createElement('div');
    statusChip.className='admin-status-chip';
    statusChip.textContent='Centro de control activo';
    meta.append(dateChip,statusChip);
    sidebar.appendChild(meta);

    const actions=document.createElement('div');
    actions.className='admin-sidebar-actions';
    const btnUpdate=document.createElement('button');
    btnUpdate.type='button';
    btnUpdate.className='admin-sidebar-button admin-sidebar-button--primary';
    btnUpdate.textContent='Actualizar datos';
    btnUpdate.addEventListener('click', ()=>document.getElementById('btnActualizarNegocios')?.click());
    const btnLogout=document.createElement('button');
    btnLogout.type='button';
    btnLogout.className='admin-sidebar-button';
    btnLogout.textContent='Cerrar sesión';
    btnLogout.addEventListener('click', ()=>document.getElementById('btnCerrarSesionAdmin')?.click());
    actions.append(btnUpdate,btnLogout);
    sidebar.appendChild(actions);

    const navTitle=document.createElement('div');
    navTitle.className='admin-sidebar-nav-title';
    navTitle.textContent='Navegación';
    sidebar.appendChild(navTitle);

    const nav=document.createElement('nav');
    nav.id='adminSidebarReplica';
    nav.setAttribute('aria-label','Navegación del panel admin');
    sidebar.appendChild(nav);

    const promo=document.createElement('section');
    promo.className='admin-sidebar-promo';
    promo.innerHTML='<span>AGENDA NIVA</span><h3>Panel más profesional</h3><p>Vista más limpia, accesos rápidos y bloques ordenados para gestionar negocios, pagos y campañas de forma más clara.</p>';
    sidebar.appendChild(promo);

    const main=document.createElement('div');
    main.className='admin-main-premium';

    panel.appendChild(shell);
    shell.append(sidebar,main);
    main.append(header,content);

    document.body.classList.add('admin-premium-ready');
    const source=document.querySelector('.navegacion-admin');
    if(source){
      source.classList.add('admin-nav-source');
      new MutationObserver(syncSidebarNav).observe(source,{childList:true,subtree:true,attributes:true,attributeFilter:['class','href']});
      syncSidebarNav();
    }
  }

  function init(){
    const panel=document.getElementById('panelAdmin');
    if(!panel || panel.style.display==='none') return;
    addSidebar(panel);
    syncSidebarNav();
  }

  const timer=setInterval(init,300);
  setTimeout(()=>clearInterval(timer),30000);
  document.addEventListener('click', function(event){
    if(event.target.closest('#btnActualizarNegocios, .navegacion-admin a')){
      setTimeout(syncSidebarNav, 50);
      setTimeout(syncSidebarNav, 500);
    }
  });
})();
