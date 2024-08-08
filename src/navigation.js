
searchFormBtn.addEventListener('click', ()=>{
    location.hash='#search='+searchFormInput.value
    navigator()
})

trendingBtn.addEventListener('click', ()=>{
    location.hash='#trends'
    navigator()
})

arrowBtn.addEventListener('click', () => {   
   // location.hash = window.history.back()
   location.hash='#home'
    navigator()
   
});

//Llamo la función navigator
window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('haschange',navigator,false) // Actualizo el contenido sin recargar completamente el sitio



function navigator(){
    console.log({location})
    // if anidado utilizando operadores ternarios en donde pregunto a location.hash empieza de cierta forma

    if(location.hash.startsWith('#trends')){
        trendsPages()
    }else if(location.hash.startsWith('#search=')){
        searchPages()
    }else if(location.hash.startsWith('#movie=')){
        moviesDatailsPages()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage()
    }else{
        homePage()
    }
    // location.hash.startsWith('#trends')  ? trendsPages():
    // location.hash.startsWith('#search=') ? searchPages():
    // location.hash.startsWith('#movie=')  ? moviesDatailsPages():
    // location.hash.startsWith('#category=') ? categoriesPage():
    // homePage()
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
}



function homePage(){
    console.log('Home')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    const childrentrendingMoviesPreviewList = Array.from(trendingMoviesPreviewList.children) // Declaro array con el número de hijos de la sección de trending
    // Valido si la longitud del array cambia para no volver a llamar a las funciones que se conecta con las apis
    if(!childrentrendingMoviesPreviewList.length) {
        getTrendingMoviesPreview()
        getCategoriesMovies()
    } 
}

function categoriesPage(){
    console.log('Estmoas en Categories')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    //Creo un nuevo array utilizando el metodo split en donde determino como separador de cada nuevo elemento el simbolo igual(=)

    const [_,categoryData] = location.hash.split('=') // ['#category','id-name'] Obtengo solo el elemento en la posición dos del array
    const [categoryId,categoryName] = categoryData.split('-')
    const categoryName2 = decodeURI(categoryName) //Decodifico el nombre de la pelicula para que deje de reemplazar el espacio por %20
    
    //Remplazo el titulo de la categoria dinamicamente
    headerCategoryTitle.innerHTML=categoryName2

   
        getMoviesByCategories(categoryId)
    
    
}

function moviesDatailsPages(){
    console.log('Estamos en movie')

    headerSection.classList.add('header-container--long')
    //headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

     // [movie_movieId]    
    const [_,movieId] = location.hash.split('=')
    getMovieById(movieId)
}

function searchPages(){
    console.log('Estamos en search')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_,query]= location.hash.split('=')    
    getMoviesBySearch(query)
    
}

function trendsPages(){
    console.log('Estamos en trends')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
   
    headerCategoryTitle.innerHTML ='Tendencias'

    getTrendingMovies()
}



