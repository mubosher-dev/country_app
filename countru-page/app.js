window.addEventListener("load", function(){
    let input = document.querySelector('.search');
    let select = document.querySelector('.select');
    let country_wrapper = document.querySelector('.country-wrapper');
    const COUNTRY_API = "https://restcountries.com/v2/all";

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
                <img src="${data.flag}" alt="">
             </div>
            <div class="country-description">
                <h1 class="countryName">Davlat nomi: ${data.name}</h1>
                <p class="region">Aholisi: ${data.population}</p>
                <p>Qita: ${data.region}</p>
                <p class="capital">Poytaxti: ${data.capital}</p>
            </div>
            `;
            country_wrapper.appendChild(item);
        });
    }

    input.addEventListener('keyup', function(){
      btn(input);
    });

    select.addEventListener('change', function(e){
        btn(select)
    });

    function btn(a){
        let value = a.value;
        if(value === "all") {
            country_wrapper.innerHTML = "";
            getCountries(COUNTRY_API);
        }
        else{
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
})