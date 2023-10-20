const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTg1NjcyYTZjMzFlY2JkM2QzZjFlZDE4MTg2Mzk5NCIsInN1YiI6IjY1MmYyMTlmMzU4ZGE3NWI2MWY5YTFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MgrLhz6cGYaprmyEnMZjt8295Wb4sxV70whSsiQXEZg'
  }
};


window.onload = function() {
  document.querySelector(".search-bar").focus();
}


function buttonClick () {
  let inputvalue = document.querySelector('.search-bar').value;  
  let movieTitle = document.querySelectorAll('.card1')

  movieTitle.forEach( e => {
    e.classList.remove('hidden')
    let moiveTitleVal = e.childNodes[3].childNodes[1].innerText
    let inputMatch = moiveTitleVal.match(new RegExp(inputvalue,"i"))
    if(!moiveTitleVal.includes(inputMatch)){
      e.classList.add('hidden');          
    } 
  })
  
}

function enterKey(){
  let input = document.querySelector('.search-bar') 
    input.addEventListener('keypress',function(e){
      if (e.keyCode === 13) {
        buttonClick()
      }
    })

}

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    let results = response['results']
    console.log(results)

    results.forEach(function(e,i){
      let img = e['poster_path']
      let title = e['original_title']
      let overview = e['overview']
      let vote_agv = e['vote_average']
      let id = e['id']

      console.log(img)


      const temp_html = document.createElement('div');
      temp_html.className = `card1`
      temp_html.innerHTML = `

      <div class = "front" id = ${id}">
        <img src=" https://image.tmdb.org/t/p/w500${img}" alt="">
      </div>
      
      <div class = "back">
      <div class="movie-title">
        ${title}
      </div>
      <div class="movie-desc">
        ${overview}
      </div>
       <div class="movie-avg">
         ${vote_agv}
       </div>
       
       `

      document.querySelector('.cards').append(temp_html)

      temp_html.addEventListener('click', () =>{
        alert(`영화ID : ${id}`)

      })
    })


  }).then(function(){
    buttonClick()
  }) 

  .catch(err => console.error(err));






  
  //   if(x.(document.querySelector('.moive-title').val())) {
  //     console.log('hello')
    
  // }}