'use strict';
// Set to true after adding room values to sessions.js.
const SHOW_ROOMS = false;
const DATA = window.SESSIONS || [];
const state = {search:'',day:'all',topic:'all',campus:'all',sort:'original'};
const $ = id => document.getElementById(id);
const DAY_NAMES = {'2026-12-03':'Thursday, December 3','2026-12-04':'Friday, December 4'};
const ORDER = ['2026-12-03','2026-12-04'];
const TIMES = ['9:30 AM','12:45 PM','1:00 PM','2:00 PM','2:15 PM'];
const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ICONS = {
 code:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m10 9-3 3 3 3m4-6 3 3-3 3"/>',
 layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
 scale:'<path d="M12 3v18M4 7h16M5 7l-3 6h6L5 7Zm14 0-3 6h6l-3-6ZM8 21h8"/>',
 people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2H3Z"/><path d="M17 12a3 3 0 1 0-1.8-5.4M18 15c2.4.3 3 2.1 3 4v1h-4"/>',
 sparkles:'<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 14 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
 heart:'<path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 6l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.3a5.5 5.5 0 0 0 0-7.8Z"/><path d="M3.5 12h4l2-3 3 6 2-3h5"/>',
 video:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 8 6 4-6 4V8Z"/>',
 trend:'<path d="m4 18 6-6 4 3 6-9M15 6h5v5"/>',
 institution:'<path d="m3 10 9-7 9 7H3Zm2 0v9m5-9v9m4-9v9m5-9v9M3 21h18M2 19h20"/>',
 graduation:'<path d="m2 10 10-6 10 6-10 6-10-6Zm4 2v5c3 3 9 3 12 0v-5m4-2v8"/>'
};
function icon(name){return `<svg class="session-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.code}</svg>`;}
function fillOptions(){
 const topics=[...new Set(DATA.flatMap(s=>s.topics))].sort((a,b)=>a.localeCompare(b));
 const campuses=[...new Set(DATA.map(s=>s.campus))].sort((a,b)=>a.localeCompare(b));
 topics.forEach(t=>{const o=new Option(t,t);$('topic').add(o)});
 campuses.forEach(t=>{const o=new Option(t,t);$('campus').add(o)});
 $('totalCount').textContent=DATA.length;
}
function matches(s){
 if(state.day!=='all'&&s.date!==state.day) return false;
 if(state.topic!=='all'&&!s.topics.includes(state.topic))return false;
 if(state.campus!=='all'&&s.campus!==state.campus)return false;
 if(state.search){const hay=[s.title,s.description,s.campus,...s.topics,...s.presenters,s.time].join(' ').toLocaleLowerCase();if(!hay.includes(state.search))return false;}
 return true;
}
function card(s){
 const people=s.presenters.map(escapeHTML).join(', ');
 const room = SHOW_ROOMS && s.room ? `<p class="room"><strong>Room:</strong> ${escapeHTML(s.room)}</p>` : '';
 return `<article class="session-card" id="${escapeHTML(s.id)}" aria-labelledby="title-${escapeHTML(s.id)}">
   <div class="card-icon">${icon(s.icon)}</div>
   <div class="card-content"><div class="card-topline"><span class="campus-label">${escapeHTML(s.campus)}</span></div><h4 id="title-${escapeHTML(s.id)}">${escapeHTML(s.title)}</h4><p class="session-description">${escapeHTML(s.description)}</p>
   <p class="presenters"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg><span>${people}</span></p>${room}
   <div class="tags" aria-label="Topics">${s.topics.map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>
   </div></article>`;
}
function render(){
 const matched=DATA.filter(matches);
 const plural=matched.length===1?'session':'sessions';
 $('resultCount').textContent=`Showing ${matched.length} of ${DATA.length} ${plural}`;
 $('emptyState').hidden=!!matched.length;
 const fragments=[];
 for(const date of ORDER){
   const dateRecords=matched.filter(s=>s.date===date);
   if(!dateRecords.length)continue;
   const blocks=[];
   for(const time of TIMES){
     let entries=dateRecords.filter(s=>s.time===time);
     if(!entries.length)continue;
     if(state.sort==='title') entries.sort((a,b)=>a.title.localeCompare(b.title));
     if(state.sort==='campus') entries.sort((a,b)=>a.campus.localeCompare(b.campus)||a.title.localeCompare(b.title));
     const count=entries.length;
     blocks.push(`<section class="time-block" aria-label="${escapeHTML(time)} sessions"><div class="time-heading"><div class="time-chip"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg><h3>${escapeHTML(time)}</h3></div><span class="concurrent-label">${count} ${count===1?'session':'concurrent sessions'}</span></div><div class="cards-grid">${entries.map(card).join('')}</div></section>`);
   }
   fragments.push(`<section class="day-group" aria-labelledby="day-${date}"><div class="day-heading"><span class="day-chevron" aria-hidden="true"></span><h3 id="day-${date}">${DAY_NAMES[date]}</h3><span class="day-counter">${dateRecords.length} ${dateRecords.length===1?'session':'sessions'}</span></div>${blocks.join('')}</section>`);
 }
 $('results').innerHTML=fragments.join('');
}
function applyDay(next){state.day=next;document.querySelectorAll('.day-button').forEach(b=>{const active=b.dataset.day===next;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});render();}
function reset(){state.search='';state.topic='all';state.campus='all';state.sort='original';$('search').value='';$('topic').value='all';$('campus').value='all';$('sort').value='original';applyDay('all');}
document.addEventListener('DOMContentLoaded',()=>{
 fillOptions();render();
 $('search').addEventListener('input',e=>{state.search=e.target.value.trim().toLocaleLowerCase();render()});
 $('topic').addEventListener('change',e=>{state.topic=e.target.value;render()});
 $('campus').addEventListener('change',e=>{state.campus=e.target.value;render()});
 $('sort').addEventListener('change',e=>{state.sort=e.target.value;render()});
 document.querySelectorAll('.day-button').forEach(b=>b.addEventListener('click',()=>applyDay(b.dataset.day)));
 $('resetFilters').addEventListener('click',reset);$('emptyReset').addEventListener('click',reset);
 $('printButton').addEventListener('click',()=>window.print());
});
