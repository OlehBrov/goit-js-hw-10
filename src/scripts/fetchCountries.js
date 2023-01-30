import Notiflix from "notiflix";

export { fetchCountries };

function fetchCountries(name) {
  console.log('fetch', name);
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(
    fetchStatusHandler
  ).then(response => response.json())
    .then(data => {
      return data;
    })
    // .catch((error) => {
    //   console.dir(error);
    //   Notiflix.Notify.failure(`Виникла помилка - ${error.message}, спробуйте пізніше`)
    // }
      
    //   );
}

function fetchStatusHandler(response) {
  if (response.status === 200) {
    return response;
  } else {
    return new Error(Notiflix.Notify.failure(`Виникла помилка - ${response.statusText}, спробуйте пізніше`));
  }
}
// .then(response =>{
//       if (response.ok) { response.json() }
//       throw new Error('Something went wrong');
//     })
