  // Header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hero terminal typing sequence
  const lines = [
    { p: true, text: "sudo apt install conocimiento" },
    { p: false, text: "Leyendo listas de temas... 5 encontrados" },
    { p: false, text: "[Linux] [Kali] [Telefonía] [Redes] [Programación]" },
    { p: true, text: "netfly --iniciar-curso Linux" },
    { p: false, text: "Cargando 'Fundamentos de Linux desde cero'..." },
    { p: false, text: "Progreso guardado automáticamente ✔" },
  ];
  const body = document.getElementById('terminalBody');
  let li = 0, ci = 0;

  function typeLine() {
    if (li >= lines.length) { setTimeout(() => { body.innerHTML=''; li=0; ci=0; typeLine(); }, 1800); return; }
    const current = lines[li];
    if (ci === 0) {
      const div = document.createElement('div');
      div.className = 'line';
      div.innerHTML = (current.p ? '<span class="prompt">$</span> ' : '<span class="out">→</span> ') + '<span class="typed"></span>';
      body.appendChild(div);
    }
    const div = body.lastChild.querySelector('.typed');
    if (ci < current.text.length) {
      div.textContent += current.text[ci];
      ci++;
      setTimeout(typeLine, 22 + Math.random()*28);
    } else {
      li++; ci = 0;
      setTimeout(typeLine, 500);
    }
  }
  typeLine();

  // Chatbot widget
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatNavLink = document.getElementById('chatNavLink');

  function openChat(){ panel.classList.add('open'); chatInput.focus(); }
  toggle.addEventListener('click', () => panel.classList.toggle('open'));
  chatNavLink.addEventListener('click', (e)=>{ e.preventDefault(); openChat(); });

  const canned = [
    { k: ['linux'], r: "Tenemos 5 cursos de Linux, desde fundamentos hasta hacking ético. Te recomiendo empezar por 'Fundamentos de Linux desde cero'." },
    { k: ['kali'], r: "Para Kali te recomiendo 'Introducción a Kali Linux' y luego 'Pentesting con Kali'. Ambos están en el catálogo bajo demanda." },
    { k: ['red', 'redes'], r: "En Redes puedes empezar con 'Modelo OSI explicado' antes de pasar a subnetting y firewalls." },
    { k: ['telefon'], r: "Para telefonía, 'Fundamentos de telefonía IP' es el mejor punto de partida antes de Asterisk." },
    { k: ['program', 'python', 'javascript'], r: "En Programación tenemos Python, Java, Bash y JavaScript. ¿Con cuál te gustaría comenzar?" },
    { k: ['premium', 'precio', 'plan'], r: "El plan Premium cuesta $9.99/mes e incluye videoconferencias, en vivo ilimitado y este asistente 24/7." },
    { k: ['vivo', 'transmision', 'live'], r: "Hoy tenemos transmisiones en vivo a las 18:00 y 20:30. Revisa la sección 'En vivo' para el horario completo." },
  ];

  function botReply(text){
    const lower = text.toLowerCase();
    const hit = canned.find(c => c.k.some(k => lower.includes(k)));
    return hit ? hit.r : "Puedo ayudarte con cursos de Linux, Kali, Redes, Telefonía o Programación, o contarte del plan Premium. ¿Sobre cuál quieres saber más?";
  }

  function addBubble(text, who){
    const div = document.createElement('div');
    div.className = 'bubble ' + who;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendMessage(){
    const val = chatInput.value.trim();
    if (!val) return;
    addBubble(val, 'user');
    chatInput.value = '';
    setTimeout(() => addBubble(botReply(val), 'bot'), 500);
  }
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });