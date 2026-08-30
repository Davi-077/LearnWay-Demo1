const $=id=>document.getElementById(id);
const login=$("login-screen"),app=$("app-screen"),demo=$("demo-modal"),subjectModal=$("subject-modal");
let user=JSON.parse(localStorage.getItem("learnWayUser"));
let subjects=JSON.parse(localStorage.getItem("learnWaySubjects"))||[];

if(user) openApp();

$("start-button").onclick=()=>{
 const name=$("name").value.trim(),d=+$("day").value,m=+$("month").value,y=+$("year").value;
 if(!name||!d||!m||!y){alert("Preencha seu nome e sua data de nascimento.");return;}
 user={name,birthDate:`${d}/${m}/${y}`,xp:340,level:"Aprendiz"};
 localStorage.setItem("learnWayUser",JSON.stringify(user)); openApp();
};

function openApp(){login.classList.remove("active");app.classList.add("active");$("user-name").textContent=user.name;renderSubjects();}
document.querySelectorAll(".demo-feature").forEach(b=>b.onclick=()=>demo.classList.add("active"));
$("close-modal").onclick=()=>demo.classList.remove("active");
$("add-subject-button").onclick=()=>subjectModal.classList.add("active");
$("close-subject-modal").onclick=()=>subjectModal.classList.remove("active");

document.querySelectorAll(".subject-options button").forEach(b=>b.onclick=()=>{
 if(subjects.some(s=>s.name===b.dataset.subject)){alert("Essa matéria já foi adicionada.");return;}
 subjects.push({name:b.dataset.subject,icon:b.dataset.icon,level:1});
 localStorage.setItem("learnWaySubjects",JSON.stringify(subjects));
 renderSubjects();subjectModal.classList.remove("active");
});

function renderSubjects(){
 const c=$("subjects-container"),chart=$("subject-chart"); c.innerHTML="";chart.innerHTML="";
 if(!subjects.length){c.innerHTML='<div class="empty-subjects">📘<h3>Nenhuma matéria adicionada</h3><p>Adicione sua primeira matéria para começar.</p></div>';chart.innerHTML='<p class="demo-warning">Adicione matérias para acompanhar sua evolução.</p>';return;}
 subjects.forEach(s=>{
  const card=document.createElement("div");card.className="subject-card";
  card.innerHTML=`<div class="subject-icon">${s.icon}</div><h3>${s.name}</h3><p>Nível ${s.level}/10</p><div class="subject-progress"><div style="width:${s.level*10}%"></div></div>`;
  card.onclick=()=>demo.classList.add("active");c.appendChild(card);
  chart.innerHTML+=`<div class="chart-row"><div class="chart-info"><span>${s.name}</span><span>${s.level}/10</span></div><div class="chart-bar"><div style="width:${s.level*10}%"></div></div></div>`;
 });
}
$("reset-button").onclick=()=>{if(confirm("Deseja sair e apagar os dados desta versão Demo?")){localStorage.removeItem("learnWayUser");localStorage.removeItem("learnWaySubjects");location.reload();}};
