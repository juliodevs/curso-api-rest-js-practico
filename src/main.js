// Data
// const lang = globalObj.navigator.language
// console.log(lang)

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
       "language": navigator.language || "es-CO"
    },
  });

  function likedMoviesList(){
    const item = JSON.parse(localStorage.getItem('liked_movies'))
    let movies;

      if (item){
        movies=item
      }else{
        movies={}
      }
    return movies;
  }

  function likeMovie(movie){
    const likedMovies = likedMoviesList()
   
    if(likedMovies[movie.id]){
      likedMovies[movie.id]= undefined
    }else{
      likedMovies[movie.id] = movie
    }

    localStorage.setItem('liked_movies',JSON.stringify(likedMovies))
           
  }
  
  
  // Utils

  const lazyLoader = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          //console.log(entry.target)
        const url = entry.target.getAttribute('data-img')
        entry.target.setAttribute('src',url)
        }
        

      })
  })
  
  function createMovies(
      movies,
      container,
      {
        lazyLoad = false,
        clean = true,
      }={}
      ) 
  {
    if(clean){
      container.innerHTML = '';
    }
  
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
        
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        lazyLoad ? 'data-img' : 'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );
      movieImg.addEventListener('click', () => {
        location.hash = '#movie=' + movie.id;
      });

      movieImg.addEventListener('error', ()=>{
        movieImg.setAttribute(
          'src',
          'https://static.platzi.com/static/images/error/img404.png'
        )
      })

      const movieBtn = document.createElement('button')
      movieBtn.classList.add('movie-btn')
      //Valido si el objeto devuelto por la función likedMoviesList() contiene el objeto movie.id entonces le agrego clase
      likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked')
      movieBtn.addEventListener('click',()=>{
        movieBtn.classList.toggle('movie-btn--liked')
        likeMovie(movie)

        //esta línea de código asegura que si el hash de la URL es #home o si no hay hash en la URL, se ejecutará la función homePage().
        if (location.hash.startsWith('#home') || !location.hash) { homePage(); } 
       
      })

      if(lazyLoad){
        lazyLoader.observe(movieImg)
      }      
  
      
      movieContainer.appendChild(movieImg);
      movieContainer.appendChild(movieBtn)
      container.appendChild(movieContainer);
    });
  }
  
  function createCategories(categories, container,lazyLoad = false) {
    container.innerHTML = "";
  
    categories.forEach(category => {  
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      categoryTitle.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;
      });
      const categoryTitleText = document.createTextNode(category.name);
  
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      container.appendChild(categoryContainer);
    });
  }
  
  // Llamados a la API
  
  async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies)
  
    createMovies(movies, trendingMoviesPreviewList,true);
  }
  
  async function getCategegoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
  
    createCategories(categories, categoriesPreviewList);
  }
  
  async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;
    maxPage = data.total_pages
    //console.log(maxPage)
  
    createMovies(
      movies, 
      genericSection,
      {
        lazyLoad:true,
        clean:true
      }
    );
  }

  function getPaginatedMoviesByCategory(id) {
    return async function () {
      const {
        scrollTop,
        clientHeight, 
        scrollHeight
      } = document.documentElement
      const scroollIsBottom = (scrollTop + clientHeight) >= (scrollHeight -15)
      const pageIsNotMax = page < maxPage
      if(scroollIsBottom && pageIsNotMax){
        page++
        const { data } = await api('discover/movie',{
          params:{
            page,
            with_genres: id,
          }
        }
        );
        const movies = data.results;      
        createMovies(
          movies, 
          genericSection,
          {lazyLoad:true,
            clean:false
          }
        );
     }  
  }
}
  
  async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
      params: {
        query,
      },
    });
    const movies = data.results;
    maxPage = data.total_pages
      
  
    createMovies(
      movies, 
      genericSection,
      {lazyLoad:true,
        clean:true
      }
    );
  }

  function getPaginatedMoviesBySearch(query) {
    return  async function () {
      const {
        scrollTop,
        clientHeight, 
        scrollHeight
      } = document.documentElement
      const scroollIsBottom = (scrollTop + clientHeight) >= (scrollHeight -15)
      const pageIsNotMax = page < maxPage
      if(scroollIsBottom && pageIsNotMax){
        page++
        const { data } = await api('search/movie',{
          params:{
            page,
            query
          }
        }
        );
        const movies = data.results;
      
        createMovies(
          movies, 
          genericSection,
          {lazyLoad:true,
            clean:false
          }
        );
     }  
  }
}
  
  async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    //console.log(data.total_pages)
    maxPage = data.total_pages
    createMovies(
      movies, 
      genericSection,
      {
        lazyLoad:true,
        clean:true
      }
    );
  
  }
 
 
  async function getPaginatedTrendingMovies(){
    const {
      scrollTop,
      clientHeight, 
      scrollHeight
    } = document.documentElement
    const scroollIsBottom = (scrollTop + clientHeight) >= (scrollHeight -15)
    const pageIsNotMax = page < maxPage
    if(scroollIsBottom && pageIsNotMax){
      page++
      const { data } = await api('trending/movie/day',{
        params:{
          page
        }
      }
      );
      const movies = data.results;
      
    
      createMovies(
        movies, 
        genericSection,
        {lazyLoad:true,
          clean:false
        }
      );
   }  
}
  
  async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);
  
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl)
    headerSection.style.background = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${movieImgUrl})
    `;
    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
  
    createCategories(movie.genres, movieDetailCategoriesList);
  
    getRelatedMoviesId(id);
  }
  
  async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
  
    createMovies(relatedMovies, relatedMoviesContainer);
  }

  function getLikedMovies(){
    const likedMovies = likedMoviesList()

    //Creo un array con los valores de un objeto
    const moviesArray = Object.values(likedMovies)

    likedMoviesListArticle.innerHTML = '';

    !moviesArray.length && likedMoviesSection.classList.add('inactive');
    
    createMovies(
      moviesArray, 
      likedMoviesListArticle,
      {
        lazyLoad:true,
        clean:true
      }
    );

    // if (location.hash == ''){
    //   homePage();
    // }
  
  }