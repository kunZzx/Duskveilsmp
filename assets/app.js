/* =====================================================================
   KONFIGURASI  (ubah bagian ini)
   ===================================================================== */
const FIREBASE_CONFIG = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI_PROJECT.firebaseapp.com",
  projectId: "ISI_PROJECT_ID",
  appId: "ISI_APP_ID"
};
// Email yang jadi admin (cek juga di firestore.rules)
const ADMIN_EMAILS = ["admin@duskveilsmp.com"];
// Kontak tampil di website HANYA jika diisi. Contoh:
// discord: "https://discord.gg/xxxx", whatsapp: "628123456789", email: "halo@domain.com"
const CONTACT = { discord: "", whatsapp: "", email: "" };
const SECURITY_ENABLED = true; // anti F12 / anti devtools

/* ---------- KATALOG (harga default; admin bisa ubah dari Dashboard > Katalog & Harga) ---------- */
const SERVICES = {
  web:{name:"Pembuatan Website",icon:"🌐",pkgs:[
    {id:"web1",n:"Starter",p:350000,d:"Landing page 1 halaman",f:["1 halaman responsif","Form kontak","Hosting guide","1x revisi"]},
    {id:"web2",n:"Business",p:900000,d:"Company profile / portfolio",f:["Hingga 6 halaman","Admin sederhana","SEO dasar","3x revisi"],pop:1},
    {id:"web3",n:"Store Pro",p:2500000,d:"Toko online + auto payment",f:["Katalog produk","Auto payment","Dashboard admin","Login Google","5x revisi"]},
    {id:"web4",n:"Custom",p:0,d:"Web app sesuai kebutuhan",f:["Konsultasi dulu","Harga sesuai scope"],quote:1}]},
  mc:{name:"Developer Server Minecraft",icon:"⛏️",pkgs:[
    {id:"mc1",n:"Setup Dasar",p:300000,d:"Server siap jalan",f:["Paper / Purpur","Plugin dasar","Konfigurasi aman","1x revisi"]},
    {id:"mc2",n:"Server Siap Main",p:650000,d:"Setup lengkap + proteksi",f:["Rank, ekonomi & warp","Anti-cheat & proteksi","Panel manajemen","Bantuan 14 hari"],pop:1},
    {id:"mc3",n:"Full Network",p:2000000,d:"Lobby + survival + minigame",f:["BungeeCord / Velocity","Multi-server & MySQL","Sistem rank & ekonomi","Bantuan 30 hari"]},
    {id:"mc4",n:"Custom",p:0,d:"Konsep server unik buatanmu",f:["Konsultasi dulu"],quote:1}]},
  plg:{name:"Custom Plugin Minecraft",icon:"🧩",pkgs:[
    {id:"pl1",n:"Plugin Basic",p:150000,d:"Fitur sederhana",f:["1–3 command","Config.yml & pesan custom","Permission node","1x revisi"]},
    {id:"pl2",n:"Plugin Pro",p:450000,d:"Fitur menengah + GUI",f:["GUI menu interaktif","Database (SQLite / YAML)","Support PlaceholderAPI & Vault","Source code","3x revisi"],pop:1},
    {id:"pl3",n:"Plugin Premium",p:1200000,d:"Sistem besar & kompleks",f:["Sistem lengkap (clan, quest, dll)","MySQL & cross-server","Dokumentasi config","Update kompatibilitas 30 hari","5x revisi"]},
    {id:"pl4",n:"Custom",p:0,d:"Ide plugin uniknya kamu",f:["Ceritakan idemu","Penawaran harga menyusul"],quote:1}]},
  app:{name:"Aplikasi Custom",icon:"📱",pkgs:[
    {id:"ap1",n:"Bot Discord",p:250000,d:"Bot custom untuk komunitasmu",f:["Slash commands","Panduan hosting","1x revisi"]},
    {id:"ap2",n:"Web App",p:1500000,d:"Aplikasi berbasis web",f:["Login & database","Dashboard","Dokumentasi"],pop:1},
    {id:"ap3",n:"Mobile App",p:4000000,d:"Android / iOS",f:["Desain UI/UX","Bantuan publish","Source code"]},
    {id:"ap4",n:"Custom",p:0,d:"Ceritakan aplikasi yang kamu mau",f:["Konsultasi gratis"],quote:1}]},
  opt:{name:"Optimasi Server Lag",icon:"⚡",pkgs:[
    {id:"op1",n:"Audit & Fix",p:100000,d:"Diagnosa + perbaikan cepat",f:["Cek TPS / MSPT","Laporan masalah","Fix konfigurasi"]},
    {id:"op2",n:"Deep Optimization",p:300000,d:"Untuk server yang parah lag",f:["Profiling Spark","Tuning JVM flags","Optimasi plugin & world","Laporan before-after"],pop:1},
    {id:"op3",n:"Maintenance Bulanan",p:500000,d:"Pantau & jaga performa",f:["Monitoring rutin","Prioritas support","Update plugin"]},
    {id:"op4",n:"Custom",p:0,d:"Network besar / kasus khusus",f:["Konsultasi dulu"],quote:1}]}
};
const PAY = {qris:"QRIS",gopay:"GoPay",ovo:"OVO",dana:"DANA",bca:"VA BCA",bni:"VA BNI"};
const IDEAS = ["Custom Enchants","Crates & Rewards","Shop & Ekonomi GUI","Clan / Guild","Quest & Misi","Skyblock / Island","Minigame Arena","Rank & Prefix","Auction House","Custom Mobs & Boss","Warp & Teleport","Scoreboard & Tab","Integrasi Discord","Anti-Cheat Tambahan"];
const TECH = ["Paper","Spigot","Purpur","Velocity","BungeeCord","Java 21","PlaceholderAPI","Vault","MySQL","Spark Profiler","Firebase","Node.js","Discord.js","HTML · CSS · JS"];

