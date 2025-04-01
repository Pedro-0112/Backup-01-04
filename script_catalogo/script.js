document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('aviso-overlay');
  const btnFechar = document.getElementById('btn-fechar');
  const btnOk = document.getElementById('btn-ok');
  
  // Verifica se o aviso foi fechado e se já passou 1 mês
  const avisoFechadoData = localStorage.getItem('avisoTransferenciaFechadoData');
  
  if (avisoFechadoData) {
      const dataFechamento = new Date(avisoFechadoData);
      const dataAtual = new Date();
      const umMesEmMs = 30 * 24 * 60 * 60 * 1000; // ~1 mês em milissegundos
      
      // Se ainda não passou 1 mês, esconde o aviso
      if (dataAtual - dataFechamento < umMesEmMs) {
          overlay.style.display = 'none';
      }
  }
  
  // Fecha o aviso e armazena a data atual no localStorage
  function fecharAviso() {
      overlay.style.display = 'none';
      localStorage.setItem('avisoTransferenciaFechadoData', new Date().toISOString());
  }
  
  // Event listeners para os botões
  btnOk.addEventListener('click', fecharAviso);
  btnFechar.addEventListener('click', fecharAviso);
});


//Periodo

const headerHeight = document.querySelector('header').offsetHeight;
const sections = document.querySelectorAll('section');

// Função para fazer o scroll suave usando requestAnimationFrame
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Função de easing (aceleração/desaceleração suave)
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Manipulador de clique nos links de navegação
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      sections.forEach(section => {
        section.style.display = 'none';
        section.style.opacity = '0';
        section.style.transform = 'translateY(0px)'; // Efeito de deslocamento
        section.style.transition = 'opacity 1.5s ease, transform 1s ease';
      });

      // Exibe o elemento alvo com animação
      targetElement.style.display = 'block';

      requestAnimationFrame(() => {
        setTimeout(() => {
          const isMobile = window.innerWidth <= 860; // Verificação de mobile
          const extraOffset = isMobile ? 230 : 100; // Offset dinâmico
          const rect = targetElement.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY - headerHeight - extraOffset;

          console.log("OffsetTop: ", offsetTop); // Verifique se o valor está correto

          // Animação suave de scroll personalizada
          smoothScrollTo(offsetTop, 200); // Duração em milissegundos (200ms)

          // Animação de exibição suave
          targetElement.style.opacity = '1';
          targetElement.style.transform = 'translateY(0)';
        }, 50);
      });
    }
  });
});

// Adicionando a classe ativa aos links de navegação
document.querySelectorAll('.link-ancora').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.link-ancora').forEach(l => l.classList.remove('ativo'));
    this.classList.add('ativo');
  });
});

// Adicionando a classe ativa aos links sem scroll
document.querySelectorAll('.no-scroll').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.no-scroll').forEach(l => l.classList.remove('ativo'));
    this.classList.add('ativo');
  });
});

    

// Botão
// Mostra ou esconde o botão "Voltar ao Topo" ao rolar a página
window.onscroll = function () {
  const backToTopButton = document.getElementById("back-to-top");
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      backToTopButton.style.display = "block"; // Mostra o botão
      setTimeout(() => {
          backToTopButton.classList.add("show"); // Adiciona a classe para a animação
      }, 10); // Pequeno delay para garantir que o display: block seja aplicado antes da animação
  } else {
      backToTopButton.classList.remove("show"); // Remove a classe para esconder com animação
      setTimeout(() => {
          backToTopButton.style.display = "none"; // Esconde o botão após a animação
      }, 200); // Tempo correspondente à duração da transição
  }
};

