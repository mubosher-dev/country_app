window.addEventListener("load", function(){
    let input = document.querySelector('.search');
    let select = document.querySelector('.select');
    let country_wrapper = document.querySelector('.country-wrapper');
    const COUNTRY_API = "https://restcountries.com/v2/all";
    let wrapper = document.querySelector('.wrapper-item');
    let cancelBtn = document.querySelector('.cancel-btn');
    let checked ;
    function getCountries(api){
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            getResults(data);
        })
    }
    getCountries(COUNTRY_API);

    function getResults(data){
        data.forEach(data => {
            let item = document.createElement('div');
            item.classList.add('country-item');

            item.innerHTML = `
            <div class="country-img">
                <img src="${data.flag}" alt="${data.name}">
             </div>
            <div class="country-description">
                <h1 class="countryName">Davlat nomi: ${data.name}</h1>
                <p class="region">Aholisi: ${data.population}</p>
                <p>Qita: ${data.region}</p>
                <p class="capital">Poytaxti: ${data.capital}</p>
            </div>
            
            `;
            country_wrapper.appendChild(item);
            wrapperFunct(item,data,wrapper)
        });
    }
    
    function btn(a){
        let value = a.value;
        if(value === "all") {
            country_wrapper.innerHTML = "";
            getCountries(COUNTRY_API);
            
        }
        else{
            checked = false;
            let items = country_wrapper.querySelectorAll('.country-item');
            items.forEach(item => {
                if(item.innerText.toLowerCase().indexOf(value) > -1){
                    item.style.display = 'block';
                }else{
                    item.style.display = 'none';
                }
            });
        }
    }

    input.addEventListener('keyup', function(){
      btn(input);
      if(checked === false){
          window.location.reload();
      }
    });

    select.addEventListener('change', function(e){
        btn(select)
    });


    function wrapperFunct(item,data,wrapper){
            item.addEventListener("click", function(){
                wrapper.classList.add("active");
                let div = document.createElement('div');
                let divtwo = document.createElement('div');
                div.classList.add('wrapper-info');
                divtwo.classList.add('country-imgs');
                
                div.innerHTML = `
                <h1 class="count">Davlat nomi : ${data.name}</h1>
                <h2>Aholisi: ${data.population}</h2>
                <h2>Poytaxti: ${data.capital}</h2>
                <h2>Xaqiqiy nomi: ${data.nativeName}</h2>
                <h2>Telefon kodi: +${data.callingCodes}</h2>
                `;
                divtwo.innerHTML = `
                    <img src="${data.flag}" alt="${data.name}">
                `;
                
                wrapper.appendChild(div);
                wrapper.appendChild(divtwo);

                removeChild(cancelBtn,wrapper,div,divtwo);
            });
           
    }

    function removeChild(item,wrapper,fi,third){
        item.addEventListener("click", function(){
            wrapper.classList.remove("active");
            wrapper.removeChild(fi);
            wrapper.removeChild(third);
        });
    }
  
})