/* =====================================================================
   UTIL
   ===================================================================== */
const $ = id => document.getElementById(id);
const qsa = (s,r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const rp = n => "Rp " + Number(n).toLocaleString("id-ID");
const fdate = t => new Date(t).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"});
const uid = p => p + Math.random().toString(36).slice(2,8).toUpperCase();
const safeImg = s => /^(https:\/\/|data:image\/)/.test(s||"") ? s : "";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
function toast(m,type){const t=$("toast");t.className="";t.textContent=m;void t.offsetWidth;t.className="on "+(type||"");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2900)}
function openM(id){$(id).classList.add("open")}
function closeM(id){$(id).classList.remove("open")}
qsa(".ov").forEach(o=>o.addEventListener("mousedown",e=>{if(e.target===o&&o.id!=="m-order")o.classList.remove("open")}));
$("yr").textContent = new Date().getFullYear();

const mem = {};
const ls = {
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return k in mem?mem[k]:d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){mem[k]=v}}
};

/* animated counter */
function setCount(el,to){
  if(!el)return; const from=el._v||0; el._v=to;
  if(reduced||from===to){el.textContent=to;return}
  const t0=performance.now(), d=900;
  (function f(t){const k=Math.min(1,(t-t0)/d), e=1-Math.pow(1-k,3); el.textContent=Math.round(from+(to-from)*e); if(k<1)requestAnimationFrame(f)})(t0);
}
function confetti(){
  if(reduced)return; const c=$("confetti"), cols=["#a855f7","#ec4899","#f97316","#22c55e","#60a5fa","#facc15"];
  for(let i=0;i<60;i++){const p=document.createElement("i");p.style.left=Math.random()*100+"%";p.style.background=cols[i%cols.length];p.style.animationDuration=(1.6+Math.random()*1.6)+"s";p.style.animationDelay=Math.random()*.4+"s";p.style.transform=`rotate(${Math.random()*360}deg)`;c.appendChild(p)}
  setTimeout(()=>c.innerHTML="",3800);
}

/* =====================================================================
   DATA LAYER  — Firestore (jika Firebase aktif) / localStorage (mode demo)
   users    = data privat (ada email)    → hanya pemilik & admin
   profiles = data publik (nama, foto)   → dipakai "Daftar Akun"
   ===================================================================== */
const fbReady = typeof firebase!=="undefined" && FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.startsWith("ISI_");
let fbAuth=null, fdb=null;
if(fbReady){ try{ firebase.initializeApp(FIREBASE_CONFIG); fbAuth=firebase.auth(); fdb=firebase.firestore(); }catch(e){ console.warn("Firebase gagal init",e); } }
const useFB = !!(fbAuth && fdb);

const PUBK=["uid","name","photo","createdAt","role","banned"];
const pub = u => {const o={};PUBK.forEach(k=>{if(u[k]!==undefined)o[k]=u[k]});return o};
const clean = o => {const r={};for(const k in o)if(o[k]!==undefined)r[k]=o[k];return r};
const lsUsers = () => ls.get("dv_users",[]);

const DB = {
  async getUser(id){
    if(useFB){const d=await fdb.collection("users").doc(id).get();return d.exists?d.data():null}
    return lsUsers().find(x=>x.uid===id)||null;
  },
  async users(){ // lengkap (admin)
    if(useFB){try{return (await fdb.collection("users").get()).docs.map(d=>d.data())}catch(e){console.warn(e);return []}}
    return lsUsers();
  },
  async profiles(){ // publik tanpa email
    if(useFB){try{return (await fdb.collection("profiles").get()).docs.map(d=>d.data())}catch(e){console.warn(e);return []}}
    return lsUsers().map(pub);
  },
  async saveUser(u){
    if(useFB){
      await fdb.collection("users").doc(u.uid).set(clean(u),{merge:true});
      await fdb.collection("profiles").doc(u.uid).set(pub(u),{merge:true}); return;
    }
    const a=lsUsers(), i=a.findIndex(x=>x.uid===u.uid); if(i>=0)a[i]={...a[i],...u}; else a.push(u); ls.set("dv_users",a);
  },
  async orders(){
    if(useFB){try{return (await fdb.collection("orders").get()).docs.map(d=>d.data())}catch(e){console.warn(e);return []}}
    return ls.get("dv_orders",[]);
  },
  async ordersOf(id){
    if(useFB){try{return (await fdb.collection("orders").where("uid","==",id).get()).docs.map(d=>d.data())}catch(e){console.warn(e);return []}}
    return ls.get("dv_orders",[]).filter(o=>o.uid===id);
  },
  async saveOrder(o){
    if(useFB){await fdb.collection("orders").doc(o.id).set(clean(o),{merge:true});return}
    const a=ls.get("dv_orders",[]), i=a.findIndex(x=>x.id===o.id); if(i>=0)a[i]={...a[i],...o}; else a.unshift(o); ls.set("dv_orders",a);
  },
  async catalog(){
    if(useFB){try{const d=await fdb.collection("settings").doc("catalog").get();return d.exists?d.data():{prices:{},hidden:{}}}catch(e){return {prices:{},hidden:{}}}}
    return ls.get("dv_catalog",{prices:{},hidden:{}});
  },
  async saveCatalog(c){
    if(useFB){await fdb.collection("settings").doc("catalog").set(c);return}
    ls.set("dv_catalog",c);
  }
};

