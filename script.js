
const $ = id => document.getElementById(id);
const views = document.querySelectorAll(".view");

const LEVELS = [
  {name:"Iniciante", xp:100},
  {name:"Explorador", xp:300},
  {name:"Curioso", xp:700},
  {name:"Dedicado", xp:1500},
  {name:"Avançado", xp:3000},
  {name:"Aprendiz", xp:5000},
  {name:"Estudante", xp:8000},
  {name:"Especialista", xp:12000},
  {name:"Mestre", xp:18000},
  {name:"Lenda", xp:26000}
];

const TEST_BANK = {
  "Matemática":[
    {topic:"Operações",q:"Quanto é 7 + 5?",a:["10","11","12","13"],correct:2},
    {topic:"Multiplicação",q:"Quanto é 6 × 4?",a:["18","20","24","28"],correct:2},
    {topic:"Frações",q:"Qual fração representa metade?",a:["1/2","1/3","2/3","3/4"],correct:0},
    {topic:"Equações",q:"Se x + 3 = 8, quanto vale x?",a:["3","4","5","6"],correct:2},
    {topic:"Porcentagem",q:"Quanto é 10% de 200?",a:["10","20","30","40"],correct:1}
  ],
  "default":[
    {topic:"Conhecimento básico",q:"Qual alternativa você considera correta sobre esta matéria?",a:["Alternativa A","Alternativa B","Alternativa C","Alternativa D"],correct:0},
    {topic:"Compreensão",q:"Escolha a melhor resposta.",a:["Resposta 1","Resposta 2","Resposta 3","Resposta 4"],correct:1},
    {topic:"Aplicação",q:"Qual opção parece mais adequada?",a:["Opção A","Opção B","Opção C","Opção D"],correct:2},
    {topic:"Raciocínio",q:"Escolha uma resposta.",a:["A","B","C","D"],correct:3},
    {topic:"Revisão",q:"Última pergunta do mini teste.",a:["1","2","3","4"],correct:0}
  ]
};

let user = JSON.parse(localStorage.getItem("learnWayUser")) || null;
let subjects = JSON.parse(localStorage.getItem("learnWaySubjects")) || [];
let chats = JSON.parse(localStorage.getItem("learnWayChats")) || [];
let activeSubject = null;
let testState = null;
let activeChat = null;

if(user) openApp();

$("start-button").onclick = () => {
  const name=$("name").value.trim(), d=+$("day").value, m=+$("month").value, y=+$("year").value;
  if(!name||!d||!m||!y){ alert("Preencha seu nome e sua data de nascimento."); return; }
  user={name,birthDate:`${d}/${m}/${y}`,birthYear:y,xp:0};
  saveUser(); openApp();
};

function saveUser(){localStorage.setItem("learnWayUser",JSON.stringify(user))}
function saveSubjects(){localStorage.setItem("learnWaySubjects",JSON.stringify(subjects))}
function saveChats(){localStorage.setItem("learnWayChats",JSON.stringify(chats))}

function openApp(){
  $("login-screen").classList.remove("active");
  $("app-screen").classList.add("active");
  $("user-name").textContent=user.name;
  renderAll();
  showView("home");
}

function showView(name){
  views.forEach(v=>v.classList.remove("active"));
  const target=$("view-"+name); if(target) target.classList.add("active");
  document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===name));
  window.scrollTo(0,0);
  if(name==="subjects") renderSubjectsPage();
  if(name==="chats") renderGlobalChats();
}

document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));

function currentGeneralLevel(){
  let current=null;
  LEVELS.forEach(l=>{if(user.xp>=l.xp) current=l});
  return current;
}
function nextGeneralLevel(){
  return LEVELS.find(l=>user.xp<l.xp) || null;
}
function renderGeneralProgress(){
  const current=currentGeneralLevel(), next=nextGeneralLevel();
  $("general-level").textContent=current ? "🏆 "+current.name : "⚪ Sem nível";
  $("xp").textContent=user.xp;
  if(!next){
    $("xp-bar").style.width="100%"; $("next-level").textContent="Você alcançou o nível máximo!";
    return;
  }
  const prev=current?current.xp:0;
  const pct=Math.max(0,Math.min(100,((user.xp-prev)/(next.xp-prev))*100));
  $("xp-bar").style.width=pct+"%";
  $("next-level").textContent=`${user.xp} / ${next.xp} XP para ${next.name}`;
}

