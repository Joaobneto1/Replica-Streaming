// Variáveis
const apiUrl = "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false";

let paginaAtual = 1;
let movies = [];
const filmesPorPagina = 5;

const highlightC = document.querySelector('.highlight');
const highlightVideoLink = highlightC.querySelector('.highlight__video-link');
const highlightTitulo = highlightC.querySelector('.highlight__title');
const highlightAvaliacao = highlightC.querySelector('.highlight__rating');
const highlightGenero = highlightC.querySelector('.highlight__genres');
const highlightLancamento = highlightC.querySelector('.highlight__launch');
const highlightDescricao = highlightC.querySelector('.highlight__description');

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

// "Filme do dia"
const exibirFilmeDestaque = async () => {
    try {
        const filmeId = movies[Math.floor(Math.random() * movies.length)].id;
        const result = await axios.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${filmeId}?language=pt-BR`);
        const filme = result.data;

        highlightVideoLink.href = `https://www.youtube.com/results?search_query=${filme.title} Trailer`;
        highlightTitulo.textContent = filme.title;
        highlightAvaliacao.innerHTML = `<img src="./assets/estrela.svg" alt="Estrela"> ${filme.vote_average.toFixed(1)}`;
        highlightGenero.textContent = filme.genres.map(genre => genre.name).join(', ');
        highlightLancamento.textContent = new Date(filme.release_date).getFullYear();
        highlightDescricao.textContent = filme.overview;

        const highlightVideo = document.querySelector('.highlight__video');
        highlightVideo.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`;
    } catch { error } {
        console.log(error);
    }
};
