"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

function renderCountry(country, className = "") {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src='${country.flag}'/>
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +country.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${
              country.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              country.currencies[0].name
            }</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   // data = request.send() // You can't do this because the variable store the value before the result is even there

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//     // Get neighbour country(2)
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();

//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/portugal`);
// request.send();

// const requestFetch = fetch(`https://restcountries.com/v2/name/portugal`);
// console.log(requestFetch);

// const getCountryData = function (country) {
//   // Fetch data
//   fetch(`https://restcountries.com/v2/name/${country}`) // country 1
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     }) // returning the json data from the response object as a promise
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     }) // logging the resulting data
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(error => {
//       console.error(`${error}`);
//       renderError(`Something went wrong 🌋🌋: ${error.message}, Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getJSON = function (URL, errorMsg = "Something went wrong") {
  return fetch(URL).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg}:(${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Fetch data
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders ? data[0].borders[0] : data[0].borders;

      if (!neighbour) throw new Error("No neighbour found!");

      //Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found"
      );
    }) // logging the resulting data
    .then((data) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(`${error}`);
      renderError(`Something went wrong 🌋🌋: ${error.message}, Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryData("puerto rico");
// btn.addEventListener('click', function () {
//   getCountryData('dominican republic');
// });

// getCountryData('australia');

// Coding challenge #1
const API_KEY = "597439431208749478515x25706";

function whereAmI(lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Can't make more than 10 request per second | Error: ${response.statusText}(${response.status})`
        );
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return data;
    })
    .then((data) => getCountryData(data.country))
    .catch((error) => console.log(error));
}
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// console.log("Test start");
// setTimeout(() => console.log("0 sec timer"), 0);
// // Promise.resolve('Resolved promose 1').then(res => {
// //   for(let i =0; i < 1000000000000000; i++){
// //   console.log(res)
// //   }
// // });

// Promise.resolve("Resolved Promise 2").then((res) => console.log(res));
// console.log("Test end");

// 1,4,3,2

// Building promises

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("letter draw is happening");
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve("You Won"); // fullfilled value of the Promise and this value will be used by the then method
//     } else {
//       reject(new Error("You lost your money")); // rejected value of the Promise and will be display to the console by the callback in the catch method
//     }
//   }, 2000);
// });
// promise can be created using the Promise constructor and we pass a function called the executor function as a callback
// The executor function takes two other callbacks in case the promise is resolved or rejected
// Converting callback-based asynchronous behavior to Promises is called promisifying
// lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));

// Promisifying setTimeout()
const wait = function (seconds) {
  return new Promise(function (resolve) {
    //rejected parameters is unnecessary
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(3)
//   .then(() => {
//     console.log("I waited for 3 seconds");
//     return wait(2);
//   })
//   .then(() => console.log("I waited for 2 seconds"));

// Promise.resolve("Hello this resolved inmediately").then((a) => console.log(a));
// Promise.reject("Hello this rejected inmediately").then((a) => console.log(a));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (err) => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then((res) => console.log(res));

function whereAmI2() {
  getPosition()
    .then((res) => {
      const { latitude: lat, longitude: lng } = res.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Can't make more than 10 request per second | Error: ${response.statusText}(${response.status})`
        );
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return data;
    })
    .then((data) => getCountryData(data.country))
    .catch((error) => console.log(error));
}

// btn.addEventListener("click", whereAmI2);

//Coding challenge

let newImg;
const imgContainer = document.querySelector(".images");
let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    newImg = document.createElement("img");
    newImg.src = imgPath;
    newImg.addEventListener("load", () => {
      imgContainer.appendChild(newImg);
      resolve(newImg);
    });
    newImg.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

// createImage("/img/img-1.jpg")
//   .then((response) => {
//     currentImg = response;
//     console.log(response);
//     return wait(2);
//   })
//   .then((response) => {
//     currentImg.style.display = "none";
//     return createImage("/img/img-2.jpg");
//   })
//   .then((response) => {
//     currentImg = response;
//     console.log(response);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((error) => console.error(error));

// Async // Await

const whereAmIAsyncAwait = async function () {
  // Await statement
  // Async/Await are syntatic sugar for Promise
  // The await keyword stops the execution of the async function not of the global stack

  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`
    );

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error("Problem getting location");

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    //Fulfilled value of a promise
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (error) {
    // Catch block has access to whatever error happened in the try block
    console.error(error);
    renderError("Something went wrong");

    // Reject promise returned from async function
    throw error;
  }
};

console.log("1: Will get location");

// const city = whereAmIAsyncAwait();
// console.log(city);

// whereAmIAsyncAwait()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((error) => console.log(`2: ${error.message}`))
//   .finally(() => console.log("3: Finished getting location"));

// (async function () {
//   try {
//     const city = await whereAmIAsyncAwait();
//     console.log(`2: ${city}`);
//   } catch (error) {
//     console.log(`2: ${error.message}`);
//   }
//   console.log("3: Finished getting location");
// })();

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // Takes an array of a Promises and returns a Promise
    // that will run them at the same time
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`)
    ]);
    console.log(data.map((d) => d[0].capital));
    // console.log([data1.capital, data2.capital, data3.capital]);
  } catch (error) {
    console.log(error);
  }
};
// get3Countries("dominican republic", "canada", "tanzania");

// Promise.race: returnes the value of the first promise that settles

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/portugal`),
//     getJSON(`https://restcountries.com/v2/name/puerto rico`)
//   ]);
//   console.log(res[0]);
// })();

const timeout = function (sec) {
  return new Promise(function (_resolve, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long"));
    }, sec * 1000);
  });
};

// Promise.race([getJSON(`https://restcountries.com/v2/name/italy`), timeout(5)])
//   .then((res) => console.log(res[0]))
//   .catch((err) => console.error(err));

// Promise.allSettled: returns the settled promises

// Promise.allSettled([
//   Promise.resolve("Success"),
//   Promise.resolve("Success again"),
//   Promise.reject("Error"),
//   Promise.resolve("Success x3")
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Promise.any: returns the first fulfilled promise

// Promise.any([
//   Promise.reject("Error"),
//   Promise.resolve("Success"),
//   Promise.resolve("Success again"),
//   Promise.resolve("Success x3")
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Coding challenge #3

const loadNPause = async function () {
  // The currentImg variable is not necesarry because we are in the same scope
  try {
    let newImage = await createImage("/img/img-1.jpg");
    currentImg = await newImage;
    console.log(newImage);
    await wait(2);

    currentImg.style.display = "none";
    newImage = await createImage("/img/img-2.jpg");
    console.log(newImage);

    currentImg = await newImage;
    await wait(2);
    currentImg.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

// loadNPause("/img/img-1.jpg");

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (e) => await createImage(e));
    console.log(imgs);
    // Promise.all executes a promise that runs other promises and returns the value of each promise
    const imgPromises = await Promise.all(imgs);
    console.log(imgPromises);
    imgPromises.forEach((e) => e.classList.add("parallel"));
  } catch (error) {
    console.error(error);
  }
};
const imgArr = ["/img/img-1.jpg", "/img/img-2.jpg", "/img/img-3.jpg"];

loadAll(imgArr);
