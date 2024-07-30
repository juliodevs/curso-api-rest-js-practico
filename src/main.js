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
        'languje':'language=en-US'
    }
})

async function getTrendingMoviesPreview(){
    const {data,status} = await api('trending/movie/day')
    const movies = data.results
    console.log(movies)

     //Accedo a la sección con id trendingPreview y a sus elementos con clase trendingPreview-movieList
     trendingMoviesPreviewList.innerHTML= ''
     
    movies.forEach(movie=> {        
       
        const movieContainer = document.createElement('div') // Creo un elemento tipo div en el html
            movieContainer.classList.add('movie-container') // accedo al objeto movieContainer a su propiedad classList y le adiciono una clase

        const movieImg = document.createElement('img')//Creo un elemento tipo img en el html
            movieImg.classList.add('movie-img')// accedo al objeto movieImg a su propiedad classList y le adiciono una clase
            movieImg.setAttribute('alt', movie.title)//Adiciono el atributo title, el cual me llega en el elemento que estoy recorriendo
            movieImg.setAttribute(
                'src',
                 'https://image.tmdb.org/t/p/w300' + movie.poster_path, //Concateno la url base que establece una archo de 300 pixeles con la propiedad que tiene el final de la url; el cual lo recibo en el elemento que estoy recorriendo
            )

            movieContainer.appendChild(movieImg);
            trendingMoviesPreviewList.appendChild(movieContainer);
    });
    
}


async function getCategoriesMovies(){
    const {data,status} = await api('genre/movie/list')
    const categories = data.genres
    console.log(categories)


    //Accedo a la sección con id trendingPreview y a sus elementos con clase trendingPreview-movieList

    categoriesPreviewList.innerHTML = ''   

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

        const categoriesTitleText = document.createTextNode(category.name)

        categoriesTitle.appendChild(categoriesTitleText)
        catoriesContainer.appendChild(categoriesTitle)
        categoriesPreviewList.appendChild(catoriesContainer)


    })
}

 

// Iniciar el servidor
// app.listen(port, () => {
//     console.log(`Servidor corriendo en http://localhost:${port}`);
//   });