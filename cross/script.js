// Управление состояниями приглашения и частицами.
const letter=document.querySelector(".letter");
const seal=document.querySelector(".seal");
const oath=document.querySelector(".oath-button");
const replay=document.querySelector(".replay");
const confetti=document.querySelector(".confetti");
const flash=document.querySelector(".flash");
let opened=false;

function burst(){
  for(let i=0;i<42;i++){
    const s=document.createElement("i"),a=Math.random()*Math.PI*2,d=80+Math.random()*220;
    s.textContent=Math.random()>.45?"✦":"•";
    Object.assign(s.style,{position:"fixed",left:"50%",top:"50%",zIndex:60,color:["#f0d27a","#c9a24a","#fff2b0","#7a1414"][Math.floor(Math.random()*4)],fontSize:(5+Math.random()*10)+"px"});
    document.body.appendChild(s);
    s.animate([{transform:"translate(-50%,-50%) scale(.2)",opacity:0},{transform:"translate(-50%,-50%) scale(1)",opacity:1},{transform:"translate(calc(-50% + "+Math.cos(a)*d+"px),calc(-50% + "+Math.sin(a)*d+"px)) scale(0)",opacity:0}],{duration:650+Math.random()*500,easing:"cubic-bezier(.2,.8,.2,1)"}).finished.finally(()=>s.remove());
  }
}
function openLetter(){
  if(opened)return;
  opened=true;letter.classList.remove("letter--closed");letter.classList.add("letter--opening");burst();
  setTimeout(()=>{letter.classList.remove("letter--opening");letter.classList.add("letter--open")},1200);
}
function makeConfetti(){
  const symbols=["✠","✦","❖","✧"];
  for(let i=0;i<(innerWidth<600?65:105);i++){
    const x=document.createElement("i"),side=(Math.random()-.5)*260,dur=2200+Math.random()*2800;
    x.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    Object.assign(x.style,{position:"absolute",left:Math.random()*100+"vw",top:"-12vh",color:"#f0d27a",textShadow:"0 0 12px #c9a24a",fontSize:12+Math.random()*20+"px"});
    confetti.appendChild(x);
    x.animate([{transform:"translateY(-20px) rotate(0) scale(.5)",opacity:0},{transform:"translate("+side*.35+"px,30vh) rotate(420deg) scale(1)",opacity:1},{transform:"translate("+side+"px,115vh) rotate(1100deg) scale(.65)",opacity:0}],{duration:dur,delay:Math.random()*650,easing:"cubic-bezier(.2,.7,.3,1)"}).finished.finally(()=>x.remove());
  }
}
function accept(){
  if(document.body.classList.contains("accepted"))return;
  document.body.classList.add("accepted");flash.classList.remove("active");void flash.offsetWidth;flash.classList.add("active");makeConfetti();burst();
}
function reset(){
  document.body.classList.remove("accepted");letter.classList.remove("letter--open","letter--opening");letter.classList.add("letter--closed");opened=false;
}
seal.addEventListener("click",openLetter);oath.addEventListener("click",accept);replay.addEventListener("click",reset);
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&!opened)openLetter)});