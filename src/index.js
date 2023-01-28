import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './scripts/fetchCountries';

Notiflix.Notify.init({
  fontSize: '14px',
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

function onSearchInput(e) {
  e.preventDefault();
  countryToSearch = e.target.value.trim();
  console.log(countryToSearch);

  if (inputControl) {
    fetchCountries(countryToSearch).then(allResultsFilter);
  }
}

function allResultsFilter(fetchedData) {
  if (fetchedData.length > 10) {
    notificationTooManyResults();
  }
  if (fetchedData.length > 2 && fetchedData.length <= 10) {
    markupList(fetchedData);
  }
  if (fetchedData.length === 1) {
    inputControl = false;
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
        `<li class="list_item">
<img src="${flags.svg}" alt="flag of ${name}" width="40px" height="40px">
<p class="country">${name}
</p>
</li>`
    )
    .join('');
  countryList.insertAdjacentHTML('afterbegin', markup);
}

function countryCardMarkup(countries) {
  countryList.innerHTML = '';
  console.log('should be one country', countries);
  let markup = countries
    .flatMap(
      ({ name, capital, population, flags, languages }) =>
        // console.log(langName)
        `<h2><img src="${flags.svg}" alt="flaf of ${name}"></h2>
    <p class="country-data">Capital: <span>${capital}</span></p>
    <p class="country-data">Population: <span>${population}</span></p>
    <p class="country-data">Languages: <span>${languages.map(
      language => language.name
    )}</span></p>`
    )
    .join('');
  countryInfo.insertAdjacentHTML('afterbegin', markup);
}

// console.log("fetchCountries", fetchCountries("cuba"))
