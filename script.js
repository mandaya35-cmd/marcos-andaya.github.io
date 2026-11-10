(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('yr').textContent=new Date().getFullYear();
  // hero tracker: rows complete one by one, then the panel pulses green and restarts
  var tr=document.querySelector('.tracker'),rows=[].slice.call(document.querySelectorAll('.tr'));
  if(reduce){rows.forEach(function(r,i){r.dataset.s=i<2?2:1})}
  else{var step=0;var tick=function(){var i=Math.floor(step/2)%rows.length,p=step%2;
    if(step>0&&i===0&&p===0){rows.forEach(function(r){r.dataset.s=0});tr.classList.remove('all')}
    rows[i].dataset.s=p+1;
    if(i===rows.length-1&&p===1){tr.classList.remove('all');void tr.offsetWidth;tr.classList.add('all')}
    step++};
    setTimeout(function(){tick();setInterval(tick,1300)},1900)}
  // copy-email button (works even when no mail app is set up)
  var cp=document.getElementById('copy');
  cp.addEventListener('click',function(){var t='mandaya35@gmail.com';
    var done=function(){cp.textContent='Copied \u2713';setTimeout(function(){cp.textContent='Copy email'},2000)};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){prompt('Copy this email:',t)})}
    else{prompt('Copy this email:',t)}});
  // mobile menu
  var m=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
  m.addEventListener('click',function(){var o=nav.classList.toggle('open');m.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(){nav.classList.remove('open');m.setAttribute('aria-expanded',false)});
  // scroll progress
  var pg=document.getElementById('pg'),tk=false;
  function prog(){var h=document.documentElement;pg.style.transform='scaleX('+(h.scrollTop/((h.scrollHeight-h.clientHeight)||1))+')';tk=false}
  addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(prog)}},{passive:true});
  // active section in nav + one reveal for the work rows
  if('IntersectionObserver' in window){
    var links={};[].forEach.call(nav.querySelectorAll('a[href^="#"]'),function(a){links[a.getAttribute('href').slice(1)]=a});
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
      [].forEach.call(nav.querySelectorAll('a.on'),function(a){a.classList.remove('on')});
      var a=links[e.target.id];if(a&&!a.classList.contains('cta'))a.classList.add('on')}})},{rootMargin:'-45% 0px -50% 0px'});
    [].forEach.call(document.querySelectorAll('main section[id]'),function(s){so.observe(s)});
    if(!reduce){var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{threshold:.15});
      [].forEach.call(document.querySelectorAll('.case'),function(c){c.classList.add('rv');ro.observe(c)})}
  }
  // lightbox
  var lb=document.getElementById('lb'),st=lb.querySelector('.stage'),cap=lb.querySelector('.cap');
  function close(){st.innerHTML='';lb.close()}
  lb.querySelector('.x').addEventListener('click',close);
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  [].forEach.call(document.querySelectorAll('[data-src]'),function(el){el.addEventListener('click',function(){
    var im=document.createElement('img');im.src=el.dataset.src;im.alt=el.dataset.cap;st.innerHTML='';st.appendChild(im);cap.textContent=el.dataset.cap;lb.showModal()})});
})();
