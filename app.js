//? selectors

const select = document.getElementById("select")
const countries = document.getElementById("countries")

let ulkeIsimleri = '' 


// asyn await 

const country = async () => {

    const URL = `https://restcountries.com/v3.1/all`

    try {
        const res = await fetch(URL)
        if(!res.ok) {
            throw new Error("Something went wrong..")
        }
        const data = await res.json()
        // console.log(data)
        renderCountries(data)


    }catch (err) {
        console.log(err)
        renderError(err)
    }
}

country()

const renderError = (err) => {
    console.log(err)
}


const renderCountries = (data) => {
    
    ulkeIsimleri = data
    ulkeIsimleri.forEach((item)=>{
        
        select.innerHTML += `
        <option value="${item.name.common}">${item.name.common}</option>
        `
        // countries.innerHTML += `<img src="${flags.png}" alt="..." style="width: 400px;">`
    })
}

select.addEventListener("change", () => {
    
    countryDiv(select.value)
    
})


const countryDiv = async (countryName) => {

    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)

    const data = await res.json()
    
    // const {name:{common}, flags:{png}, capital, region, languages, currencies, population, borders, maps:{googleMaps} } = data[0]
    
    const {
        name: { common },
        capital,
        region,
        flags: { png },
        languages,
        currencies,
        population,
        borders,
        maps,
      } = data[0];

    countries.innerHTML = `
    <img src="${png}" class="card-img-top" alt="..." style="width: 400px;">
    <div class="card-body">
        <h4 class="card-title">${common}</h4>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">
        <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region: ${region}</span></li>
        <li class="list-group-item">
        <i class="fas fa-lg fa-landmark"></i><span class="fw-bold"> Capital: ${capital}</span></li>
        <li class="list-group-item">
        <i class="fas fa-lg fa-comments"></i><span class="fw-bold"> Languages: ${Object.values(languages)}</span></li>
        <li class="list-group-item">
        <i class="fas fa-lg fa-money-bill-wave"></i><span class="fw-bold"> Currencies: ${Object.values(currencies)[0].name},${Object.values(currencies)[0].symbol}</span></li>
        <li class="list-group-item">
        <i class="fa-solid fa-people-group"></i><span class="fw-bold"> Population: ${population}</span></li>
        <li class="list-group-item">
        <i class="fa-sharp fa-solid fa-road-barrier"></i><span class="fw-bold"> Borders: ${Object.values(borders)}</span></li>
        <li class="list-group-item">
        <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href=${maps.googleMaps} target='_blank'> Go to google map</a> </li>
        </ul>
        `
}
