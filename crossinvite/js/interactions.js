const envelope=document.querySelector('#envelope');
const openBtn=document.querySelector('#openBtn');
let opened=false;
function openLetter(){
  if(opened)return;
  opened=true;
  envelope.classList.add('open');
  setTimeout(()=>document.querySelector('#invite')?.scrollIntoView({behavior:'smooth'}),650);
}
openBtn?.addEventListener('click',openLetter);
envelope?.addEventListener('click',openLetter);
envelope?.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();openLetter();}
});
