
searchFormBtn.addEventListener('click', ()=>{
    location.hash='#search='
    navigator()
})

trendingBtn.addEventListener('click', ()=>{
    location.hash='#trends'
    navigator()
})

arrowBtn.addEventListener('click', ()=>{
    location.hash= 'Home'
    navigator()
})

//Llamo la función navigator
window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('haschange',navigator,false)



function navigator(){
console.log({location})

// if anidado utilizando operadores ternarios en donde pregunto a location.hash empieza de cierta forma
location.hash.startsWith('#trends')  ? trendsPages():
location.hash.startsWith('#search=') ? searchPages():
location.hash.startsWith('#movie=')  ? moviesDatailsPages():
location.hash.startsWith('#category=') ? categoriesPage():
homePage()
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


    getTrendingMoviesPreview()
    getCategoriesMovies()
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
}

function searchPages(){
    console.log('Estamos en search')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
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
}