/* katalog dengan override admin */
let CAT={prices:{},hidden:{}};
const effPkg = p => ({...p,p:(!p.quote && CAT.prices[p.id]!=null)?Number(CAT.prices[p.id]):p.p});
const livePkgs = sk => SERVICES[sk].pkgs.filter(p=>!CAT.hidden[p.id]).map(effPkg);

/* =====================================================================
   AUTH
   ===================================================================== */
let me=null, pendingAction=null, manualLogin=false;
const isAdmin = u => !!u && (u.role==="admin" || ADMIN_EMAILS.includes((u.email||"").toLowerCase()));

async function afterLogin(u){
  let ex=null; try{ex=await DB.getUser(u.uid)}catch(e){console.warn(e)}
  if(ex&&ex.banned){ if(useFB)try{await fbAuth.signOut()}catch(e){} me=null; renderNav(); toast("Akun ini diblokir.","err"); return; }
  me = ex ? {...ex} : {uid:u.uid,name:u.name,email:u.email,photo:u.photo||"",role:"user",createdAt:Date.now()};
  if(u.forceAdmin) me.role="admin";
  try{await DB.saveUser(me)}catch(e){console.warn(e); toast("Gagal menyimpan akun (cek Firestore Rules)","err")}
  if(!useFB) ls.set("dv_session",me.uid);
  closeM("m-login"); renderNav(); renderHomeData();
  if(!u.silent) toast("Selamat datang, "+me.name+"!","ok");
  if(pendingAction){const f=pendingAction;pendingAction=null;f()}
}
function requireLogin(cb){ if(me){cb();return} pendingAction=cb; showLogin(); }
function showLogin(){
  $("demoBox").style.display=useFB?"none":"block";
  const n=$("demoNote"); n.style.display=useFB?"none":"block";
  n.innerHTML="⚙️ <b>Mode Demo</b> — Firebase belum dikonfigurasi, login Google disimulasikan dan akun hanya tersimpan di browser ini. Isi <code>FIREBASE_CONFIG</code> untuk login Google sungguhan.";
  openM("m-login");
}
async function loginGoogle(){
  if(!useFB){ toast("Mode demo: isi nama & email di bawah"); $("demoName").focus(); return; }
  try{ manualLogin=true; await fbAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); }
  catch(e){ manualLogin=false; toast("Login dibatalkan / gagal","err"); console.warn(e); }
}
async function demoLogin(admin){
  let name=$("demoName").value.trim().slice(0,24), email=$("demoEmail").value.trim().toLowerCase();
  if(admin){ name=name||"Admin"; email=email||ADMIN_EMAILS[0]; }
  if(!name||!/^\S+@\S+\.\S+$/.test(email)){ toast("Isi nama dan email yang valid","err"); return; }
  const id="demo_"+btoa(unescape(encodeURIComponent(email))).replace(/[^a-z0-9]/gi,"").slice(0,20);
  await afterLogin({uid:id,name,email,photo:"",forceAdmin:!!admin});
}
async function logout(){
  if(useFB){try{await fbAuth.signOut()}catch(e){}}
  ls.set("dv_session",null); me=null; renderNav(); go("home"); toast("Berhasil keluar");
}
async function restoreSession(){
  if(useFB){
    fbAuth.onAuthStateChanged(async u=>{
      if(u && (!me||me.uid!==u.uid)){ const silent=!manualLogin; manualLogin=false; await afterLogin({uid:u.uid,name:u.displayName||"User",email:u.email,photo:u.photoURL||"",silent}); }
      else if(!u){ me=null; renderNav(); }
    });
  } else {
    const sid=ls.get("dv_session",null);
    if(sid){const u=await DB.getUser(sid); if(u&&!u.banned) me=u;}
  }
  renderNav();
}

/* =====================================================================
   NAV & PROFIL
   ===================================================================== */
const avatarHTML=(u,cls="")=>{const im=safeImg(u&&u.photo);return `<div class="avatar ${cls}">${im?`<img src="${esc(im)}" alt="">`:esc((u?.name||"?").trim().charAt(0).toUpperCase())}</div>`};
function renderNav(){
  const n=$("navr");
  if(!me){ n.innerHTML=`<button class="btn p" onclick="showLogin()">Masuk</button>`; return; }
  n.innerHTML=`<div class="umenu">
    <button class="ubtn" onclick="event.stopPropagation();$('dd').classList.toggle('open')" aria-label="Menu akun">${avatarHTML(me,"ring")}<span>${esc(me.name)}</span></button>
    <div class="dd" id="dd">
      <div class="who"><b>${esc(me.name)}</b><small>${esc(me.email)}</small>${isAdmin(me)?'<span class="badge b-acc" style="margin-top:6px">ADMIN</span>':''}</div>
      <button onclick="go('home')">🏠 Beranda</button>
      <button onclick="openProfile()">✏️ Edit Profil</button>
      <button onclick="go('orders')">🧾 Pesanan Saya</button>
      ${isAdmin(me)?`<button onclick="go('admin')">📊 Dashboard Admin</button>`:''}
      <button onclick="logout()" style="color:#fca5a5">🚪 Keluar</button>
    </div></div>`;
}
document.addEventListener("click",()=>{const d=$("dd");if(d)d.classList.remove("open")});

