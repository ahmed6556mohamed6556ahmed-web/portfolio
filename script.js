const KEY="portfolio_projects_v1";
const demo=[
 {title:"موقع شخصي",desc:"موقع تعريفي بسيط بتصميم متجاوب. (مشروع تجريبي)",tag:"ويب",url:"",img:"",icon:"🌐"},
 {title:"لعبة إكس أو",desc:"لعبة تفاعلية بـ JavaScript. (مشروع تجريبي)",tag:"لعبة",url:"",img:"",icon:"🎮"},
 {title:"قائمة المهام",desc:"تطبيق مهام بيحفظ بياناتك في المتصفح. (مشروع تجريبي)",tag:"تطبيق",url:"",img:"",icon:"✅"},
 {title:"آلة حاسبة",desc:"آلة حاسبة بتصميم حديث. (مشروع تجريبي)",tag:"تطبيق",url:"",img:"",icon:"🧮"}
];
let list;
try{list=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!Array.isArray(list))list=demo.slice();
let cur="الكل";
const $=s=>document.querySelector(s);
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(list))}catch(e){}};
function render(){
  const tags=["الكل",...new Set(list.map(p=>p.tag).filter(Boolean))];
  if(!tags.includes(cur))cur="الكل";
  $("#filters").innerHTML="";
  tags.forEach(t=>{const b=document.createElement("button");b.className="chip"+(t===cur?" on":"");b.textContent=t;b.onclick=()=>{cur=t;render()};$("#filters").appendChild(b)});
  const g=$("#grid");g.innerHTML="";
  const shown=list.map((p,i)=>[p,i]).filter(([p])=>cur==="الكل"||p.tag===cur);
  $("#empty").hidden=shown.length>0;
  shown.forEach(([p,i])=>{
    const c=document.createElement("article");c.className="card";
    const th=document.createElement("div");th.className="thumb";
    if(p.img)th.style.backgroundImage=`url("${p.img.replace(/"/g,"%22")}")`;else th.textContent=p.icon||"💡";
    const b=document.createElement("div");b.className="body";
    const h=document.createElement("h3");h.textContent=p.title;
    const d=document.createElement("p");d.textContent=p.desc;
    const m=document.createElement("div");m.className="meta";
    const e=document.createElement("em");e.textContent=p.tag||"مشروع";m.appendChild(e);
    if(/^https?:\/\//.test(p.url||"")){const a=document.createElement("a");a.href=p.url;a.target="_blank";a.rel="noopener";a.textContent="افتح ↗";m.appendChild(a)}
    const x=document.createElement("button");x.className="del";x.textContent="حذف";x.onclick=()=>{if(confirm("تحذف المشروع ده؟")){list.splice(i,1);save();render()}};m.appendChild(x);
    b.append(h,d,m);c.append(th,b);g.appendChild(c);
  });
}
$("#form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
  list.unshift({title:f.get("title").trim(),desc:f.get("desc").trim(),tag:f.get("tag").trim(),url:f.get("url").trim(),img:f.get("img").trim(),icon:"🚀"});
  save();e.target.reset();cur="الكل";render();};
$("#export").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(list,null,2)],{type:"application/json"}));a.download="projects.json";a.click()};
$("#reset").onclick=()=>{if(confirm("ترجّع المشاريع التجريبية وتمسح مشاريعك؟")){list=demo.slice();save();render()}};
$("#contactForm").onsubmit=e=>{e.preventDefault();$("#sent").hidden=false;e.target.reset()};
$("#yr").textContent=new Date().getFullYear();
const root=document.documentElement;
try{if(localStorage.getItem("theme")==="light")root.classList.add("light")}catch(e){}
const tb=$("#theme");const sync=()=>tb.textContent=root.classList.contains("light")?"☀️":"🌙";sync();
tb.onclick=()=>{root.classList.toggle("light");try{localStorage.setItem("theme",root.classList.contains("light")?"light":"dark")}catch(e){}sync()};
const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;
  en.target.classList.add("on");
  en.target.querySelectorAll("[data-n]").forEach(n=>{const t=+n.dataset.n;let v=0;n.textContent=0;const s=setInterval(()=>{v+=Math.ceil(t/30);if(v>=t){v=t;clearInterval(s)}n.textContent=v},35)});
  io.unobserve(en.target)}),{threshold:.3});
document.querySelectorAll(".skill,.stats").forEach(el=>io.observe(el));
render();