function renderMedals(){
  const earned=[];
  if(subjects.some(s=>s.testDone)) earned.push(["🏅","Primeiro Passo"]);
  if(chats.length>=2) earned.push(["🔥","Persistente"]);
  if(subjects.length>=3) earned.push(["🧭","Explorador"]);
  if(subjects.some(s=>s.level>=5)) earned.push(["🎯","Desafiante"]);
  const base=[["🏅","Primeiro Passo"],["🔥","Persistente"],["🧭","Explorador"],["🎯","Desafiante"]];
  $("medals").innerHTML=base.map(m=>{
    const ok=earned.some(e=>e[1]===m[1]);
    return `<div class="medal ${ok?"":"locked"}">${ok?m[0]:"🔒"}<span>${m[1]}</span></div>`;
  }).join("");
}

function renderAll(){
  renderGeneralProgress(); renderMedals(); renderHomeSubjects(); renderChart(); renderSubjectsPage(); renderGlobalChats();
}

function subjectCardHTML(s){
  return `<div class="subject-icon">${s.icon}</div>
          <h3>${s.name}</h3>
          <p class="muted">${s.testDone?`Nível ${s.level}/10`:"Mini teste pendente"}</p>
          <div class="subject-progress"><div style="width:${s.testDone?s.level*10:0}%"></div></div>`;
}

function renderHomeSubjects(){
  const c=$("home-subjects"); c.innerHTML="";
  if(!subjects.length){
    c.innerHTML='<div class="empty">📘<h3>Nenhuma matéria adicionada</h3><p>Adicione sua primeira matéria para começar.</p></div>';
    return;
  }
  subjects.forEach(s=>{
    const el=document.createElement("div"); el.className="subject-card"; el.innerHTML=subjectCardHTML(s);
    el.onclick=()=>openSubject(s.id); c.appendChild(el);
  });
}

function renderSubjectsPage(){
  const c=$("subjects-page-list"); if(!c) return; c.innerHTML="";
  if(!subjects.length){c.innerHTML='<div class="empty">Nenhuma matéria adicionada.</div>';return;}
  subjects.forEach(s=>{
    const el=document.createElement("div"); el.className="subject-list-item";
    el.innerHTML=`<div class="subject-list-left"><div class="icon">${s.icon}</div><div><strong>${s.name}</strong><p class="muted">${s.testDone?`Nível ${s.level}/10`:"Faça o mini teste inicial"}</p></div></div><span>›</span>`;
    el.onclick=()=>openSubject(s.id); c.appendChild(el);
  });
}

function renderChart(){
  const c=$("chart"); c.innerHTML="";
  const tested=subjects.filter(s=>s.testDone);
  if(!tested.length){c.innerHTML='<p class="muted">Faça mini testes para acompanhar sua evolução.</p>';return;}
  tested.forEach(s=>c.innerHTML+=`<div class="chart-row"><div class="chart-info"><span>${s.name}</span><span>${s.level}/10</span></div><div class="chart-bar"><div style="width:${s.level*10}%"></div></div></div>`);
}

function openAddSubject(){ $("subject-modal").classList.add("active"); }
$("add-subject-home").onclick=openAddSubject;
$("add-subject-page").onclick=openAddSubject;
$("close-subject-modal").onclick=()=>$("subject-modal").classList.remove("active");

document.querySelectorAll(".subject-options button").forEach(b=>b.onclick=()=>{
  addSubject(b.dataset.subject,b.dataset.icon);
});
$("add-custom-subject").onclick=()=>{
  const name=$("custom-subject-name").value.trim();
  if(!name){alert("Digite o nome da matéria.");return;}
  addSubject(name,"📘"); $("custom-subject-name").value="";
};

function addSubject(name,icon){
  if(subjects.some(s=>s.name.toLowerCase()===name.toLowerCase())){alert("Essa matéria já foi adicionada.");return;}
  const s={id:Date.now(),name,icon,level:0,testDone:false,topics:{}};
  subjects.push(s); saveSubjects(); $("subject-modal").classList.remove("active"); renderAll();
  openSubject(s.id);
}

