(() => {
  'use strict';
  const themeButton=document.querySelector('.theme-button');
  function setTheme(theme){document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-pressed',String(theme==='light'));themeButton.setAttribute('aria-label',theme==='dark'?'Ganti ke tema terang':'Ganti ke tema gelap');document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#101110':'#f5f6ef';}
  setTheme(document.documentElement.dataset.theme);
  themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(next);try{localStorage.setItem('bachtiar-links-theme',next);}catch{}});
  document.querySelector('[data-year]').textContent=new Date().getFullYear();
  const plate=document.querySelector('.baseplate'),motion=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
  let frame=0,point=null;
  const reset=()=>{cancelAnimationFrame(frame);frame=0;point=null;plate.style.setProperty('--gx','0px');plate.style.setProperty('--gy','0px');};
  document.addEventListener('pointermove',event=>{if(motion.matches||!fine.matches||document.hidden||event.pointerType==='touch')return;point={x:event.clientX,y:event.clientY};if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(!point)return;plate.style.setProperty('--gx',`${(point.x/innerWidth-.5)*12}px`);plate.style.setProperty('--gy',`${(point.y/innerHeight-.5)*12}px`);plate.style.setProperty('--px',`${point.x}px`);plate.style.setProperty('--py',`${point.y}px`);});},{passive:true});
  document.documentElement.addEventListener('pointerleave',reset);document.addEventListener('visibilitychange',reset);motion.addEventListener('change',reset);
})();
