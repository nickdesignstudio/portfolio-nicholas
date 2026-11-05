(function () {
  "use strict";

  /* 1. tema claro / escuro
     o botão #theme-toggle alterna a classe "dark" no <html> e guarda a
     escolha no navegador (localStorage).*/
  var CHAVE_TEMA = "portfolio-theme";

  function iniciarTema() {
    var raiz = document.documentElement;
    var botao = document.getElementById("theme-toggle");
    if (!botao) return;

    function atualizarBotao() {
      botao.setAttribute("aria-pressed", String(raiz.classList.contains("dark")));
    }

    botao.addEventListener("click", function () {
      var escuro = raiz.classList.toggle("dark");
      try {
        localStorage.setItem(CHAVE_TEMA, escuro ? "dark" : "light");
      } catch (erro) {
        /* Sem armazenamento: o tema vale apenas nesta visita. */
      }
      atualizarBotao();
    });

    atualizarBotao();
  }


  /* 2. filtros da seção de projetos
     cada botão tem data-filter="categoria" e cada card tem
     data-category="categoria1 categoria2". ao clicar, mostramos só os
     cards que contêm a categoria escolhida ("todos" mostra tudo).*/
  function iniciarFiltros() {
    var grupo = document.getElementById("project-filters");
    var botoes = document.querySelectorAll(".project-filter");
    var cards = document.querySelectorAll(".project-card");
    var contador = document.getElementById("project-count");
    var vazio = document.getElementById("project-empty");
    if (!grupo || !botoes.length || !cards.length) return;

    function aplicarFiltro(filtro) {
      var visiveis = 0;

      // mostra ou esconde cada card conforme suas categorias
      cards.forEach(function (card) {
        var categorias = (card.getAttribute("data-category") || "").split(/\s+/);
        var mostrar = filtro === "todos" || categorias.indexOf(filtro) !== -1;
        card.hidden = !mostrar;
        if (mostrar) visiveis += 1;
      });

      // marca o botão ativo (visual + leitores de tela)
      botoes.forEach(function (botao) {
        var ativo = botao.getAttribute("data-filter") === filtro;
        botao.classList.toggle("is-active", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
      });

      // atualiza o contador e a mensagem de "nenhum projeto"
      if (contador) {
        contador.textContent =
          "Mostrando " + visiveis + " de " + cards.length + " projetos";
      }
      if (vazio) vazio.hidden = visiveis > 0;
    }

    // um único ouvinte no grupo de botões (delegação de eventos)
    grupo.addEventListener("click", function (evento) {
      var botao = evento.target.closest(".project-filter");
      if (botao) aplicarFiltro(botao.getAttribute("data-filter"));
    });

    aplicarFiltro("todos"); // estado inicial
  }


  /* 3. inicialização*/
  iniciarTema();
  iniciarFiltros();
})();
