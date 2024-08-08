// const express = require('express')
// const {TOKEN,API_KEY} = require('./secrets')
// const AXIOS = require('axios')


// const app = express();
// const port = 3000;


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers:{
        accept: 'application/json;charset=utf-8',         
        Authorization: `Bearer ${TOKEN}` 
    },
    params:{
        'languje':'language=es-MX'
    }
})

//Utils

function createMovies(movies, container){
    container.innerHTML=''       
    movies.forEach(movie=> {        
        const movieContainer = document.createElement('div') // Creo un elemento tipo div en el html
            movieContainer.classList.add('movie-container') // accedo al objeto movieContainer a su propiedad classList y le adiciono una clase
            movieContainer.addEventListener('click',()=>{
                location.hash = `#movie=${movie.id}`
                navigator()
            })
        const movieImg = document.createElement('img')//Creo un elemento tipo img en el html
            movieImg.classList.add('movie-img')// accedo al objeto movieImg a su propiedad classList y le adiciono una clase
            movieImg.setAttribute('alt', movie.title)//Adiciono el atributo title, el cual me llega en el elemento que estoy recorriendo
            movieImg.setAttribute(
                'src',
                 'https://image.tmdb.org/t/p/w300' + movie.poster_path, //Concateno la url base que establece una archo de 300 pixeles con la propiedad que tiene el final de la url; el cual lo recibo en el elemento que estoy recorriendo
            )
            movieContainer.appendChild(movieImg);
            container.appendChild(movieContainer);
            
    });
    
}

function createCategories(categories,container){
    container.innerHTML=''
    // Recorro el objeto movies, el cual contiene la respuesta del servicio
    categories.forEach(category =>{        
        // Creo un elemento tipo div en el html
        const catoriesContainer = document.createElement('div')
        // accedo al objeto movieContainer a su propiedad classList y le adiciono una clase
            catoriesContainer.classList.add('category-container')
        // Creo un elemento tipo h3 en el html
        const categoriesTitle = document.createElement('h3')
            categoriesTitle.classList.add('category-title')            
            categoriesTitle.setAttribute('id', 'id'+category.id) // Concateno la palabra id con el id que me devuelve el servicio para que me tome los estilos conforme al CSS.
            categoriesTitle.addEventListener('click', ()=>{
                location.hash= `#category=${category.id}-${category.name}`
                categoriesPage()
            })
        const categoriesTitleText = document.createTextNode(category.name)
        categoriesTitle.appendChild(categoriesTitleText)
        catoriesContainer.appendChild(categoriesTitle)
        container.appendChild(catoriesContainer)
    })
}

// Llamados APIS

async function getTrendingMoviesPreview(){
    const {data,status} = await api('trending/movie/day')
    const movies = data.results
    console.log(movies)

    createMovies(movies,trendingMoviesPreviewList) // Llamo a la función que crea la estructura HTML de forma dinámica
}

async function getMoviesByCategories(id){   
    const {data,status} = await api('discover/movie',{
        params:{
            with_genres:id
        }
       
    })
    const movies = data.results
    console.log(movies)

    createMovies(movies,genericSection) // Llamo a la función que crea la estructura HTML de forma dinámica
    
}

async function getCategoriesMovies(){
    const {data,status} = await api('genre/movie/list')
    const categories = data.genres
    console.log(categories)

  createCategories(categories,categoriesPreviewList)     
}


async function getMoviesBySearch(query){
    const {data, status} = await api('search/movie',{
        params:{
            query,
        }
    })
    const movies = data.results
    console.log(movies)
    createMovies(movies,genericSection) // Llamo a la función que crea la estructura HTML de forma dinámica
}
 
async function getTrendingMovies(){
    const {data,status}= await api('trending/movie/day')

    const movies = data.results
    console.log(movies)

    createMovies(movies,genericSection)
}

async function getMovieById(movie_id){
    const {data:movie,status}= await api(`movie/${movie_id}`)   
    console.log(movie)

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path

    headerSection.style.background = `
    linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%, 
    rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`

    movieDetailTitle.textContent=movie.title
    movieDetailDescription.textContent=movie.overview
    movieDetailScore.textContent=movie.vote_average

    createCategories(movie.genres,movieDetailCategoriesList)
    getRelatedMoviesId(movie_id)
   
}

async function getRelatedMoviesId(movie_id){
    const {data} = await api(`movie/${movie_id}/recommendations`)
    const relatedMovies = data.results
    
    createMovies(relatedMovies,relatedMoviesContainer) // Llamo a la función que crea la estructura HTML de forma dinámica
}

// Iniciar el servidor
// app.listen(port, () => {
//     console.log(`Servidor corriendo en http://localhost:${port}`);
//   });