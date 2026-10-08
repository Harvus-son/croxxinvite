const { useState, useEffect, useRef } = React;

const sparkles = Array.from({length: 34}, (_, i) => ({
  id:i, left:Math.random()*100, top:Math.random()*100,
  delay:Math.random()*4, duration:3+Math.random()*5, size:1+Math.random()*3
}));

function WaxSeal({open, onClick}) {
  return <button className={`seal-button ${open ? "seal-open" : ""}`} onClick={onClick} aria-label={open ? "Закрыть свиток" : "Открыть приглашение"}>
    <span className="seal-shadow"></span>
    <span className="wax-seal">
      <span className="seal-ring"></span>
      <span className="seal-cross">✠</span>
      <span className="seal-mark">✧</span>
    </span>
    <span className="seal-caption">{open ? "Свернуть грамоту" : "Вскрыть печать"}</span>
  </button>
}

function Scroll({open}) {
  return <div className={`scroll-stage ${open ? "opened" : ""}`}>
    <div className="scroll-top"></div>
    <div className="scroll-body">
      <div className="paper-edge edge-left"></div>
      <div className="paper-content">
        <div className="letter-ornament">✠</div>
        <p className="eyebrow">Послание, скреплённое честью и печатью</p>
        <h2>Зов Святой Земли</h2>
        <div className="ornament-line"><span>❧</span><i></i><span>❧</span></div>
        <p>Во имя чести, верности и великого дела призывается доблестный воин.</p>
        <p>Тебе надлежит оставить мирские заботы и присоединиться к походу, который отправится в путь, когда прозвучит последний рог.</p>
        <div className="mission">
          <div><span>☩</span><b>Место сбора</b><em>У древних ворот замка</em></div>
          <div><span>⌛</span><b>Время</b><em>На закате, в час вечернего звона</em></div>
          <div><span>⚔</span><b>Знамя</b><em>Честь превыше страха</em></div>
        </div>
        <p className="final-line">Да пребудет с нами мужество.</p>
        <div className="signature">
          <span>✦</span><span>Скреплено печатью</span><span>✦</span>
        </div>
      </div>
      <div className="paper-edge edge-right"></div>
    </div>
    <div className="scroll-bottom"></div>
  </div>
}

function App() {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter" || e.key === " ") setOpen(v => !v);
      if (e.key.toLowerCase() === "m") setSound(v => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggle = () => {
    setOpen(v => !v);
    if (sound) {
      try {
        const ctx = audioRef.current || new (window.AudioContext || window.webkitAudioContext)();
        audioRef.current = ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = open ? 150 : 90;
        gain.gain.setValueAtTime(.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.045, ctx.currentTime+.02);
        gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime+.22);
        osc.connect(gain).connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime+.24);
      } catch {}
    }
  };

  return <main className={`scene ${open ? "invitation-open" : ""}`}>
    <div className="ambient"></div>
    <div className="moon"></div>
    <div className="particles">
      {sparkles.map(s => <i key={s.id} style={{left:s.left+"%",top:s.top+"%",width:s.size,height:s.size,animationDelay:s.delay+"s",animationDuration:s.duration+"s"}} />)}
    </div>

    <header className="topbar">
      <div className="crest">✠</div>
      <div className="topline"></div>
      <div className="order-name">ORDO <span>•</span> CRUX</div>
      <button className={`sound-toggle ${sound ? "active":""}`} onClick={()=>setSound(v=>!v)} aria-label="Звук">{sound ? "♫" : "♩"}</button>
    </header>

    <section className="hero">
      <div className="pretitle"><span></span> Письмо из королевской канцелярии <span></span></div>
      <h1><small>Печать</small> <strong>Крестоносца</strong></h1>
      <p className="subtitle">Один клик — и тайна свитка будет открыта.</p>

      <div className="scroll-wrapper">
        <Scroll open={open} />
        <div className="seal-position">
          <WaxSeal open={open} onClick={toggle} />
        </div>
      </div>

      <div className={`hint ${open ? "hidden":""}`}>
        <span className="mouse-icon"><i></i></span>
        <span>Нажмите на печать, чтобы раскрыть послание</span>
      </div>

      <div className={`open-status ${open ? "visible":""}`}>
        <span>✦</span> Послание раскрыто <span>✦</span>
      </div>
    </section>

    <footer>
      <div className="footer-line"></div>
      <span>✠ ВЕРНОСТЬ • ЧЕСТЬ • СЛАВА ✠</span>
      <div className="footer-line"></div>
    </footer>
  </main>
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);