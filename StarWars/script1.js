window.onload=function(){

    const list = document.getElementById("people-list");
    const btnTop = document.getElementById("top");
    const btnDown = document.getElementById("down");
    const table = document.getElementById("table");

    table.style.display="none";

    table.rows[1].cells[0].innerHTML="Year of birth";
    table.rows[2].cells[0].innerHTML="Gender";
    table.rows[3].cells[0].innerHTML="Films";
    table.rows[4].cells[0].innerHTML="HomeWorld";
    table.rows[5].cells[0].innerHTML="Species";
   
    let myPage = 1;
    
   
// fetching our heroes

function extractHeroes() {

  list.replaceChildren()
  fetch(`https://swapi.dev/api/people/?page=${myPage}`)
  
  .then(response => response.json())
  .then(data => {
    const people = data.results;

    for (const hero of people) {
        const item = document.createElement("li");
        item.textContent = hero.name;
        item.addEventListener("click", () => showEveryHero(hero));
        list.appendChild(item);
      }
  });
  
  btnTop.disabled = myPage === 1;
  btnDown.hidden = myPage === 9;
  
}
  
    extractHeroes();

// what about everyone hero

function showEveryHero(hero) {

    let div=document.getElementsByClassName('check');
       for (let i = div.length - 1; i >= 0; i--)  { 
            div[i].remove();     
        }

   table.style.display="block";

   table.rows[0].cells[0].innerHTML = hero.name;
   table.rows[1].cells[1].innerHTML = hero.birth_year;
   table.rows[2].cells[1].innerHTML = hero.gender;

   //extracting films info

  for (const film of hero.films) {
     fetch(film)
        .then(response => response.json())
        .then(data => { 
           let div = document.createElement('div');    
              div.className="check";                  
              div.innerHTML = data.title;
              table.rows[3].cells[1].append(div); 
         });
  }     
    
   //  species of hero
  
  if (hero.species && hero.species.length > 0)
     {fetch(hero.species[0])
        .then(response => response.json())
        .then(data => { 
         
          table.rows[4].cells[1].innerHTML = data.name;
          console.log(data.name);
         
        });
     } else {table.rows[4].cells[1].innerHTML = "has no species"}
  
   
    // hero's homeworld planet
    fetch(hero.homeworld)
      .then(response => response.json())
      .then(data => { 
      
        table.rows[5].cells[1].innerHTML = data.name;
          
      });
  }


    btnTop.addEventListener("click", countUp);

    function countUp() {
        myPage--;
        extractHeroes()
    }

    btnDown.addEventListener("click", countDown);

    function countDown() {
        myPage++;
        extractHeroes()
    }


}