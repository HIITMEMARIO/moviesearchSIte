const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTg1NjcyYTZjMzFlY2JkM2QzZjFlZDE4MTg2Mzk5NCIsInN1YiI6IjY1MmYyMTlmMzU4ZGE3NWI2MWY5YTFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MgrLhz6cGYaprmyEnMZjt8295Wb4sxV70whSsiQXEZg'
  }
};



// 사이트 로드시 커서 인풋에 위치하기
window.onload = function() {
  document.querySelector(".search-bar").focus();
}


// 상단이동 버튼
document.querySelector('.to-top').addEventListener('click',function(){
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
})




// 버튼 클릭시 원하는 요소만 보이기
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

// 엔터누를시 원하는 요소만 보이기
function enterKey(){
  let input = document.querySelector('.search-bar') 
    input.addEventListener('keypress',function(e){
      if (e.keyCode === 13) {
        buttonClick()
      }
    })

}

// 영화 데이터 가져오기 클릭시 영화 Id보이기
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

  // 상단이동 버튼 숨기기&보이기
  window.addEventListener('scroll',function(){
    let totop = document.querySelector('.to-top')
    let scroll = window.scrollY;
    if(scroll < 400){
      totop.style.right = '-1000px';
    } else {
      totop.style.right = '20px';
    }
  })

  .catch(err => console.error(err));