let draftPhoto="";
function openProfile(){
  draftPhoto=me.photo||"";
  $("pfName").value=me.name; $("pfEmail").value=me.email;
  const im=safeImg(draftPhoto);
  $("pfAvatar").innerHTML=im?`<img src="${esc(im)}" alt="">`:esc(me.name.charAt(0).toUpperCase());
  openM("m-profile");
}
$("pfFile").addEventListener("change",e=>{
  const f=e.target.files[0]; if(!f)return;
  if(!f.type.startsWith("image/")){toast("File harus berupa gambar","err");return}
  if(f.size>8*1024*1024){toast("Maksimal 8 MB","err");return}
  const r=new FileReader();
  r.onload=()=>{const img=new Image();img.onload=()=>{
    const s=256,c=document.createElement("canvas");c.width=c.height=s;
    const m=Math.min(img.width,img.height),sx=(img.width-m)/2,sy=(img.height-m)/2;
    c.getContext("2d").drawImage(img,sx,sy,m,m,0,0,s,s);
    draftPhoto=c.toDataURL("image/jpeg",.82);
    $("pfAvatar").innerHTML=`<img src="${draftPhoto}" alt="">`;
  };img.src=r.result};
  r.readAsDataURL(f); e.target.value="";
});
function removePhoto(){draftPhoto="";$("pfAvatar").textContent=($("pfName").value||me.name).charAt(0).toUpperCase()}
async function saveProfile(){
  const name=$("pfName").value.trim().slice(0,24);
  if(name.length<2){toast("Nama minimal 2 karakter","err");return}
  const next={...me,name,photo:draftPhoto||""};
  try{await DB.saveUser(next)}catch(e){console.warn(e);toast("Gagal menyimpan profil","err");return}
  me=next; closeM("m-profile"); renderNav(); renderHomeData(); toast("Profil diperbarui ✔","ok");
}

/* =====================================================================
   NAVIGASI / VIEW
   ===================================================================== */
function go(v,noTop){
  if((v==="orders"||v==="admin")&&!me){requireLogin(()=>go(v));return}
  if(v==="admin"&&!isAdmin(me)){toast("Akses khusus admin","err");return}
  qsa(".view").forEach(x=>x.classList.remove("on"));
  $("v-"+v).classList.add("on");
  closeMenu();
  if(!noTop) window.scrollTo({top:0,behavior:"instant"});
  if(v==="orders")renderMyOrders();
  if(v==="admin")renderAdmin();
  observeRv();
}
function scrollToSec(id){
  if(!$("v-home").classList.contains("on")) go("home",true);
  closeMenu();
  setTimeout(()=>{const el=$(id); if(el) el.scrollIntoView({behavior:"smooth",block:"start"})},40);
}
function closeMenu(){$("links").classList.remove("open");$("burger").classList.remove("open")}
$("burger").addEventListener("click",e=>{e.stopPropagation();$("links").classList.toggle("open");$("burger").classList.toggle("open")});
qsa("#links a").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();scrollToSec(a.dataset.sec)}));

/* =====================================================================
   HOME
   ===================================================================== */
let curSvc="web";
function openSvc(k){curSvc=k;renderTabs();scrollToSec("paket")}
function renderTabs(){
  $("tabs").innerHTML=Object.entries(SERVICES).map(([k,s])=>`<button class="tab ${k===curSvc?"on":""}" onclick="curSvc='${k}';renderTabs()">${s.icon} ${esc(s.name)}</button>`).join("");
  const list=livePkgs(curSvc);
  $("pkgs").innerHTML=list.length?list.map((p,i)=>`
    <div class="pk ${p.pop?"pop":""}" style="--d:${i*80}ms">
      <h3>${esc(p.n)}</h3><p>${esc(p.d)}</p>
      <div class="price">${p.quote?"Nego":rp(p.p)}${p.quote?"":"<small> /proyek</small>"}</div>
      <ul>${p.f.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      <button class="btn ${p.pop?"p":"g"}" onclick="startOrder('${curSvc}','${p.id}')">${p.quote?"Konsultasi":"Pesan Sekarang"} <span class="arr">→</span></button>
    </div>`).join(""):`<div class="none">Paket untuk layanan ini sedang tidak tersedia.</div>`;
  const total=Object.keys(SERVICES).reduce((a,k)=>a+livePkgs(k).length,0);
  setCount($("stPkg"),total);
}
async function renderHomeData(){
  let list=await DB.profiles();
  list=list.filter(u=>!u.banned).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  setCount($("stUsers"),list.length); $("memCount").textContent=list.length;
  $("members").innerHTML=list.length?list.slice(0,48).map((u,i)=>`
    <div class="mem sp pop-in" style="--d:${Math.min(i,12)*50}ms">${avatarHTML(u)}<div><b>${esc(u.name)}</b><small>Bergabung ${fdate(u.createdAt)}</small></div>${u.role==="admin"?'<span class="badge b-acc">Admin</span>':''}</div>`).join("")
    :`<div class="es"><div class="e">👤</div><h3>Belum ada akun terdaftar</h3><p>Jadilah member pertama DuskveilSMP Store.</p><button class="btn p" onclick="showLogin()">Daftar dengan Google</button></div>`;
}
function renderContact(){
  const items=[];
  if(CONTACT.discord) items.push(["💬 Discord",CONTACT.discord]);
  if(CONTACT.whatsapp) items.push(["📲 WhatsApp","https://wa.me/"+String(CONTACT.whatsapp).replace(/\D/g,"")]);
  if(CONTACT.email) items.push(["✉️ Email","mailto:"+CONTACT.email]);
  const lnk=items.map(([t,h])=>`<a href="${esc(h)}" target="_blank" rel="noopener">${t}</a>`).join("");
  $("footContact").innerHTML=lnk;
  $("contactBtns").insertAdjacentHTML("beforeend",items.map(([t,h])=>`<a class="btn lg" style="background:rgba(255,255,255,.18);color:#fff" href="${esc(h)}" target="_blank" rel="noopener">${t}</a>`).join(""));
}

