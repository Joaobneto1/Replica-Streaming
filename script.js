const apiUrl = "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false";

let paginaAtual = 1;
let movies = [];
const filmesPorPagina = 5;

// Visualização de filmes
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const result = await axios.get(apiUrl);
        movies = result.data.results;
        exibirListaDeFilmes(obterFilmesPorPagina(paginaAtual));
        exibirFilmeDestaque();
    } catch (error) {
        console.error(error);
    }
});

const exibirListaDeFilmes = (filmesDados) => {
    const listaDeFilmes = document.querySelector('.movies');
    listaDeFilmes.innerHTML = '';
    filmesDados.forEach((movie) => {
        const itensFilme = document.createElement('div');
        itensFilme.classList.add('movie');
        itensFilme.style.backgroundImage = `url('${movie.poster_path}')`;
        itensFilme.setAttribute('data-id', movie.id);
        itensFilme.innerHTML = `
        <div class="movie__info">
            <span class="movie__title">${movie.title}</span>
            <span class="movie__rating">
                <img src="./assets/estrela.svg" alt="Estrela">
                ${movie.vote_average.toFixed(1)}
            </span>
        </div> `;
        listaDeFilmes.appendChild(itensFilme);
    });
};

const obterFilmesPorPagina = (page) => {
    const inicio = (page - 1) * filmesPorPagina;
    const fim = inicio + filmesPorPagina;
    return movies.slice(inicio, fim);
};

// Paginação de filmes
document.querySelector('.btn-next').addEventListener('click', () => {
    if (paginaAtual < Math.ceil(movies.length / filmesPorPagina)) {
        paginaAtual++;
        exibirListaDeFilmes(obterFilmesPorPagina(paginaAtual));
    }
});

document.querySelector('.btn-prev').addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        exibirListaDeFilmes(obterFilmesPorPagina(paginaAtual));
    }
});


// Busca de filmes
const input = document.querySelector('.input');
input.addEventListener('keyup', async (event) => {
    try {
        if (event.key === 'Enter') {
            const buscaUrl = `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`;
            const result = await axios.get(buscaUrl);

            if (result.data.results.length > 0) {
                movies = result.data.results;
                paginaAtual = 1;
                exibirListaDeFilmes(obterFilmesPorPagina(paginaAtual));
            } else {
                await carregarPagina();
            }

            input.value = '';
        }
    } catch (error) {
        console.log(error);
    }
});