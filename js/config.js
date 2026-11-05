/* 1. configuração do tailwind CSS (CDN)*/
tailwind.config = {
  darkMode: "class", // o modo escuro é ativado pela classe "dark" no <html>
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};

/* 2. tema salvo (padrão do site: escuro). a chave é a mesma usada em script.js */
(function () {
  try {
    if (localStorage.getItem("portfolio-theme") === "light") {
      document.documentElement.classList.remove("dark");
    }
  } catch (erro) {
    /* se o navegador bloquear o armazenamento, mantém o tema padrão. */
  }
})();
