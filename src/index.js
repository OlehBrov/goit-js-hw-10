import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './scripts/fetchCountries';

Notiflix.Notify.init({
    fontSize: '14px',
      position: 'right-bottom',
});

const Mustache = require('mustache');
const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let countryToSearch = '';
let inputControl = true;

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));
// countryList.addEventListener('click', openSelectedElement)
// function inputCangeControl(countryToSearch) {
    
// }
function onSearchInput(e) {
  e.preventDefault();
  countryToSearch = e.target.value.trim();
  console.log('countryToSearch', countryToSearch.length);

    if (inputControl) {
        fetchCountries(countryToSearch).then(allResultsFilter).catch((error) => {
            console.dir(error);
            Notiflix.Notify.failure(`Виникла помилка - ${error.message}, спробуйте пізніше`)
    });
  }
}

function allResultsFilter(fetchedData) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

  if (fetchedData.length > 10) {
    notificationTooManyResults();
  }
    if (fetchedData.length > 2 && fetchedData.length <= 10) {
    markupList(fetchedData);
  }
  if (fetchedData.length === 1) {
    // inputControl = false;
    countryCardMarkup(fetchedData);
  }
}

function notificationTooManyResults() {
  Notiflix.Notify.warning(
    'Too many matches found. Please enter a more specific name.'
  );
}


function markupList(countries) {
  let markup = countries
    .map(
      ({ name, flags }) =>
        `<li class="list-item">
<img src="${flags.svg}" alt="flag of ${name}" width="40px" height="40px">
<p class="country-list-item">${name}
</p>
</li>`
    )
    .join('');
  countryList.insertAdjacentHTML('afterbegin', markup);
}


function countryCardMarkup(countries) {
    console.log(countries)
    countryList.innerHTML = '';
    const country = countries[0]
            console.log("before-map", country)

        country.langs = country.languages.map(x => x.name).join(", ");
        console.log(country)
        console.log(country.name)    

    let markup = `<img src="${country.flags.svg}" alt="flag of ${country.name}", width="50px" class="country-flag"><h2 class="card-header">${country.name}</h2>
    <p class="country-data">Capital: <span style="font-weight: 400;">${country.capital}</span></p>
    <p class="country-data">Population: <span style="font-weight: 400;">${country.population}</span></p>
    <p class="country-data">Languages: <span style="font-weight: 400;">${country.langs}</span></p>`
    ;
  countryInfo.insertAdjacentHTML('afterbegin', markup);
}

// function openSelectedElement(e) {
//     console.log(e.target.textContent)
// fetchCountries(e.target.textContent).then(allResultsFilter);
// }