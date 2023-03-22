document.querySelector('#btnSearch').addEventListener('click', () => {
  let text = document.querySelector('#textInput').value;
  getCountry(text);
});

function getCountry(country) {
  fetch('https://restcountries.com/v3.1/name/' + country)
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const countries = data[0].borders.toString();
      return fetch('https://restcountries.com/v3.1/alpha?codes=' + countries);
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderNeighbors(data);
    });
}

function renderCountry(data) {
  let html = `<div class="w-full">
    <img
      src="${data.flags.png}"
      alt=""
      class="w-full border-t-2 border-r-2 border-black"
    />
  </div>
  <!--Country Information-->
  <div class="bg-white flex flex-col px-2 py-2 space-y-6">
    <div class="text-start font-bold text-xl">${data.name.common}</div>
    <div class="h-0.5 w-full bg-black"></div>
    <div class="flex flex-col w-full">
      <!--Bilgiler-->
      <div class="w-full flex justify-between">
        <div class="">Nüfus:</div>
        <div class="text-start ml-1">${(data.population / 1000000).toFixed(
          1
        )}</div>
        <div></div>
      </div>
      <div class="w-full flex justify-between">
        <div class="">Resmi Dil:</div>
        <div class="text-start">${Object.values(data.languages)}</div>
        <div></div>
      </div>
      <div class="w-full flex justify-between">
        <div class="">Başkent:</div>
        <div class="text-start">${data.capital[0]}</div>
        <div></div>
      </div>
      <div class="w-full flex justify-between">
        <div class="">Para Birimi:</div>
        <div class="text-start">${Object.values(data.currencies)[0].name} (${
    Object.values(data.currencies)[0].symbol
  })</div>
        <div></div>
      </div>
    </div>
  </div>`;
  document.querySelector('#country-details').innerHTML = html;
}

function renderNeighbors(data) {
  console.log(data);
  let html = '';
  for (let country of data) {
    html += `<div class="flex flex-col border-2">
    <img
      src="${country.flags.png}"
      alt=""
      class="w-full h-1/2"
    />
    <div class="w-full px-2 py-1 border-t-2">${country.name.common}</div>
  </div>`;
  }
  document.querySelector('#neighbors').innerHTML = html;
}