// Leva o usuário de volta ao topo ao clicar no botão
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    // Evento de clique e toque para suportar celular
    backToTopButton.addEventListener("click", scrollToTop);
    backToTopButton.addEventListener("touchstart", scrollToTop);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll suave
    });
  }
});

   // JavaScript para alternar a visibilidade do menu suspenso
   const toggle = document.getElementById("ano-toggle");
   const conteudo = document.getElementById("ano-conteudo");

   toggle.addEventListener("click", function () {
     // Alterna a visibilidade do conteúdo
     conteudo.classList.toggle("visivel");

     // Alterna a classe "ativo" para mudar o ícone
     toggle.classList.toggle("ativo");
   });

   // Fechar o menu ao clicar fora dele
   document.addEventListener("click", function (event) {
     if (event.target !== toggle && !conteudo.contains(event.target)) {
       conteudo.classList.remove("visivel");
       toggle.classList.remove("ativo");
     }
   });

   // Atualizar o texto do botão com o ano selecionado
   const links = document.querySelectorAll("#ano-conteudo ul li a");
   links.forEach(link => {
     link.addEventListener("click", function (event) {
       event.preventDefault(); // Evita o comportamento padrão do link

       // Obtém o texto do ano clicado
       const anoSelecionado = link.textContent;

       // Atualiza o texto do botão "Ano"
       toggle.textContent = anoSelecionado;

       // Fecha o menu suspenso
       conteudo.classList.remove("visivel");
       toggle.classList.remove("ativo");

       // Adiciona a classe "ativo" ao link clicado
       links.forEach(l => l.classList.remove("ativo"));
       link.classList.add("ativo");
     });
   });

   //Cursos abaixo:

   // Array com informações completas sobre cada curso
const cursos = [
  { id: '1D', nome: "ADMINISTRAÇÃO (Presencial)", url: "administracao.html" },
  { id: '2D', nome: "ARQUITETURA E URBANISMO", url: "arquitetura.html" },
  { id: '3D', nome: "CIÊNCIAS BIÓLOGICAS", url: "ciencias-biologicas.html" },
  { id: '4D', nome: "CIÊNCIAS CONTÁBEIS (Presencial)", url: "ciencias-contabeis.html" },
  { id: '5D', nome: "DIREITO", url: "direito.html" },
  { id: '6D', nome: "EDUCAÇÃO FÍSICA", url: "educacao-fisica.html" },
  { id: '7D', nome: "ENFERMAGEM", url: "enfermagem.html" },
  { id: '8D', nome: "ENGENHARIA AMBIENTAL", url: "engenharia-ambiental.html" },
  { id: '9D', nome: "ENGENHARIA CIVIL", url: "engenharia-civil.html" },
  { id: '10D', nome: "ENGENHARIA DE PRODUÇÃO", url: "engenharia-producao.html" },
  { id: '11D', nome: "GESTÃO DE RECURSOS HUMANOS", url: "gestao-rh.html" },
  { id: '12D', nome: "MEDICINA VETENINÁRIA", url: "medicina-veterinaria.html" },
  { id: '13D', nome: "PEDAGOGIA", url: "pedagogia.html" },
  { id: '14D', nome: "PSICOLOGIA", url: "psicologia.html" },
  { id: '15D', nome: "FARMÁCIA GENERALISTA", url: "farmacia.html" },
  { id: '16D', nome: "AGRONOMIA", url: "agronomia.html" }
];

// Configura todos os eventos de clique
document.addEventListener('DOMContentLoaded', function() {
  cursos.forEach(curso => {
      const elementoCurso = document.getElementById(curso.id);
      if (elementoCurso) {
          elementoCurso.addEventListener('click', function(e) {
              e.preventDefault(); // Previne o comportamento padrão do link
              
              // Adiciona efeito visual ao clicar
              this.classList.add('curso-clicado');
              setTimeout(() => {
                  this.classList.remove('curso-clicado');
              }, 300);
              
              // Redireciona para a página do curso após um breve delay
              setTimeout(() => {
                  window.location.href = curso.url;
              }, 300);
              
              // Opcional: Registrar no console qual curso foi selecionado
              console.log(`Curso selecionado: ${curso.nome}`);
          });
      } else {
          console.warn(`Elemento com ID ${curso.id} não encontrado!`);
      }
  });
});

// Opcional: Adicionar efeito de hover via JavaScript
document.addEventListener('DOMContentLoaded', function() {
  cursos.forEach(curso => {
      const elemento = document.getElementById(curso.id);
      if (elemento) {
          elemento.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-3px)';
              this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          });
          elemento.addEventListener('mouseleave', function() {
              this.style.transform = '';
              this.style.boxShadow = '';
          });
      }
  });
});   