function openSubject(id){
  activeSubject=subjects.find(s=>s.id===id); if(!activeSubject) return;
  $("folder-icon").textContent=activeSubject.icon;
  $("folder-title").textContent=activeSubject.name;
  $("folder-level").textContent=activeSubject.testDone?`Nível ${activeSubject.level}/10`:"Ainda sem nível • faça o mini teste";
  $("first-test-banner").classList.toggle("hidden",activeSubject.testDone);
  renderSubjectChats();
  $("topic-performance").innerHTML=activeSubject.testDone
    ? `Nível atual: <strong>${activeSubject.level}/10</strong><br><span class="muted">Continue estudando e fazendo testes para evoluir.</span>`
    : "Faça o mini teste para começar a medir seu nível.";
  showView("subject-folder");
}

$("back-from-folder").onclick=()=>showView("subjects");
$("start-mini-test").onclick=startMiniTest;
$("back-from-test").onclick=()=>openSubject(activeSubject.id);

function getAge(){
  const y=user.birthYear || Number((user.birthDate||"").split("/")[2]);
  return y ? new Date().getFullYear()-y : null;
}

function startMiniTest(){
  const questions=(TEST_BANK[activeSubject.name]||TEST_BANK.default).map(q=>({...q}));
  testState={questions,index:0,answers:Array(questions.length).fill(null)};
  $("test-title").textContent=`Mini teste • ${activeSubject.name}`;
  const age=getAge();
  $("test-age-info").textContent=age?`Perguntas adaptadas para sua idade (${age} anos).`:"Perguntas adaptadas ao seu perfil.";
  renderQuestion(); showView("test");
}

function renderQuestion(){
  const i=testState.index, q=testState.questions[i];
  $("question-counter").textContent=`Pergunta ${i+1} de ${testState.questions.length}`;
  $("test-progress").style.width=`${((i+1)/testState.questions.length)*100}%`;
  $("question-topic").textContent=q.topic;
  $("question-text").textContent=q.q;
  $("answers").innerHTML="";
  q.a.forEach((txt,idx)=>{
    const b=document.createElement("button"); b.className="answer"+(testState.answers[i]===idx?" selected":"");
    b.textContent=txt; b.onclick=()=>{testState.answers[i]=idx;renderQuestion()}; $("answers").appendChild(b);
  });
  $("prev-question").style.visibility=i===0?"hidden":"visible";
  $("next-question").textContent=i===testState.questions.length-1?"Finalizar teste":"Próxima";
}
$("prev-question").onclick=()=>{if(testState.index>0){testState.index--;renderQuestion()}};
$("next-question").onclick=()=>{
  if(testState.answers[testState.index]===null){alert("Escolha uma resposta antes de continuar.");return;}
  if(testState.index<testState.questions.length-1){testState.index++;renderQuestion();return;}
  finishTest();
};

function finishTest(){
  let correct=0; const topicStats={};
  testState.questions.forEach((q,i)=>{
    if(!topicStats[q.topic]) topicStats[q.topic]={ok:0,total:0};
    topicStats[q.topic].total++;
    if(testState.answers[i]===q.correct){correct++;topicStats[q.topic].ok++}
  });
  const pct=Math.round(correct/testState.questions.length*100);
  const level=Math.max(1,Math.min(10,Math.round(pct/10)));
  const xpGain=40+correct*15;
  activeSubject.level=level; activeSubject.testDone=true; activeSubject.topics=topicStats;
  user.xp+=xpGain; saveSubjects(); saveUser();

  $("result-score").textContent=pct+"%";
  $("result-title").textContent=`Resultado • ${activeSubject.name}`;
  $("result-summary").textContent=`Você acertou ${correct} de ${testState.questions.length} perguntas.`;
  $("result-level").textContent=level+"/10";
  $("result-xp").textContent="+"+xpGain+" XP";

  const diffs=Object.entries(topicStats).map(([topic,v])=>({topic,pct:Math.round(v.ok/v.total*100)})).sort((a,b)=>a.pct-b.pct).slice(0,3);
  $("difficulties-list").innerHTML=diffs.map((d,i)=>`<div class="difficulty-item"><strong>${i+1}ª dificuldade: ${d.topic}</strong><span>${d.pct}% de acertos neste assunto</span></div>`).join("");
  renderAll(); showView("result");
}
$("finish-result").onclick=()=>openSubject(activeSubject.id);

