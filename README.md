
# 🎬 Desafio Front-End | Módulo 07 — Cubos Academy

>Desenvolver **aplicação de streaming**, semelhante à Netflix.
---

## 🎯 Objetivo do Projeto

Construir uma interface com as seguintes funcionalidades (as marcadas com * são obrigatórias):

- Visualização de filmes 
- Paginação de filmes 
- Busca de filmes 
- Filme do dia 
- Modal de filme

---

## 🖼️ Design e API

- 🎨 [Design no Figma](https://www.figma.com/file/AL6hZ3Lq16Uj8mw1o4BzAK/Desafio-front-academy-2?node-id=0%3A1)
- 🔌 [API usada: TMDB Proxy](https://tmdb-proxy.cubos-academy.workers.dev)

---

## 🛠️ Funcionalidades Detalhadas

### ✅ Visualização de Filmes
Os filmes são exibidos logo ao carregar a página, com informações como:
- Pôster
- Título
- Nota (vote_average)
---

### 🔁 Paginação
- 4 páginas simuladas (0 a 3), com 5 filmes por página
- Navegação circular usando os botões `Prev` e `Next`

---

### 🔍 Busca de Filmes
- Campo de busca por título
- Usa o endpoint `search/movie`
- Enter aciona a pesquisa
- Limpa o input após uso

---

### ⭐ Filme do Dia
Exibe o destaque do dia com:
- Banner de fundo
- Título, nota, gêneros, data e descrição
- Link para trailer no YouTube

---

### 🎬 Modal de Filme
- Ao clicar em um filme, abre modal com detalhes
- Modal fecha ao clicar fora ou no botão de fechar

---

## 🧠 Conhecimentos aplicados

- HTML semântico
- CSS responsivo
- DOM e manipulação dinâmica de elementos
- `fetch()` e consumo de APIs REST
- Eventos de clique, teclado e interação com formulário
- Modal e manipulação de classes
- Manipulação de temas com CSS variables

---

## 🚀 Execução

Clone o projeto e abra o `index.html`:

```bash
git clone https://github.com/Joaobneto1/desafio-frontend-m07.git
cd desafio-frontend-m07
```

---

## 🏷️ Tags
`front-end` `HTML` `CSS` `JavaScript` `DOM` `API`
