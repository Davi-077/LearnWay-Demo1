
const $ = id => document.getElementById(id);
const views = document.querySelectorAll(".view");

const LEVELS = [
  {name:"Aprendiz", xp:1000},
  {name:"Iniciante", xp:3000},
  {name:"Explorador", xp:6000},
  {name:"Curioso", xp:10000},
  {name:"Aluno", xp:16000},
  {name:"Dedicado", xp:25000},
  {name:"Esperto", xp:40000},
  {name:"Inteligente", xp:65000},
  {name:"Mini Gênio", xp:100000},
  {name:"Gênio", xp:150000}
];

const TEST_BANK = {
  "Matemática":[
    {topic:"Operações e cálculo",difficulty:1,q:"Quanto é 18 × 7?",a:["116","126","136","146"],correct:1},
    {topic:"Operações e cálculo",difficulty:2,q:"Quanto é 864 ÷ 24?",a:["32","34","36","38"],correct:2},
    {topic:"Operações e cálculo",difficulty:3,q:"Calcule: 48 - 3 × (7 + 5).",a:["12","18","24","36"],correct:0},

    {topic:"Frações e decimais",difficulty:1,q:"Qual é o resultado de 3/4 + 1/8?",a:["4/12","5/8","7/8","1"],correct:2},
    {topic:"Frações e decimais",difficulty:2,q:"Qual é o resultado de 2,4 × 0,35?",a:["0,74","0,84","8,4","84"],correct:1},
    {topic:"Frações e decimais",difficulty:3,q:"Se 5/6 de um número é 45, qual é esse número?",a:["50","52","54","56"],correct:2},

    {topic:"Álgebra e equações",difficulty:1,q:"Resolva: 3x + 7 = 28.",a:["5","6","7","8"],correct:2},
    {topic:"Álgebra e equações",difficulty:2,q:"Resolva: 4(x - 2) = 2x + 10.",a:["7","8","9","10"],correct:2},
    {topic:"Álgebra e equações",difficulty:3,q:"A soma de um número com seu dobro é 57. Qual é o número?",a:["17","18","19","20"],correct:2},

    {topic:"Razão, proporção e porcentagem",difficulty:1,q:"Um produto de R$ 240 teve desconto de 15%. Qual é o valor do desconto?",a:["R$ 24","R$ 30","R$ 36","R$ 40"],correct:2},
    {topic:"Razão, proporção e porcentagem",difficulty:2,q:"Se 5 cadernos custam R$ 42,50, quanto custam 8 cadernos ao mesmo preço unitário?",a:["R$ 64","R$ 66","R$ 68","R$ 72"],correct:2},
    {topic:"Razão, proporção e porcentagem",difficulty:3,q:"Uma quantidade aumenta 20% e depois diminui 20%. Em relação ao valor inicial, o resultado fica:",a:["igual","4% menor","4% maior","20% menor"],correct:1},

    {topic:"Geometria",difficulty:1,q:"Um retângulo mede 12 cm por 7 cm. Qual é sua área?",a:["38 cm²","72 cm²","84 cm²","96 cm²"],correct:2},
    {topic:"Geometria",difficulty:2,q:"Um triângulo tem base 14 cm e altura 9 cm. Qual é sua área?",a:["63 cm²","84 cm²","126 cm²","46 cm²"],correct:0},
    {topic:"Geometria",difficulty:3,q:"A soma dos ângulos internos de um pentágono é:",a:["360°","450°","540°","720°"],correct:2}
  ],

  "Português":[
    {topic:"Interpretação de texto",difficulty:1,q:"Na frase 'Embora estivesse cansado, continuou estudando', a palavra 'embora' indica:",a:["causa","concessão","conclusão","tempo"],correct:1},
    {topic:"Interpretação de texto",difficulty:2,q:"Quando um texto apresenta argumentos para convencer o leitor, sua finalidade predominante é:",a:["narrar","descrever","persuadir","instruir"],correct:2},
    {topic:"Interpretação de texto",difficulty:3,q:"Em 'A cidade acordou nervosa naquela manhã', ocorre principalmente:",a:["hipérbole","personificação","ironia","eufemismo"],correct:1},

    {topic:"Gramática",difficulty:1,q:"Em 'Os alunos chegaram cedo', o sujeito é:",a:["cedo","chegaram","os alunos","alunos chegaram"],correct:2},
    {topic:"Gramática",difficulty:2,q:"Em 'Precisa-se de voluntários', o sujeito é:",a:["oculto","simples","indeterminado","composto"],correct:2},
    {topic:"Gramática",difficulty:3,q:"Em 'Quando cheguei, eles já haviam saído', 'haviam saído' está no:",a:["pretérito perfeito","pretérito mais-que-perfeito composto","futuro do pretérito","presente perfeito"],correct:1},

    {topic:"Ortografia e pontuação",difficulty:1,q:"Qual palavra está escrita corretamente?",a:["excessão","exceção","ecessão","excesssão"],correct:1},
    {topic:"Ortografia e pontuação",difficulty:2,q:"Qual frase está pontuada corretamente?",a:["Davi disse vamos estudar.","Davi, disse: vamos estudar.","Davi disse: “Vamos estudar.”","Davi disse “Vamos, estudar”."],correct:2},
    {topic:"Ortografia e pontuação",difficulty:3,q:"Assinale a alternativa em que o uso da crase está correto:",a:["Vou à escola.","Entreguei à ele.","Cheguei à pé.","Fui à estudar."],correct:0},

    {topic:"Classes e funções das palavras",difficulty:1,q:"Na frase 'Ela falou rapidamente', 'rapidamente' é:",a:["substantivo","adjetivo","advérbio","pronome"],correct:2},
    {topic:"Classes e funções das palavras",difficulty:2,q:"Em 'O livro que comprei é ótimo', a palavra 'que' funciona como:",a:["conjunção coordenativa","pronome relativo","preposição","interjeição"],correct:1},
    {topic:"Classes e funções das palavras",difficulty:3,q:"Em 'Tenho necessidade de ajuda', 'de ajuda' exerce função de:",a:["adjunto adverbial","complemento nominal","aposto","vocativo"],correct:1},

    {topic:"Coesão e sentido",difficulty:1,q:"Qual conectivo indica conclusão?",a:["porém","porque","portanto","embora"],correct:2},
    {topic:"Coesão e sentido",difficulty:2,q:"Qual opção evita repetição e mantém a coesão? 'Ana comprou o livro. Ana leu o livro.'",a:["Ana comprou o livro. Ela o leu.","Ana comprou o livro. Ana ele leu.","Ana comprou o livro, livro leu.","Ana o livro comprou e Ana leu."],correct:0},
    {topic:"Coesão e sentido",difficulty:3,q:"Em 'Ele estudou muito; contudo, não se sentiu seguro', 'contudo' expressa:",a:["adição","oposição","explicação","finalidade"],correct:1}
  ],

  "Inglês":[
    {topic:"Vocabulary",difficulty:1,q:"What is the best meaning of 'although'?",a:["because","however/even though","before","therefore"],correct:1},
    {topic:"Vocabulary",difficulty:2,q:"Choose the closest meaning of 'improve'.",a:["get better","get smaller","forget","repeat"],correct:0},
    {topic:"Vocabulary",difficulty:3,q:"In 'The task was challenging', 'challenging' means:",a:["very easy","difficult but interesting","impossible","boring"],correct:1},

    {topic:"Grammar",difficulty:1,q:"Choose the correct sentence.",a:["She go to school every day.","She goes to school every day.","She going to school every day.","She gone to school every day."],correct:1},
    {topic:"Grammar",difficulty:2,q:"Complete: 'I ____ this movie last week.'",a:["see","saw","seen","seeing"],correct:1},
    {topic:"Grammar",difficulty:3,q:"Complete: 'If I had more time, I ____ another language.'",a:["learn","will learn","would learn","learned"],correct:2},

    {topic:"Reading",difficulty:1,q:"Read: 'Tom missed the bus, so he walked to school.' Why did Tom walk?",a:["He likes walking.","He missed the bus.","School was closed.","He lost his shoes."],correct:1},
    {topic:"Reading",difficulty:2,q:"Read: 'Mia had studied for weeks. When the test began, she felt calm.' What can we infer?",a:["She had not prepared.","Preparation made her confident.","She hated the subject.","The test was cancelled."],correct:1},
    {topic:"Reading",difficulty:3,q:"In a text, the phrase 'on the other hand' usually introduces:",a:["a contrast","a cause","a date","a definition"],correct:0},

    {topic:"Sentence building",difficulty:1,q:"Choose the correct order:",a:["Always I breakfast eat.","I always eat breakfast.","I eat always breakfast.","Breakfast I always eat."],correct:1},
    {topic:"Sentence building",difficulty:2,q:"Choose the best sentence:",a:["How long you live here?","How long have you lived here?","How long did you lived here?","How long are you live here?"],correct:1},
    {topic:"Sentence building",difficulty:3,q:"Which sentence is correct?",a:["Despite he was tired, he studied.","Although being tired, but he studied.","Although he was tired, he studied.","He studied although but tired."],correct:2},

    {topic:"Language use",difficulty:1,q:"Someone says 'Thank you.' A natural response is:",a:["You're welcome.","Never mind me.","I am agree.","See you yesterday."],correct:0},
    {topic:"Language use",difficulty:2,q:"Which is more polite when asking for help?",a:["Help me.","You help me now.","Could you help me, please?","Helping me."],correct:2},
    {topic:"Language use",difficulty:3,q:"Which sentence best fits a formal email?",a:["Hey dude, send it.","Could you please send me the document?","Gimme the file.","Send that thing ASAP."],correct:1}
  ],

  "Geografia":[
    {topic:"Cartografia",difficulty:1,q:"Em um mapa, a escala indica:",a:["o clima","a relação entre distância no mapa e distância real","a população","a altitude apenas"],correct:1},
    {topic:"Cartografia",difficulty:2,q:"As linhas imaginárias que medem a distância a leste ou oeste de Greenwich são:",a:["latitudes","longitudes","paralelos apenas","trópicos"],correct:1},
    {topic:"Cartografia",difficulty:3,q:"Em uma escala 1:100.000, 1 cm no mapa corresponde a:",a:["100 m","500 m","1 km","10 km"],correct:2},

    {topic:"Geografia física",difficulty:1,q:"Qual processo transforma vapor de água em gotículas?",a:["evaporação","condensação","infiltração","sublimação"],correct:1},
    {topic:"Geografia física",difficulty:2,q:"Qual fator influencia fortemente a temperatura média de um lugar?",a:["latitude","idioma","moeda","fuso apenas"],correct:0},
    {topic:"Geografia física",difficulty:3,q:"O encontro de placas tectônicas pode provocar principalmente:",a:["marés","terremotos e vulcanismo","eclipses","chuvas de granizo"],correct:1},

    {topic:"População e urbanização",difficulty:1,q:"Densidade demográfica é:",a:["número total de cidades","habitantes por área","taxa de natalidade","renda média"],correct:1},
    {topic:"População e urbanização",difficulty:2,q:"Migração do campo para a cidade é chamada de:",a:["êxodo rural","imigração externa","migração pendular","transumância"],correct:0},
    {topic:"População e urbanização",difficulty:3,q:"Uma consequência comum da urbanização acelerada sem planejamento é:",a:["redução total do trânsito","desaparecimento da periferia","déficit de moradia e infraestrutura","fim da desigualdade"],correct:2},

    {topic:"Economia e globalização",difficulty:1,q:"O setor econômico ligado à agricultura é o:",a:["primário","secundário","terciário","quaternário"],correct:0},
    {topic:"Economia e globalização",difficulty:2,q:"Globalização envolve principalmente:",a:["isolamento dos países","maior integração econômica e informacional","fim do comércio","redução da comunicação"],correct:1},
    {topic:"Economia e globalização",difficulty:3,q:"Uma empresa que distribui etapas de produção por diferentes países exemplifica:",a:["autarquia","cadeia produtiva global","êxodo rural","barreira natural"],correct:1},

    {topic:"Brasil e mundo",difficulty:1,q:"Qual é a maior região brasileira em extensão territorial?",a:["Sul","Sudeste","Norte","Nordeste"],correct:2},
    {topic:"Brasil e mundo",difficulty:2,q:"O Cerrado ocupa grande parte principalmente da região:",a:["Centro-Oeste","Sul","litoral do Nordeste","extremo Norte"],correct:0},
    {topic:"Brasil e mundo",difficulty:3,q:"O Mercosul é principalmente um bloco de integração:",a:["militar","econômica regional","religiosa","linguística"],correct:1}
  ],

  "História":[
    {topic:"Antiguidade e Idade Média",difficulty:1,q:"A democracia ateniense na Antiguidade era:",a:["universal para todos","restrita a parte dos cidadãos homens livres","igual à democracia atual","controlada por reis"],correct:1},
    {topic:"Antiguidade e Idade Média",difficulty:2,q:"O feudalismo europeu se caracterizou por:",a:["forte industrialização","relações de dependência e economia agrária","capitalismo financeiro","democracia representativa"],correct:1},
    {topic:"Antiguidade e Idade Média",difficulty:3,q:"As Cruzadas contribuíram, entre outros efeitos, para:",a:["reduzir o comércio","ampliar contatos comerciais entre Oriente e Ocidente","encerrar cidades","abolir o feudalismo imediatamente"],correct:1},

    {topic:"Idade Moderna",difficulty:1,q:"O Renascimento valorizou especialmente:",a:["humanismo e cultura clássica","isolamento cultural","fim das artes","rejeição da ciência"],correct:0},
    {topic:"Idade Moderna",difficulty:2,q:"A Reforma Protestante do século XVI esteve ligada inicialmente a críticas de:",a:["Martinho Lutero","Napoleão","Sócrates","Carlos Magno"],correct:0},
    {topic:"Idade Moderna",difficulty:3,q:"O mercantilismo estava associado a:",a:["livre comércio total","forte intervenção estatal e busca de metais preciosos","fim das colônias","economia socialista"],correct:1},

    {topic:"Brasil",difficulty:1,q:"A economia açucareira colonial brasileira utilizou amplamente:",a:["trabalho assalariado industrial","trabalho escravizado","robôs","cooperativas modernas"],correct:1},
    {topic:"Brasil",difficulty:2,q:"A Independência do Brasil foi proclamada em:",a:["1789","1808","1822","1889"],correct:2},
    {topic:"Brasil",difficulty:3,q:"A Lei Áurea, de 1888, determinou:",a:["a República","o fim legal da escravidão","o voto feminino","a Constituição de 1988"],correct:1},

    {topic:"Revoluções e mundo contemporâneo",difficulty:1,q:"A Revolução Industrial começou primeiro em:",a:["Inglaterra","Brasil","Japão","México"],correct:0},
    {topic:"Revoluções e mundo contemporâneo",difficulty:2,q:"A Revolução Francesa de 1789 contestou principalmente:",a:["o absolutismo e privilégios sociais","a internet","o feudalismo japonês","a ONU"],correct:0},
    {topic:"Revoluções e mundo contemporâneo",difficulty:3,q:"Uma consequência importante da industrialização foi:",a:["desaparecimento das cidades","crescimento urbano e formação do operariado","fim do comércio","retorno ao nomadismo"],correct:1},

    {topic:"Análise histórica",difficulty:1,q:"Uma fonte histórica pode ser:",a:["apenas documento escrito","somente livro escolar","documento, objeto, imagem ou relato","apenas fotografia"],correct:2},
    {topic:"Análise histórica",difficulty:2,q:"Ao comparar duas fontes sobre o mesmo evento, é importante:",a:["aceitar a primeira","considerar autoria, contexto e finalidade","ignorar diferenças","escolher a mais curta"],correct:1},
    {topic:"Análise histórica",difficulty:3,q:"Dizer que uma sociedade deve ser entendida em seu próprio contexto evita principalmente:",a:["anacronismo","cronologia","arqueologia","cartografia"],correct:0}
  ],

  "Ciências":[
    {topic:"Biologia",difficulty:1,q:"A organela responsável principalmente pela produção de energia celular é:",a:["núcleo","mitocôndria","ribossomo","lisossomo"],correct:1},
    {topic:"Biologia",difficulty:2,q:"Na fotossíntese, as plantas utilizam principalmente:",a:["oxigênio e glicose","luz, água e dióxido de carbono","nitrogênio e sal","proteína e calor"],correct:1},
    {topic:"Biologia",difficulty:3,q:"Genes são segmentos de:",a:["proteína","DNA","lipídio","glicose"],correct:1},

    {topic:"Química",difficulty:1,q:"Uma substância com pH menor que 7 é geralmente:",a:["ácida","básica","neutra","metálica"],correct:0},
    {topic:"Química",difficulty:2,q:"Qual é uma transformação química?",a:["derreter gelo","rasgar papel","enferrujar ferro","evaporar água"],correct:2},
    {topic:"Química",difficulty:3,q:"Na tabela periódica, elementos do mesmo grupo tendem a apresentar:",a:["propriedades químicas semelhantes","mesma massa","mesmo número de nêutrons","mesmo estado físico"],correct:0},

    {topic:"Física",difficulty:1,q:"Velocidade média é calculada por:",a:["tempo ÷ distância","distância ÷ tempo","massa × volume","força ÷ massa"],correct:1},
    {topic:"Física",difficulty:2,q:"Se um carro percorre 150 km em 3 h, sua velocidade média é:",a:["30 km/h","45 km/h","50 km/h","75 km/h"],correct:2},
    {topic:"Física",difficulty:3,q:"Pela 2ª lei de Newton, força resultante é igual a:",a:["massa ÷ aceleração","massa × aceleração","velocidade × tempo","energia ÷ distância"],correct:1},

    {topic:"Terra e ambiente",difficulty:1,q:"O efeito estufa natural é importante porque:",a:["mantém a Terra em temperatura adequada à vida","causa apenas poluição","impede luz solar","elimina a atmosfera"],correct:0},
    {topic:"Terra e ambiente",difficulty:2,q:"Qual fonte é renovável?",a:["carvão mineral","petróleo","energia solar","gás natural"],correct:2},
    {topic:"Terra e ambiente",difficulty:3,q:"A eutrofização de lagos está relacionada frequentemente ao excesso de:",a:["nutrientes como nitrogênio e fósforo","oxigênio puro","sal de cozinha","areia"],correct:0},

    {topic:"Método científico",difficulty:1,q:"Uma hipótese científica deve ser:",a:["impossível de testar","testável","uma opinião sem evidências","sempre verdadeira"],correct:1},
    {topic:"Método científico",difficulty:2,q:"Em um experimento, a variável que o pesquisador altera é a:",a:["variável independente","variável dependente","constante","conclusão"],correct:0},
    {topic:"Método científico",difficulty:3,q:"Repetir um experimento ajuda principalmente a:",a:["garantir que nunca haja erro","avaliar a confiabilidade dos resultados","mudar a hipótese automaticamente","evitar medições"],correct:1}
  ],

  "Programação":[
    {topic:"Lógica",difficulty:1,q:"Um algoritmo é:",a:["uma sequência de passos para resolver um problema","um tipo de computador","apenas um aplicativo","uma senha"],correct:0},
    {topic:"Lógica",difficulty:2,q:"Se uma condição é verdadeira, qual estrutura normalmente permite executar um bloco específico?",a:["if","print","input","import"],correct:0},
    {topic:"Lógica",difficulty:3,q:"Qual expressão lógica é verdadeira se x = 8?",a:["x < 5","x == 8","x != 8","x > 10"],correct:1},

    {topic:"Variáveis e tipos",difficulty:1,q:"Em programação, uma variável serve para:",a:["guardar um valor","desligar o computador","abrir a internet","criar somente imagens"],correct:0},
    {topic:"Variáveis e tipos",difficulty:2,q:"Em Python, qual valor é do tipo inteiro (int)?",a:['"12"',"12","12.5","True"],correct:1},
    {topic:"Variáveis e tipos",difficulty:3,q:"Qual código Python transforma o texto '15' em número inteiro?",a:["str('15')","int('15')","float = '15'","number('15')"],correct:1},

    {topic:"Condicionais",difficulty:1,q:"Qual palavra inicia uma condição em Python?",a:["if","loop","repeat","case"],correct:0},
    {topic:"Condicionais",difficulty:2,q:"Se idade = 13, o que imprime? if idade >= 12: print('A') else: print('B')",a:["A","B","Nada","Erro"],correct:0},
    {topic:"Condicionais",difficulty:3,q:"Qual operador significa 'diferente de' em Python?",a:["<>","!=","==","=>"],correct:1},

    {topic:"Repetição",difficulty:1,q:"Qual estrutura repete código enquanto uma condição for verdadeira?",a:["while","if","def","input"],correct:0},
    {topic:"Repetição",difficulty:2,q:"Quantas vezes roda: for i in range(3): print(i)",a:["2","3","4","infinitas"],correct:1},
    {topic:"Repetição",difficulty:3,q:"Para encerrar imediatamente um loop em Python, usamos:",a:["stop","end","break","exitloop"],correct:2},

    {topic:"Funções",difficulty:1,q:"Em Python, qual palavra cria uma função?",a:["func","def","function","method"],correct:1},
    {topic:"Funções",difficulty:2,q:"Em def soma(a,b): return a+b, a e b são:",a:["bibliotecas","parâmetros","loops","classes"],correct:1},
    {topic:"Funções",difficulty:3,q:"Qual é a principal vantagem de usar funções?",a:["evitar qualquer variável","reutilizar e organizar código","eliminar condições","deixar o programa sempre menor que 10 linhas"],correct:1}
  ],

  "Artes":[
    {topic:"Linguagem visual",difficulty:1,q:"As cores primárias tradicionais na pintura são:",a:["vermelho, amarelo e azul","verde, roxo e laranja","preto, branco e cinza","azul, verde e vermelho"],correct:0},
    {topic:"Linguagem visual",difficulty:2,q:"Perspectiva, em desenho, é usada principalmente para representar:",a:["som","profundidade e espaço","ritmo musical","textura sonora"],correct:1},
    {topic:"Linguagem visual",difficulty:3,q:"Contraste visual ocorre quando:",a:["elementos semelhantes são aproximados","diferenças marcantes são colocadas em relação","a obra não possui cores","há apenas uma forma"],correct:1},

    {topic:"História da arte",difficulty:1,q:"O Renascimento europeu valorizou fortemente:",a:["humanismo e estudo da natureza","abandono da perspectiva","arte exclusivamente abstrata","fotografia digital"],correct:0},
    {topic:"História da arte",difficulty:2,q:"Claude Monet é associado principalmente ao:",a:["Cubismo","Impressionismo","Surrealismo","Barroco"],correct:1},
    {topic:"História da arte",difficulty:3,q:"O Cubismo ficou conhecido por:",a:["representar objetos por múltiplos pontos de vista e formas geométricas","copiar apenas paisagens realistas","usar somente preto","eliminar qualquer figura"],correct:0},

    {topic:"Música",difficulty:1,q:"Ritmo em música está relacionado principalmente a:",a:["organização das durações e pulsos","cor da partitura","tamanho do instrumento","letra apenas"],correct:0},
    {topic:"Música",difficulty:2,q:"Melodia é:",a:["sequência organizada de sons e alturas","volume máximo","silêncio completo","apenas percussão"],correct:0},
    {topic:"Música",difficulty:3,q:"Quando várias notas soam simultaneamente formando acordes, tratamos principalmente de:",a:["harmonia","perspectiva","escultura","timbre visual"],correct:0},

    {topic:"Teatro e cultura",difficulty:1,q:"No teatro, o roteiro contém principalmente:",a:["falas, ações e indicações de cena","somente figurinos","apenas músicas","apenas desenhos"],correct:0},
    {topic:"Teatro e cultura",difficulty:2,q:"Cenografia é o trabalho relacionado principalmente a:",a:["espaço visual da cena","afinação musical","edição de livro","dança esportiva"],correct:0},
    {topic:"Teatro e cultura",difficulty:3,q:"Uma manifestação artística popular pode ser entendida também como:",a:["expressão cultural de um grupo ou comunidade","algo sem contexto social","apenas entretenimento comercial","um erro histórico"],correct:0},

    {topic:"Interpretação artística",difficulty:1,q:"Ao interpretar uma obra de arte, é útil considerar:",a:["contexto, elementos visuais e intenção","apenas o preço","somente o tamanho","apenas a opinião do professor"],correct:0},
    {topic:"Interpretação artística",difficulty:2,q:"Uma mesma obra pode receber interpretações diferentes porque:",a:["observadores têm repertórios e contextos diferentes","a obra muda fisicamente para cada pessoa","não existe qualquer elemento visual","toda interpretação é idêntica"],correct:0},
    {topic:"Interpretação artística",difficulty:3,q:"Analisar composição significa observar principalmente:",a:["como elementos são organizados na obra","a idade do espectador","o endereço do museu","o material escolar usado"],correct:0}
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


function renderGeneralLevelsPreview(){
  const current=currentGeneralLevel();
  const c=$("general-levels-preview");
  if(!c) return;
  c.innerHTML=LEVELS.map((l,i)=>{
    const isCurrent=current && current.name===l.name;
    const unlocked=user.xp>=l.xp;
    return `<div class="level-preview-row ${isCurrent?"current":""} ${unlocked?"":"locked"}">
      <span class="num">${i+1}</span>
      <span class="name">${l.name}</span>
      <span class="req">${l.xp.toLocaleString("pt-BR")} XP</span>
    </div>`;
  }).join("");
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
  renderGeneralProgress(); renderGeneralLevelsPreview(); renderMedals(); renderHomeSubjects(); renderChart(); renderSubjectsPage(); renderGlobalChats(); renderExamSubjects();
}

function subjectCardHTML(s){
  return `<div class="subject-icon">${s.icon}</div>
          <h3>${s.name}</h3>
          <p class="muted">${s.testDone?`Nível ${s.level}/10`:"Mini teste pendente"}</p>
          ${s.testDone?`<span class="score-percent">${s.masteryPercent ?? s.level*10}% de domínio estimado</span>`:""}
          <div class="subject-progress"><div style="width:${s.testDone?(s.masteryPercent ?? s.level*10):0}%"></div></div>`;
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
  tested.forEach(s=>{
    const percent = s.masteryPercent ?? (s.level*10);
    c.innerHTML+=`<div class="chart-row"><div class="chart-info"><span>${s.name}</span><span>${percent}%</span></div><div class="chart-bar"><div style="width:${percent}%"></div></div></div>`;
  });
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
  $("test-age-info").textContent=age?`15 questões adequadas ao seu perfil e idade (${age} anos), divididas por áreas da matéria.`:"Perguntas adaptadas ao seu perfil.";
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
  let correct=0, weightedEarned=0, weightedPossible=0;
  const topicStats={};

  testState.questions.forEach((q,i)=>{
    if(!topicStats[q.topic]) topicStats[q.topic]={ok:0,total:0,weighted:0,possible:0};
    const weight=q.difficulty || 1;
    topicStats[q.topic].total++;
    topicStats[q.topic].possible += weight;
    weightedPossible += weight;

    if(testState.answers[i]===q.correct){
      correct++;
      topicStats[q.topic].ok++;
      topicStats[q.topic].weighted += weight;
      weightedEarned += weight;
    }
  });

  const rawPercent=Math.round(correct/testState.questions.length*100);
  const masteryPercent=Math.round(weightedEarned/weightedPossible*100);

  // Nível 1–10 baseado no desempenho ponderado pela dificuldade das questões.
  // 100% em perguntas mais difíceis vale mais do que apenas acertar questões básicas.
  const level=Math.max(1,Math.min(10,Math.round(masteryPercent/10)));

  // XP do teste é propositalmente pequeno em relação aos níveis gerais.
  const xpGain=80 + correct*12;

  activeSubject.level=level;
  activeSubject.masteryPercent=masteryPercent;
  activeSubject.testDone=true;
  activeSubject.topics=topicStats;

  user.xp+=xpGain;
  saveSubjects(); saveUser();

  $("result-score").textContent=rawPercent+"%";
  $("result-title").textContent=`Resultado • ${activeSubject.name}`;
  $("result-summary").textContent=`Você acertou ${correct} de ${testState.questions.length} perguntas. Domínio estimado: ${masteryPercent}%.`;
  $("result-level").textContent=level+"/10";
  $("result-xp").textContent="+"+xpGain+" XP";

  const diffs=Object.entries(topicStats)
    .map(([topic,v])=>({topic,pct:Math.round(v.weighted/v.possible*100)}))
    .sort((a,b)=>a.pct-b.pct)
    .slice(0,3);

  $("difficulties-list").innerHTML=diffs.map((d,i)=>
    `<div class="difficulty-item"><strong>${i+1}ª maior dificuldade: ${d.topic}</strong><span>${d.pct}% de domínio estimado neste assunto</span></div>`
  ).join("");

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
  const title=prompt("Qual será o assunto deste chat com a IA?","Novo assunto")||"Novo assunto";
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
  activeChat.messages.push({from:"ai",text:"Este é o modo de demonstração do Chat IA. A conexão com a IA real será adicionada no backend antes dos testes completos com amigos."});
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


// ---------- Estudar para Prova (Demo v1.4) ----------
let examSelectedFiles=[];

function renderExamSubjects(){
  const select=$("exam-subject");
  if(!select) return;
  const current=select.value;
  select.innerHTML='<option value="">Escolha uma matéria</option>';
  subjects.forEach(s=>{
    const opt=document.createElement("option");
    opt.value=s.name;
    opt.textContent=`${s.icon || "📘"} ${s.name}`;
    select.appendChild(opt);
  });
  if([...select.options].some(o=>o.value===current)) select.value=current;
}

function formatFileSize(bytes){
  if(bytes<1024) return bytes+" B";
  if(bytes<1024*1024) return (bytes/1024).toFixed(1)+" KB";
  return (bytes/(1024*1024)).toFixed(1)+" MB";
}

function renderExamFiles(){
  const box=$("exam-files-list");
  if(!box) return;
  if(!examSelectedFiles.length){
    box.innerHTML='<div class="empty-mini">Nenhum material adicionado ainda.</div>';
    return;
  }
  box.innerHTML=examSelectedFiles.map((f,i)=>`
    <div class="file-chip">
      <span>${f.type.includes("pdf")?"📄":"🖼️"} ${f.name}</span>
      <small>${formatFileSize(f.size)}</small>
    </div>`).join("");
}

document.addEventListener("click",e=>{
  if(e.target.closest("#choose-exam-files")){
    $("exam-files")?.click();
  }
  const action=e.target.closest("[data-exam-action]");
  if(action){
    const subject=$("exam-subject")?.value;
    if(!subject){
      alert("Escolha primeiro a matéria da prova.");
      return;
    }
    if(!examSelectedFiles.length){
      alert("Adicione pelo menos uma foto, imagem ou PDF do material da prova.");
      return;
    }
    const names={
      explain:"Explicar conteúdo",
      summary:"Fazer resumo",
      questions:"Criar perguntas",
      simulation:"Fazer simulado",
      weakness:"Descobrir pontos fracos"
    };
    $("exam-demo-result")?.classList.remove("hidden");
    if($("exam-result-title")) $("exam-result-title").textContent=names[action.dataset.examAction];
    if($("exam-result-text")) $("exam-result-text").textContent=
      `Material de ${subject} preparado (${examSelectedFiles.length} arquivo${examSelectedFiles.length>1?"s":""}). Esta ação será executada pela IA quando conectarmos o backend seguro.`;
    $("exam-demo-result")?.scrollIntoView({behavior:"smooth",block:"center"});
  }
});

$("exam-files")?.addEventListener("change",e=>{
  examSelectedFiles=[...e.target.files];
  renderExamFiles();
});