/* =====================================================================
   ORDER & AUTO PAYMENT
   ===================================================================== */
let cur=null, payTimer=null;
function startOrder(sk,pid){ requireLogin(()=>{
  const pkg=livePkgs(sk).find(p=>p.id===pid); if(!pkg){toast("Paket tidak tersedia","err");return}
  cur={sk,pkg,method:"qris",note:""}; renderOrderForm(); openM("m-order");
});}
const fee = p => Math.round(p*0.007)+(cur&&["bca","bni"].includes(cur.method)?4000:0);
function renderOrderForm(){
  const {sk,pkg}=cur, s=SERVICES[sk];
  if(pkg.quote){
    $("orderBody").innerHTML=`<h3>Konsultasi ${esc(s.name)}</h3><p class="sub">Jelaskan kebutuhanmu, tim kami akan memberi penawaran harga.</p>
      <label>Detail kebutuhan</label><textarea id="oNote" rows="5" maxlength="800" placeholder="${sk==="plg"?"Contoh: Saya mau plugin crate dengan animasi, reward dari config, dan GUI preview…":"Jelaskan idemu di sini…"}"></textarea>
      <button class="btn p" style="width:100%;margin-top:16px" onclick="submitQuote()">Kirim Permintaan</button>`;
    return;
  }
  $("orderBody").innerHTML=`<h3>Checkout</h3><p class="sub" style="margin-bottom:0">${esc(s.name)} — ${esc(pkg.n)}</p>
    <label>Catatan pesanan (opsional)</label><textarea id="oNote" rows="3" maxlength="500" placeholder="${sk==="plg"||sk==="mc"||sk==="opt"?"Versi Minecraft, jenis server (Paper/Spigot), detail fitur…":"Detail tambahan, link referensi, dll."}"></textarea>
    <label>Metode Pembayaran</label>
    <div class="pm">${Object.entries(PAY).map(([k,v])=>`<button class="${k===cur.method?"on":""}" onclick="cur.method='${k}';renderOrderForm()">${v}</button>`).join("")}</div>
    <div class="sum"><div><span>${esc(pkg.n)}</span><span>${rp(pkg.p)}</span></div><div><span>Biaya admin</span><span>${rp(fee(pkg.p))}</span></div><div class="t"><span>Total</span><span>${rp(pkg.p+fee(pkg.p))}</span></div></div>
    <button class="btn p" style="width:100%;margin-top:16px" onclick="createPayment()">Bayar Sekarang</button>`;
  const t=$("oNote"); t.value=cur.note; t.oninput=()=>cur.note=t.value;
}
async function submitQuote(){
  const note=$("oNote").value.trim(); if(note.length<10){toast("Jelaskan kebutuhan minimal 10 karakter","err");return}
  const o={id:uid("QT-"),uid:me.uid,userName:me.name,email:me.email,svcKey:cur.sk,svc:SERVICES[cur.sk].name,pkg:"Custom",amount:0,method:"-",status:"konsultasi",note:note.slice(0,800),createdAt:Date.now()};
  try{await DB.saveOrder(o)}catch(e){console.warn(e);toast("Gagal mengirim permintaan","err");return}
  closeM("m-order"); toast("Permintaan terkirim! Kami segera menghubungi kamu.","ok");
}
/* Pseudo-QR visual (demo). Produksi: tampilkan QR dari payment gateway. */
function fakeQR(seed){
  let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;
  const rnd=()=>(h=(h*1664525+1013904223)>>>0)/4294967296, N=25, cell=8;
  let svg=`<svg class="qr" viewBox="0 0 ${N*cell} ${N*cell}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/>`;
  const fin=(x,y)=>`<rect x="${x*cell}" y="${y*cell}" width="${7*cell}" height="${7*cell}" fill="#000"/><rect x="${(x+1)*cell}" y="${(y+1)*cell}" width="${5*cell}" height="${5*cell}" fill="#fff"/><rect x="${(x+2)*cell}" y="${(y+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#000"/>`;
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){
    if((x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9))continue;
    if(rnd()>.52)svg+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="#000"/>`;
  }
  return svg+fin(0,0)+fin(N-7,0)+fin(0,N-7)+"</svg>";
}
async function createPayment(){
  const {sk,pkg,method,note}=cur, total=pkg.p+fee(pkg.p);
  const o={id:uid("DV-"),uid:me.uid,userName:me.name,email:me.email,svcKey:sk,svc:SERVICES[sk].name,pkg:pkg.n,amount:total,method,status:"menunggu",note:note.slice(0,500),createdAt:Date.now(),expiresAt:Date.now()+15*60000};
  try{await DB.saveOrder(o)}catch(e){console.warn(e);toast("Gagal membuat pesanan (cek Firestore Rules)","err");return}
  cur.order=o; renderPayment();
}
function renderPayment(){
  const o=cur.order, isVA=["bca","bni"].includes(o.method);
  const va="8077"+Math.abs([...o.id].reduce((a,c)=>a*31+c.charCodeAt(0),7)).toString().padStart(12,"0").slice(0,12);
  $("orderBody").innerHTML=`<div class="center"><h3>Selesaikan Pembayaran</h3>
    <p class="sub" style="margin-bottom:0">${esc(o.id)} · ${esc(PAY[o.method])}</p>
    <div class="price grad" style="margin:14px 0 0">${rp(o.amount)}</div>
    ${isVA?`<div class="sum" style="margin:16px 0"><div><span>Nomor VA</span><b>${va}</b></div></div>`:fakeQR(o.id)}
    <div class="cdbar"><span id="cdBar"></span></div>
    <p style="font-size:14px"><span class="pulse"></span>Menunggu pembayaran… <span id="cd"></span></p>
    <div class="demo" style="text-align:left">🔄 <b>Auto-payment (demo):</b> pembayaran dikonfirmasi otomatis dalam beberapa detik. Di produksi, status diubah oleh webhook payment gateway (Midtrans / Xendit / Tripay).</div>
    <button class="btn g" style="width:100%;margin-top:12px" onclick="stopPay();closeM('m-order')">Bayar nanti</button></div>`;
  const start=Date.now(), delay=5200, total=o.expiresAt-o.createdAt;
  stopPay();
  payTimer=setInterval(async()=>{
    const left=Math.max(0,o.expiresAt-Date.now()), m=Math.floor(left/60000), s=Math.floor(left%60000/1000);
    const cd=$("cd"); if(cd)cd.textContent=`(${m}:${String(s).padStart(2,"0")})`;
    const bar=$("cdBar"); if(bar)bar.style.width=(left/total*100)+"%";
    if(Date.now()-start>=delay){ stopPay(); await markPaid(o); }
  },500);
}
function stopPay(){clearInterval(payTimer);payTimer=null}
async function markPaid(o){
  try{ await DB.saveOrder({id:o.id,status:"lunas",paidAt:Date.now()}); }
  catch(e){
    console.warn(e);
    $("orderBody").innerHTML=`<div class="center"><div style="font-size:48px">🕐</div><h3>Pesanan Tersimpan</h3>
      <p class="sub">Pesanan <b>${esc(o.id)}</b> sudah tercatat dan menunggu konfirmasi pembayaran. Konfirmasi otomatis membutuhkan backend webhook (lihat README); admin juga bisa mengubah status secara manual.</p>
      <button class="btn p" style="width:100%" onclick="closeM('m-order');go('orders')">Lihat Pesanan Saya</button></div>`;
    return;
  }
  $("orderBody").innerHTML=`<div class="center">
    <svg class="okc" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25"/><path d="M14 27l8 8 16-17"/></svg>
    <h3>Pembayaran Berhasil!</h3>
    <p class="sub">Pesanan <b>${esc(o.id)}</b> (${esc(o.svc)} — ${esc(o.pkg)}) sudah lunas dan masuk antrean pengerjaan.</p>
    <button class="btn p" style="width:100%" onclick="closeM('m-order');go('orders')">Lihat Pesanan Saya</button></div>`;
  confetti();
}

/* =====================================================================
   PESANAN SAYA
   ===================================================================== */
const stBadge = s => ({menunggu:"b-wait",lunas:"b-ok",diproses:"b-prog",selesai:"b-ok",batal:"b-bad",konsultasi:"b-acc"}[s]||"b-wait");
async function renderMyOrders(){
  const list=(await DB.ordersOf(me.uid)).sort((a,b)=>b.createdAt-a.createdAt);
  $("myOrders").innerHTML=list.length?list.map(o=>`<tr><td>${esc(o.id)}</td><td>${esc(o.svc)}</td><td>${esc(o.pkg)}</td><td>${o.amount?rp(o.amount):"-"}</td><td>${esc(PAY[o.method]||"-")}</td><td><span class="badge ${stBadge(o.status)}">${esc(o.status)}</span></td><td>${fdate(o.createdAt)}</td></tr>`).join("")
    :`<tr><td colspan="7" class="empty">Belum ada pesanan. Pilih paket di beranda untuk mulai.</td></tr>`;
}

/* =====================================================================
   ADMIN
   ===================================================================== */
function adminTab(t){
  ["orders","users","catalog"].forEach(k=>{
    $("ad-"+k).style.display=k===t?"block":"none"; $("at-"+k).classList.toggle("on",k===t);
  });
  if(t==="catalog")renderCatalogEditor();
}
async function renderAdmin(){
  if(!isAdmin(me))return;
  const [orders,users]=await Promise.all([DB.orders(),DB.users()]);
  orders.sort((a,b)=>b.createdAt-a.createdAt);
  const paid=orders.filter(o=>["lunas","diproses","selesai"].includes(o.status));
  const rev=paid.reduce((a,o)=>a+o.amount,0);
  $("kpis").innerHTML=[["💰","Total Pendapatan",rp(rev)],["🧾","Total Pesanan",orders.length],["⏳","Menunggu Bayar",orders.filter(o=>o.status==="menunggu").length],["👥","Akun Terdaftar",users.length]]
    .map((k,i)=>`<div class="kpi" style="--d:${i*70}ms"><div>${k[0]}</div><b>${k[2]}</b><span>${k[1]}</span></div>`).join("");
  const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-(6-i));return d});
  const vals=days.map(d=>paid.filter(o=>{const t=new Date(o.paidAt||o.createdAt);t.setHours(0,0,0,0);return +t===+d}).reduce((a,o)=>a+o.amount,0));
  const mx=Math.max(...vals,1);
  $("bars").innerHTML=vals.map((v,i)=>`<div style="--h:${Math.max(3,v/mx*100)}%;--d:${i*70}ms" title="${rp(v)}"><span>${days[i].toLocaleDateString("id-ID",{weekday:"short"})}</span></div>`).join("");
  $("svcStats").innerHTML=Object.entries(SERVICES).map(([k,s])=>`<div class="sr"><span>${s.icon} ${esc(s.name)}</span><b>${orders.filter(o=>o.svcKey===k).length}</b></div>`).join("");
  $("adOrders").innerHTML=orders.length?orders.map(o=>`<tr><td>${esc(o.id)}</td><td>${esc(o.userName)}<br><small style="color:var(--mut)">${esc(o.email)}</small></td><td>${esc(o.svc)}<br><small style="color:var(--mut)">${esc(o.pkg)}</small></td><td>${o.amount?rp(o.amount):"-"}</td><td>${esc(PAY[o.method]||"-")}</td>
    <td><span class="badge ${stBadge(o.status)}">${esc(o.status)}</span></td>
    <td><select style="width:auto;padding:7px 9px;font-size:12px" onchange="setStatus('${esc(o.id)}',this.value)">${["menunggu","lunas","diproses","selesai","batal","konsultasi"].map(s=>`<option ${s===o.status?"selected":""}>${s}</option>`).join("")}</select></td></tr>`).join("")
    :`<tr><td colspan="7" class="empty">Belum ada pesanan.</td></tr>`;
  $("adUsers").innerHTML=users.length?users.sort((a,b)=>b.createdAt-a.createdAt).map(u=>`<tr><td><div style="display:flex;align-items:center;gap:10px">${avatarHTML(u)}<b>${esc(u.name)}</b></div></td><td>${esc(u.email)}</td>
    <td><span class="badge ${isAdmin(u)?"b-acc":"b-prog"}">${isAdmin(u)?"admin":"user"}</span>${u.banned?' <span class="badge b-bad">blokir</span>':""}</td><td>${fdate(u.createdAt)}</td>
    <td>${u.uid===me.uid?'<small style="color:var(--mut)">Kamu</small>':`<button class="btn sm g" onclick="toggleRole('${esc(u.uid)}')">${u.role==="admin"?"Cabut admin":"Jadikan admin"}</button> <button class="btn sm d" onclick="toggleBan('${esc(u.uid)}')">${u.banned?"Buka blokir":"Blokir"}</button>`}</td></tr>`).join("")
    :`<tr><td colspan="5" class="empty">Belum ada akun terdaftar.</td></tr>`;
}
async function setStatus(id,s){try{await DB.saveOrder({id,status:s});toast("Status diperbarui","ok")}catch(e){toast("Gagal mengubah status","err")}renderAdmin()}
async function toggleRole(id){const u=(await DB.users()).find(x=>x.uid===id);if(!u)return;try{await DB.saveUser({uid:id,role:u.role==="admin"?"user":"admin"})}catch(e){toast("Gagal","err")}renderAdmin();renderHomeData()}
async function toggleBan(id){const u=(await DB.users()).find(x=>x.uid===id);if(!u)return;try{await DB.saveUser({uid:id,banned:!u.banned})}catch(e){toast("Gagal","err")}renderAdmin();renderHomeData()}

/* editor katalog & harga */
function renderCatalogEditor(){
  $("adCatalog").innerHTML=Object.entries(SERVICES).flatMap(([sk,s])=>s.pkgs.map(p=>`<tr>
    <td>${s.icon} ${esc(s.name)}</td><td>${esc(p.n)}</td>
    <td>${p.quote?'<span class="badge b-acc">Nego</span>':`<input type="number" class="inp-s" min="0" step="1000" data-price="${p.id}" value="${CAT.prices[p.id]!=null?CAT.prices[p.id]:p.p}">`}</td>
    <td><label class="sw"><input type="checkbox" data-show="${p.id}" ${CAT.hidden[p.id]?"":"checked"}><i></i></label></td></tr>`)).join("");
}
async function saveCatalog(){
  const prices={}, hidden={};
  qsa("[data-price]").forEach(i=>{const v=parseInt(i.value,10); if(!isNaN(v)&&v>=0)prices[i.dataset.price]=v});
  qsa("[data-show]").forEach(i=>{if(!i.checked)hidden[i.dataset.show]=true});
  try{await DB.saveCatalog({prices,hidden}); CAT={prices,hidden}; renderTabs(); toast("Katalog disimpan ✔","ok")}
  catch(e){console.warn(e);toast("Gagal menyimpan katalog","err")}
}

/* =====================================================================
   EFEK VISUAL
   ===================================================================== */
/* scroll reveal */
const rvIO = "IntersectionObserver" in window ? new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add("in");rvIO.unobserve(t);setTimeout(()=>t.classList.remove("rv","in"),1200)}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"}) : null;
function observeRv(){qsa(".rv:not(.in)").forEach(el=>rvIO?rvIO.observe(el):el.classList.add("in"))}

/* header, progress, active link */
const hdr=$("hdr"), prog=$("progress"), secs=["layanan","plugin","paket","alur","akun","faq"];
let tick=false;
function onScroll(){
  if(tick)return; tick=true;
  requestAnimationFrame(()=>{
    const y=window.scrollY, h=document.documentElement.scrollHeight-innerHeight;
    hdr.classList.toggle("scrolled",y>10); prog.style.width=(h>0?y/h*100:0)+"%";
    if($("v-home").classList.contains("on")){
      let a=""; secs.forEach(id=>{const el=$(id); if(el&&el.getBoundingClientRect().top<innerHeight*.4)a=id});
      qsa("#links a").forEach(l=>l.classList.toggle("act",l.dataset.sec===a));
    }
    tick=false;
  });
}
addEventListener("scroll",onScroll,{passive:true}); onScroll();

/* spotlight + cursor glow + tilt */
document.addEventListener("pointermove",e=>{
  const t=e.target.closest&&e.target.closest(".sp");
  if(t){const r=t.getBoundingClientRect();t.style.setProperty("--mx",(e.clientX-r.left)+"px");t.style.setProperty("--my",(e.clientY-r.top)+"px")}
  if(e.pointerType==="mouse"){const g=$("glow");g.classList.add("on");g.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`}
});
document.addEventListener("pointerleave",()=>$("glow").classList.remove("on"));
qsa(".tilt").forEach(el=>{
  if(reduced)return;
  el.addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*9}deg) rotateX(${-y*9}deg)`});
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

/* rotating headline word */
(function(){
  const words=["website modern","server Minecraft","custom plugin","aplikasi custom","server anti lag"], el=$("rot"); let i=0;
  if(reduced)return;
  setInterval(()=>{
    el.classList.add("out");
    setTimeout(()=>{i=(i+1)%words.length;el.textContent=words[i];el.classList.remove("out");el.classList.add("in");setTimeout(()=>el.classList.remove("in"),450)},350);
  },2800);
})();

/* console animation (ilustrasi optimasi) */
let tpsNow=8.4;
function setTps(v){
  tpsNow=v; const cls=v<12?"bad":v<18?"mid":"good";
  $("tpsv").textContent=v.toFixed(1); $("tpsv").className="tps-v "+cls;
  $("tpsb").style.width=(v/20*100)+"%"; $("tpsb").className=cls==="bad"?"":cls;
}
function tweenTps(to,ms){
  const from=tpsNow,t0=performance.now();
  (function f(t){const k=Math.min(1,(t-t0)/ms);setTps(from+(to-from)*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0);
}
function runConsole(){
  const body=$("cbody"); if(!body)return;
  const L=[["info","INFO","Memulai audit performa (Spark)…",8.4],["warn","WARN","Plugin bermasalah memakai 41% waktu tick",8.4],["info","INFO","Tuning JVM flags & garbage collector ✔",12.6],["info","INFO","Optimasi entity, chunk & redstone ✔",17.2],["ok","DONE","Selesai — server stabil, lag hilang ✔",20]];
  const line=l=>`<div class="ln ${l[0]}"><b>[${l[1]}]</b>${esc(l[2])}</div>`;
  if(reduced){body.innerHTML=L.map(line).join("");setTps(20);return}
  body.innerHTML=""; setTps(8.4); let i=0;
  (function step(){
    if(i>=L.length){setTimeout(runConsole,4600);return}
    body.insertAdjacentHTML("beforeend",line(L[i])); tweenTps(L[i][3],900); i++;
    setTimeout(step,1150);
  })();
}

/* =====================================================================
   KEAMANAN: anti F12 / anti DevTools (desktop)
   Catatan: hanya penghalang di sisi client — keamanan nyata ada di server
   (Firestore Rules, validasi webhook pembayaran, dll).
   ===================================================================== */
(function security(){
  if(!SECURITY_ENABLED) return;
  const desktop=!("ontouchstart" in window)&&matchMedia("(pointer:fine)").matches;
  if(!desktop) return;
  let inFrame=false; try{inFrame=window.self!==window.top}catch(e){inFrame=true}
  const lock=$("lock"); let locked=false;
  const trip=()=>{if(!locked){locked=true;lock.classList.add("on");document.body.style.overflow="hidden"}};
  const release=()=>{if(locked){locked=false;lock.classList.remove("on");document.body.style.overflow=""}};
  document.addEventListener("contextmenu",e=>e.preventDefault());
  document.addEventListener("keydown",e=>{
    const k=e.key.toLowerCase(), c=e.ctrlKey||e.metaKey;
    if(e.key==="F12"||(c&&e.shiftKey&&["i","j","c","k"].includes(k))||(c&&["u","s","p"].includes(k))||(e.metaKey&&e.altKey&&["i","j","c","u"].includes(k))){
      e.preventDefault();e.stopPropagation();return false;
    }
  },true);
  document.addEventListener("dragstart",e=>{if(e.target.tagName==="IMG")e.preventDefault()});
  const check=()=>{
    let open=false;
    if(!inFrame) open=(window.outerWidth-window.innerWidth>170)||(window.outerHeight-window.innerHeight>200);
    if(!open){const t=performance.now();(function(){debugger})();if(performance.now()-t>120)open=true}
    open?trip():release();
  };
  setInterval(check,1000); addEventListener("resize",check); check();
})();

/* =====================================================================
   INIT
   ===================================================================== */
$("mq").innerHTML=(TECH.map(t=>`<span>${esc(t)}</span>`).join("")).repeat(2);
$("ideas").innerHTML=IDEAS.map((t,i)=>`<span class="chip" style="--d:${i*45}ms">${esc(t)}</span>`).join("");
setCount($("stSvc"),Object.keys(SERVICES).length);
renderContact();
renderTabs();
observeRv();
runConsole();
(async()=>{
  CAT=await DB.catalog(); renderTabs();
  await restoreSession();
  renderHomeData();
})();
