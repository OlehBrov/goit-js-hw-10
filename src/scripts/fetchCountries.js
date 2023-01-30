import Notiflix from "notiflix";

export { fetchCountries };
// import {allResultsFilter} from '../index'
// Notiflix.Notify.init({
//   fontSize: '14px',
//     position: 'left-top',
// });
function fetchCountries(name) {
  console.log('fetch', name);
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(data => {
      return data;
    }).catch((error) => {
      console.dir(error);
      Notiflix.Notify.failure(`Виникла помилка - ${error.message}, спробуйте пізніше`)
    }
      
      );
}
