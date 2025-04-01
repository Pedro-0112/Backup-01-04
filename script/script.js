//TOPO
document.addEventListener('DOMContentLoaded', function() {
  const topo = document.getElementById('topoFino');
  let ultimaPosicaoRolagem = window.pageYOffset;
  const limiteRolagem = 300; // Altere para a posição em que o topo deve começar a se esconder

  window.addEventListener('scroll', function() {
    const posicaoAtual = window.pageYOffset;

    // Só ativa o comportamento após passar do limite
    if (posicaoAtual > limiteRolagem) {
      // Esconde ao rolar para baixo
      if (posicaoAtual > ultimaPosicaoRolagem) {
        topo.classList.add('escondido');
      } 
      // Mostra ao rolar para cima
      else {
        topo.classList.remove('escondido');
      }
    }
    // Se estiver acima do limite, garante que o topo está visível
    else {
      topo.classList.remove('escondido');
    }

    ultimaPosicaoRolagem = posicaoAtual;
  });
});


//Loding...

document.addEventListener("DOMContentLoaded", function() {
  // Simula um tempo de carregamento de 3 segundos
  setTimeout(function() {
    document.getElementById("loading-overlay").style.display = "none";
  }, 500);
});

//Diciplina

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todas as âncoras com links internos
    const anchors = document.querySelectorAll('.link-ancora-diciplina a');
  
    // Adiciona um evento de clique a cada âncora
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
   
  
        // Pega o destino da âncora (o valor após o #)
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          // Realiza a rolagem suave para o elemento alvo
          smoothScrollTo(targetElement);
        }
      });
    });
  
    // Função que anima a rolagem suave
    function smoothScrollTo(element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const middlePosition = targetPosition - (window.innerHeight / 3.5);  // Coloca o elemento no meio da tela
        const startPosition = window.pageYOffset;
        const distance = middlePosition - startPosition;
        const duration = 200; // Duração da animação em milissegundos
        let startTime = null;
  
      // Função de animação
      function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
  
        window.scrollTo(0, scrollY);
  
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
  
      // Função de easing (efeito de aceleração/desaceleração suave)
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
  
      requestAnimationFrame(animation);
    }
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

function mostrarEmail() {
  var email = document.getElementById("email");
  if (email.style.display === "none") {
      email.style.display = "block";
  } else {
      email.style.display = "none";
  }
}


//aqui

// Configuração dos cursos (mapeia o nome do HTML para o JSON correspondente)
const CURSOS_CONFIG = {
  'administracao': {
    nome: 'Administração',
    json: 'Json/administracao.json'
  },
  'agronomia': {
    nome: 'Agronomia',
    json: 'Json/agronomia.json'
  },
  'arquitetura': {
    nome: 'Arquitetura',
    json: 'Json/arquitetura.json'
  },
  'ciencias-biologicas': {
    nome: 'Ciencias-Biologicas',
    json: 'Json/ciencias-biologicas.json'
  },
  'ciencias-contabil': {
    nome: 'Ciencias-Contabil',
    json: 'Json/ciencias-contabil.json'
  },
  'direito': {
    nome: 'Direito',
    json: 'Json/direito.json'
  },
  'educacao-fisica': {
    nome: 'Educação-Física',
    json: 'Json/educacao-fisica.json'
  },
  'enfermagem': {
    nome: 'Enfermagem',
    json: 'Json/enfermagem.json'
  },
  'engenharia-ambiental': {
    nome: 'Engenharia-Ambiental',
    json: 'Json/engenharia-ambiental.json'
  },
  'engenharia-civil': {
    nome: 'Engenharia-Civil',
    json: 'Json/engenharia-civil.json'
  },
  'engenharia-producao': {
    nome: 'Engenharia-de-Producao',
    json: 'Json/engenharia-producao.json'
  },
  'farmacia': {
    nome: 'Farmacia',
    json: 'Json/farmacia.json'
  },
  'gestao-rh': {
    nome: 'Recursos-Humanos',
    json: 'Json/gestao-rh.json'
  },
  'medicina-veterinaria': {
    nome: 'Medicina-Veterinaria',
    json: 'Json/medicina-veterinaria.json'
  },
  'pedagogia': {
    nome: 'Pedagogia',
    json: 'Json/pedagogia.json'
  },
  'psicologia': {
    nome: 'Psicologia',
    json: 'Json/psicologia.json'
  }
};

// Detecta automaticamente qual curso está sendo visualizado
function detectarCursoAtual() {
  const path = window.location.pathname;
  const pagina = path.split('/').pop().replace('.html', '');
  return pagina in CURSOS_CONFIG ? pagina : null;
}