function renderSubjectChats(){
  const c=$("subject-chats"); c.innerHTML="";
  const list=chats.filter(ch=>ch.subjectId===activeSubject.id);
  if(!list.length){c.innerHTML='<p class="muted">Nenhuma conversa ainda. Crie a primeira.</p>';return;}
  list.slice().reverse().forEach(ch=>{
    const el=document.createElement("div");el.className="chat-item";
    el.innerHTML=`<strong>${ch.title}</strong><small>${ch.messages.length} mensagens</small>`;
    el.onclick=()=>openChat(ch.id);c.appendChild(el);
  });
}
function renderGlobalChats(){
  const c=$("global-chats"); if(!c)return;c.innerHTML="";
  if(!chats.length){c.innerHTML='<div class="empty">Você ainda não tem conversas.</div>';return;}
  chats.slice().reverse().forEach(ch=>{
    const s=subjects.find(x=>x.id===ch.subjectId);
    const el=document.createElement("div");el.className="chat-item";
    el.innerHTML=`<strong>${s?s.icon:"📘"} ${s?s.name:"Matéria"} • ${ch.title}</strong><small>${ch.messages.length} mensagens</small>`;
    el.onclick=()=>{activeSubject=s;openChat(ch.id)};c.appendChild(el);
  });
}

function createChat(){
  const title=prompt("Qual será o assunto desta conversa?","Nova conversa")||"Nova conversa";
  const ch={id:Date.now(),subjectId:activeSubject.id,title,messages:[
    {from:"ai",text:`Olá, ${user.name}! Vamos estudar ${title} em ${activeSubject.name}. O que você gostaria de entender primeiro?`}
  ]};
  chats.push(ch);saveChats();openChat(ch.id);
}
$("new-chat").onclick=createChat;$("new-chat-small").onclick=createChat;
$("continue-chat").onclick=()=>{
  const list=chats.filter(ch=>ch.subjectId===activeSubject.id);
  if(!list.length){createChat();return;}
  openChat(list[list.length-1].id);
};

function openChat(id){
  activeChat=chats.find(ch=>ch.id===id); if(!activeChat)return;
  $("chat-title").textContent=`${activeSubject.name} • ${activeChat.title}`;
  $("chat-subtitle").textContent=activeSubject.testDone?`Nível ${activeSubject.level}/10 • explicação adaptada ao seu nível`:"Professor Learn Way";
  renderMessages();showView("chat");
}
function renderMessages(){
  $("messages").innerHTML="";
  activeChat.messages.forEach(m=>{
    const el=document.createElement("div");el.className="message "+m.from;el.textContent=m.text;$("messages").appendChild(el);
  });
  $("messages").scrollTop=$("messages").scrollHeight;
}
$("send-message").onclick=sendMessage;
$("message-input").addEventListener("keydown",e=>{if(e.key==="Enter")sendMessage()});
function sendMessage(){
  const text=$("message-input").value.trim();if(!text)return;
  activeChat.messages.push({from:"user",text});
  activeChat.messages.push({from:"ai",text:"Nesta versão Demo eu já consigo organizar a conversa, mas a IA real será conectada depois. Por enquanto, este chat serve para testar o fluxo e o visual."});
  $("message-input").value="";saveChats();renderMessages();renderSubjectChats();
}
$("back-from-chat").onclick=()=>openSubject(activeSubject.id);

$("show-levels").onclick=()=>{
  $("levels-list").innerHTML=LEVELS.map((l,i)=>`<div class="level-item"><strong>${i+1}. ${l.name}</strong><span>Desbloqueia a partir de ${l.xp} XP</span></div>`).join("");
  $("levels-modal").classList.add("active");
};
$("close-levels").onclick=()=>$("levels-modal").classList.remove("active");

document.querySelectorAll(".demo-only").forEach(b=>b.addEventListener("click",()=>$("demo-modal").classList.add("active")));
$("close-demo").onclick=()=>$("demo-modal").classList.remove("active");

$("reset-button").onclick=()=>{
  if(confirm("Apagar os dados desta versão Demo e começar de novo?")){
    localStorage.removeItem("learnWayUser");localStorage.removeItem("learnWaySubjects");localStorage.removeItem("learnWayChats");location.reload();
  }
};
