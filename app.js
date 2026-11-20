const menus=[
['限时·夺取大红砖','限时单','limited-redbrick.webp','11.12—11.26 · 限定活动'],
['柒号社·小时陪玩单','护航猛攻单','hourly.webp','小时陪玩 · 多档等级'],
['试营业·超值体验单','护航猛攻单','limited-experience.webp','127R 起 · 每版本每天限定一单'],
['机密护航单','护航猛攻单','classified-escort.webp','117R · 保1077W'],
['重生之满级大佬重回新手村','护航猛攻单','max-level.webp','498R · 基础保底1200W'],
['绝对清图单','护航猛攻单','clear-map.webp','277R 起 · 清图专场'],
['唐王骰子','趣味单','dice.webp','骰子摇摇摇'],
['左轮一响，黄金万两','趣味单','revolver.webp','六发定乾坤 · 327R 起'],
['百格红大挑战','趣味单','hundred-red.webp','367R / 577R · 50格 / 100格'],
['神偷沙色','趣味单','sand.webp','巴别塔夺金行动'],
['百亿补贴','趣味单','billion.webp','477 / 577 包亿'],
['黄金矿工','趣味单','gold-miner.webp','青铜 / 白银 / 黄金'],
['板板步步高升','趣味单','step.webp','逐级挑战'],
['千万以上','趣味单','ten-million.webp','677R · 保1000W'],
['航天黑洞','趣味单','blackhole.webp','非黑洞撤离'],
['逃学威龙','趣味单','escape.webp','航天基地主题'],
['超级·小小巨人','趣味单','giant.webp','三档规格'],
['真·一命通关','趣味单','one-life.webp','标准 / PRO MAX'],
['S12赛季·微光 3×3价目表','3×3专区','s12-3x3.webp','33代做 / 33陪做']
];const $=id=>document.getElementById(id);let current=0,lastFocus=null,vipMode=false;
const cats=['赛季限时单','护航猛攻单','趣味单','3×3专区'];
const categoryGroups=[
 {name:'护航猛攻单',key:'护航猛攻单',id:'assault-missions',number:'01',en:'ASSAULT SUPPORT',desc:'帅气出击 · 默契配合与细致服务',tone:'assault',feature:true},
 {name:'赛季限时单',key:'限时单',id:'season-missions',number:'02',en:'SEASON LIMITED',desc:'限定企划 · 发现本季惊喜',tone:'season',feature:true},
 {name:'趣味单',key:'趣味单',id:'fun-missions',number:'03',en:'FUN MISSIONS',desc:'奇怪的快乐 · 脑洞大开',tone:'fun',feature:false},
 {name:'3×3专区',key:'3×3专区',id:'three-missions',number:'04',en:'3×3 SPECIAL',desc:'赛季任务 · 专项挑战',tone:'three',feature:false}
];
const contact='微信公众号：柒号社电竞俱乐部\nKOOK：0000007';const imageVersions={'max-level.webp':'20261120-webp-repaired-v2','ten-million.webp':'20261120-webp-repaired-v2','classified-escort.webp':'20261120-webp-repaired-v2','hourly.webp':'20261118-webp-repaired','clear-map.webp':'20261118-webp-repaired','limited-experience.webp':'20261118-experience-daily-limited'};const img=m=>'./assets/'+m[2]+(imageVersions[m[2]]?'?v='+imageVersions[m[2]]:m[2]==='delivery.webp'?'?v=20261114':'');
const popularityBase=[4680,8700,8958,8800,8950,8600,6745,5585,4520,6180,5630,4495,5570,9850,5540,6610,4505,7720,4440];
function popularityHash(value){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function getPopularity(index){
 const start=new Date(2026,10,14);start.setHours(0,0,0,0);
 const today=new Date();today.setHours(0,0,0,0);
 const days=Math.max(0,Math.floor((today-start)/86400000));
 let value=popularityBase[index]??800;
 for(let day=1;day<=days&&value<9999;day++)value+=10+(popularityHash(index+':'+day)%31);
 return Math.min(9999,value);
}
function menuCard(m,i){
 const number=m[1]==='趣味单'?menus.slice(0,i+1).filter(x=>x[1]==='趣味单').length:i+1;
 const streamer=m[2]==='delivery.webp';
 const chairmanFavorite=m[2]==='giant.webp';
 const isNew=['max-level.webp','hourly.webp','clear-map.webp','classified-escort.webp'].includes(m[2]) || m[2]==='hundred-red.webp';
 return '<button class="card '+(m[1]==='限时单'?'limited-card ':'')+(streamer?'streamer-card':'')+(chairmanFavorite?' chairman-card':'')+(isNew?' new-card':'')+'" data-i="'+i+'" aria-label="查看'+m[0]+'完整菜单，人气值'+getPopularity(i)+'"><div class="card-pic '+'"><img loading="lazy" src="'+img(m)+'" alt="'+m[0]+'正式海报">'+'<div class="card-number"><b>'+(m[1]==='限时单'?'LIMITED TIME':'MISSION')+'</b> / '+String(number).padStart(2,'0')+'</div><div class="card-hover">展开完整菜单 <b>↗</b></div></div>'+(streamer?'<div class="streamer-badge">主播同款</div>':'')+(chairmanFavorite?'<div class="chairman-badge">董事长梅尔·最爱</div>':'')+(isNew?'<div class="new-badge">NEW <span>上新</span></div>':'')+'<div class="card-bottom"><div class="card-main"><small>'+ (m[1]==='限时单'?'赛季限时单':m[1]) +' · '+m[3]+'</small><h3>'+m[0]+'</h3><div class="card-popularity"><span>人气值 <i>动态模拟</i></span><strong>'+getPopularity(i)+'</strong></div></div><b class="card-arrow">↗</b></div></button>';
}
function render(){
 $('tabs').innerHTML=categoryGroups.map((g,i)=>'<button type="button" class="category-tile '+g.tone+(g.feature?' featured':'')+'" data-target="'+g.id+'" aria-label="跳转到'+g.name+'"><span class="category-tile-top"><b>0'+(i+1)+' / '+g.en+'</b><em>'+(g.tone==='assault'?'主推首选':g.feature?'赛季限时':'探索专区')+'</em></span><strong>'+g.name+'</strong><span class="category-tile-footer">'+g.desc+' <b>'+(g.tone==='assault'?'立即查看 ↗':'↗')+'</b></span></button>').join('');
 $('grid').innerHTML=categoryGroups.map((g,i)=>{
   const visible=menus.map((m,index)=>({m,index})).filter(x=>x.m[1]===g.key);
   const groupTitle='<div class="menu-category-head"><div><span class="category-kicker">'+g.number+' / '+g.en+'</span><h3>'+g.name+'</h3><p>'+g.desc+'</p></div><span class="category-quantity">'+String(visible.length).padStart(2,'0')+' <small>项玩法</small></span></div>';
   const cards='<div class="menu-cards grid">'+visible.map(x=>menuCard(x.m,x.index)).join('')+'</div>';
   return '<section id="'+g.id+'" class="menu-category-section '+g.tone+(g.feature?' featured':'')+'">'+groupTitle+cards+'</section>';
 }).join('');
 document.querySelectorAll('[data-target]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.target).scrollIntoView({behavior:'smooth',block:'start'}));
 document.querySelectorAll('[data-i]').forEach(b=>{if(!b.disabled)b.onclick=()=>openPoster(Number(b.dataset.i))});
}function lock(v){document.body.classList.toggle('locked',v)}
function openRules(){lastFocus=document.activeElement;$('rulesModal').classList.remove('hidden');$('rulesContent').scrollTop=0;lock(true);$('rulesAccept').focus()}function closeRules(accepted){$('rulesModal').classList.add('hidden');lock(false);if(accepted)sessionStorage.setItem('no7_rules','read');lastFocus?.focus?.()}
function openPoster(i){const alreadyOpen=!$('posterModal').classList.contains('hidden');if(!alreadyOpen)lastFocus=document.activeElement;vipMode=false;$('prev').hidden=false;$('next').hidden=false;let target=(i+menus.length)%menus.length;const direction=i>=current?1:-1;current=target;const m=menus[current];$('posterCount').textContent='MISSION '+String(current+1).padStart(2,'0')+' / '+menus.length;$('posterTitle').textContent=m[0];$('posterImg').src=m[4]?'./assets/'+m[4]:img(m);$('posterImg').alt='柒号社电竞 '+m[0]+' 正式菜单完整海报';$('posterModal').classList.remove('hidden');$('posterScroll').scrollTop=0;const panel=$('posterModal').querySelector('.poster-window');panel.classList.remove('exiting');if(!alreadyOpen){panel.style.animation='none';void panel.offsetWidth;panel.style.animation=''}else{const picture=$('posterImg');picture.style.animation='none';void picture.offsetWidth;picture.style.animation=''}lock(true);$('posterClose').focus()}function openSpecial(title,filename){lastFocus=document.activeElement;vipMode=true;$('prev').hidden=true;$('next').hidden=true;$('posterCount').textContent='MEMBERSHIP / BENEFITS';$('posterTitle').textContent=title;$('posterImg').src='./assets/'+filename;$('posterImg').alt='柒号社 '+title+' 完整海报';$('posterModal').classList.remove('hidden');$('posterScroll').scrollTop=0;lock(true);$('posterClose').focus()}const openVip=()=>openSpecial('试营业预存福利','vip.webp');const openNaming=()=>openSpecial('冠名定价','naming.webp');let closing=false;function closePoster(){if(closing)return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finishClose();return}closing=true;const panel=$('posterModal').querySelector('.poster-window');panel.classList.add('exiting');setTimeout(()=>{panel.classList.remove('exiting');finishClose();closing=false},280)}function finishClose(){$('posterModal').classList.add('hidden');lock(false);lastFocus?.focus?.()}
async function copy(btn){const old=btn.innerHTML;try{await navigator.clipboard.writeText(contact);btn.textContent='已复制 ✓'}catch{btn.textContent='公众号：柒号社电竞俱乐部 / KOOK：0000007'}setTimeout(()=>btn.innerHTML=old,2600)}
function openOrder(){lastFocus=document.activeElement;$('orderModal').classList.remove('hidden');lock(true);$('orderClose').focus()}function closeOrder(){$('orderModal').classList.add('hidden');lock(false);lastFocus?.focus?.()}
function updateSeasonCountdown(){const target=Date.UTC(2027,0,20);const now=new Date();const today=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate());const days=Math.max(0,Math.ceil((target-today)/86400000));const node=$('seasonDays');if(node)node.textContent=String(days);const next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,1);window.setTimeout(updateSeasonCountdown,Math.max(1000,next-now));}
updateSeasonCountdown();
$('showRules').onclick=openRules;$('heroRules').onclick=openRules;$('mobileRules').onclick=openRules;$('rulesAccept').onclick=()=>closeRules(true);$('rulesClose').onclick=()=>{if(sessionStorage.getItem('no7_rules'))closeRules(false)};$('vipOpen').onclick=openVip;$('vipPreview').onclick=openVip;$('namingOpen').onclick=openNaming;$('namingPreview').onclick=openNaming;$('posterClose').onclick=closePoster;$('prev').onclick=()=>openPoster(current-1);$('next').onclick=()=>openPoster(current+1);$('contactCopy').onclick=openOrder;$('mobileContact').onclick=openOrder;$('posterCopy').onclick=()=>{finishClose();openOrder()};$('orderClose').onclick=closeOrder;$('copyMethods').onclick=e=>copy(e.currentTarget);$('orderModal').onclick=e=>{if(e.target===$('orderModal'))closeOrder()};
$('posterModal').onclick=e=>{if(e.target===$('posterModal'))closePoster()};$('rulesModal').onclick=e=>{if(e.target===$('rulesModal')&&sessionStorage.getItem('no7_rules'))closeRules(false)};document.onkeydown=e=>{if(e.key==='Escape'){if(!$('orderModal').classList.contains('hidden'))closeOrder();else if(!$('posterModal').classList.contains('hidden'))closePoster();else if(sessionStorage.getItem('no7_rules')&&!$('rulesModal').classList.contains('hidden'))closeRules(false)}if(!vipMode&&!$('posterModal').classList.contains('hidden')){if(e.key==='ArrowRight')openPoster(current+1);if(e.key==='ArrowLeft')openPoster(current-1)}};
render();$('limitedShortcut').onclick=()=>document.getElementById('assault-missions').scrollIntoView({behavior:'smooth',block:'start'});if(!sessionStorage.getItem('no7_rules'))openRules();