// Função principal que carrega os dados do curso
document.addEventListener("DOMContentLoaded", async function() {
  try {
    const cursoAtual = detectarCursoAtual();
    
    if (!cursoAtual) {
      throw new Error('Página de curso não reconhecida');
    }
    
    // Carrega os dados do curso específico
    await carregarDadosDoCurso(cursoAtual);
    
    // Adiciona event listeners para os botões de detalhes
    adicionarEventListeners();
    
  } catch (error) {
    console.error("Erro ao carregar o curso:", error);
    mostrarErro("Não foi possível carregar as disciplinas deste curso");
  }
});

async function carregarDadosDoCurso(cursoId) {
  const config = CURSOS_CONFIG[cursoId];
  if (!config) throw new Error('Configuração do curso não encontrada');

  const cursos = await carregarCursos(config.json);
  const periodos = organizarDisciplinasPorPeriodo(cursos);
  
  adicionarDisciplinasAoDOM(periodos, cursoId);
  exibirInformacoesCurso(cursos[0]);

  // Ativar a primeira disciplina de cada período
  Object.keys(periodos).forEach(periodo => {
    if (periodos[periodo].length > 0) {
      const primeiraDisciplina = periodos[periodo][0];
      setTimeout(() => {
        mostrarDetalhes(primeiraDisciplina.DICIPLINA, periodo, cursoId);
      }, 100); // Pequeno delay para evitar conflitos de renderização
    }
  });
}
// Função para carregar os cursos do arquivo JSON
async function carregarCursos(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
  }
  return await response.json();
}

// Função para organizar as disciplinas por período
function organizarDisciplinasPorPeriodo(cursos) {
  const periodos = {};
  cursos.forEach(curso => {
    const periodo = curso.PERÍODO;
    if (!periodos[periodo]) {
      periodos[periodo] = [];
    }
    periodos[periodo].push(curso);
  });
  return periodos;
}

// Função para adicionar as disciplinas ao DOM
function adicionarDisciplinasAoDOM(periodos, cursoId) {
  for (const periodo in periodos) {
    const container = document.querySelector(`#disciplinas_${periodo}`);
    if (container) {
      periodos[periodo].forEach(curso => {
        const disciplinaDiv = criarDivDisciplina(curso, periodo, cursoId);
        container.appendChild(disciplinaDiv);
      });
    }
  }
}

// Função para criar a div de uma disciplina
function criarDivDisciplina(curso, periodo, cursoId) {
  const disciplinaDiv = document.createElement("div");
  disciplinaDiv.classList.add("col-sm-4");
  disciplinaDiv.innerHTML = `
    <div class="bloco">
      <div class="link-ancora-diciplina">
        <a  href="#" data-disciplina="${curso.DICIPLINA.replace(/'/g, "\\'")}" 
           data-periodo="${periodo}" 
           data-curso="${cursoId}">
          <p class="abreviacao">${curso.ABREVIAÇÃO}</p>
          <br>
          <span class="nome-disciplina">${curso.DICIPLINA}</span>
        </a>
      </div>
    </div>
  `;
  return disciplinaDiv;
}

// Função para adicionar event listeners aos links das disciplinas
function adicionarEventListeners() {
  document.addEventListener("click", function(e) {
    if (e.target.closest(".link-ancora-diciplina a")) {
      e.preventDefault();
      const link = e.target.closest("a");
      const disciplina = link.getAttribute("data-disciplina");
      const periodo = link.getAttribute("data-periodo");
      const curso = link.getAttribute("data-curso");
      mostrarDetalhes(disciplina, periodo, curso);
    }
  });
}

// Função para exibir os detalhes da disciplina
async function mostrarDetalhes(nomeDisciplina, periodo, cursoId) {
  try {
    // Remove a classe ativa de todos os links de disciplina
    document.querySelectorAll('.link-ancora-diciplina a').forEach(link => {
      link.classList.remove('ativo');
    });

    const config = CURSOS_CONFIG[cursoId];
    if (!config) throw new Error('Configuração do curso não encontrada');

    const cursos = await carregarCursos(config.json);
    const curso = cursos.find((c) => c.DICIPLINA === nomeDisciplina);
    
    if (curso) {
      // Encontra o link clicado e adiciona a classe ativa
      const linkClicado = document.querySelector(`.link-ancora-diciplina a[data-disciplina="${nomeDisciplina.replace(/'/g, "\\'")}"]`);
      if (linkClicado) {
        linkClicado.classList.add('ativo');
      }

      // Limita a ementa a 30 palavras (ajuste este número conforme necessário)
      const ementarioCompleto = curso.EMENTÁRIO;
      const palavras = ementarioCompleto.split(' ');
      const limitePalavras = 30;
      const ementarioResumido = palavras.length > limitePalavras 
        ? palavras.slice(0, limitePalavras).join(' ') + '...' 
        : ementarioCompleto;

      const detalhes = document.querySelector(`#detalhes-disciplina-${periodo}`);
      if (detalhes) {
        detalhes.innerHTML = `
          <div id="slides">
            <div id="overflow">
              <div class="inner">
                <div class="slide slide_1" id="1D">
                  <div class="slide-content">
                    <h4 class="nome-disciplina">${curso.DICIPLINA.toUpperCase()}</h4>
                    <p class="abreviacao-disciplina">${curso.ABREVIAÇÃO}</p>
                    <div class="info-disciplina">
                      <p><strong>PERÍODO:</strong> ${curso.PERÍODO}º Período</p>
                      <p><strong>HORA:</strong> ${curso["CH TOTAL"]} HORAS</p>
                      <p><strong>CRÉDITO:</strong> ${curso.CREDITO}</p>
                    </div>
                    <div class="ementario-container">
                      <h5 class="titulo-ementario">EMENTÁRIO:</h5>
                      <p class="texto-ementario">
                        <span class="ementario-resumido">${ementarioResumido}</span>
                        ${palavras.length > limitePalavras ? 
                          `<span class="ementario-completo" style="display:none">${ementarioCompleto}</span>
                           <a href="#" class="ler-mais">Ler mais</a>` : ''}
                      </p>
                    </div>
                    <p id="material">Material completo:
                      <button class="download-btn" id="pdfDownload" data-pdf-url="${curso["PDFs"]}">
                        <span class="text">Download (PDF)</span>
                        <span class="icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </span>
                        <span class="progress"></span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

// Adiciona evento para expandir/recolher a ementa
if (palavras.length > limitePalavras) {
  const lerMais = detalhes.querySelector('.ler-mais');
  const resumido = detalhes.querySelector('.ementario-resumido');
  const completo = detalhes.querySelector('.ementario-completo');
  const footer = document.querySelector('footer');

  lerMais.addEventListener('click', function(e) {
    e.preventDefault();
    if (completo.style.display === 'none') {
      resumido.style.display = 'none';
      completo.style.display = 'inline';
      lerMais.textContent = 'Ler menos';
      // Aumenta a margem do footer quando expande
      footer.style.marginTop = '550px'; // Ajuste este valor conforme necessário
    } else {
      resumido.style.display = 'inline';
      completo.style.display = 'none';
      lerMais.textContent = 'Ler mais';
      // Retorna a margem original do footer
      footer.style.marginTop = '250px';
    }
  });
}

    detalhes.style.display = "block";

        // Adiciona o event listener para o botão de download
        document.getElementById('pdfDownload')?.addEventListener('click', function(e) {
          e.preventDefault();
          const btn = this;
          const pdfUrl = btn.getAttribute('data-pdf-url');
          
          if (!pdfUrl) {
            console.error('URL do PDF não encontrado');
            return;
          }
          
          // Adiciona classe de loading
          btn.classList.add('loading');
          const progress = btn.querySelector('.progress');
          
          // Simula progresso do download
          let width = 0;
          const interval = setInterval(() => {
            width += 10;
            progress.style.width = `${width}%`;
            
            if (width >= 100) {
              clearInterval(interval);
              
              // Muda o texto e ícone temporariamente
              btn.querySelector('.text').textContent = 'Abrindo...';
              btn.querySelector('.icon').innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="9" y1="15" x2="15" y2="9"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              `;
              
              // Aguarda um pouco para mostrar a mudança
              setTimeout(() => {
                // Abre o link em nova aba
                window.open(pdfUrl, '_blank');
                
                // Reseta o botão
                setTimeout(() => {
                  btn.classList.remove('loading');
                  progress.style.width = '0';
                  btn.querySelector('.text').textContent = 'Download (PDF)';
                  btn.querySelector('.icon').innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  `;
                }, 500);
              }, 500);
            }
          }, 50);
        });        // Rolagem suave para a seção de detalhes
        setTimeout(() => {
          const rect = detalhes.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const middlePosition = offsetTop - (window.innerHeight / 2) + (rect.height / 2);
          window.scrollTo({
            top: middlePosition,
            behavior: "smooth",
          });
        }, 50);
      }
    }
  } catch (error) {
    console.error("Erro ao buscar detalhes", error);
  }
}

// Função para exibir informações gerais do curso
function exibirInformacoesCurso(curso) {
  // Você pode implementar esta função se precisar exibir informações gerais
  // como nome do curso, modalidade, etc.
}

// Função para mostrar mensagens de erro
function mostrarErro(mensagem) {
  // Implemente conforme necessário
  console.error(mensagem);
}

// Botão Voltar ao Catálogo
document.getElementById('catalogo')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});
// Função para exibir informações gerais do curso

     // Botão Voltar
     document.getElementById('catalogo').addEventListener('click', () => {
      window.location.href = 'index.html';
  });

  