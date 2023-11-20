"use strict";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const hidden = "visually-hidden";
const elements = {
    breeds: document.querySelector(".breed-select"),
    catInfo: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    hiddenBreeds(){
      this.breeds.classList.add(hidden)
    },
    unhiddenBreeds(){
      this.breeds.classList.remove(hidden)
    },
    hiddenCatInfo(){
      this.catInfo.classList.add(hidden)
    },
    unhiddenCatInfo(){
      this.catInfo.classList.remove(hidden)
    },
    hiddenLoader(){
      this.loader.classList.add(hidden)
    },
    unhiddenLoader(){
      this.loader.classList.remove(hidden)
    },
}
let catsData = [];

elements.hiddenBreeds();

fetchBreeds()
  .then((value) => {
    catsData = value;
    value.forEach((element) => {
      fillSelect(element);
    });
    elements.hiddenLoader();
    elements.unhiddenBreeds();
  })
  .catch((reason) => {
    console.error(reason);
    elements.hiddenLoader();
    showError();
  });


function fillSelect(element){
    const option = `<option value="${element.id}">${element.name}</option>`;
    elements.breeds.insertAdjacentHTML("beforeend", option);
}

elements.breeds.addEventListener("change", () => {
    const id = elements.breeds.value;
    elements.hiddenCatInfo();
    elements.unhiddenLoader();
    fetchCatByBreed(id)
        .then((value) => {
            if (value.length === 0 ){
                throw new Error("No image");
            }
            elements.hiddenLoader();
            elements.unhiddenCatInfo();
            fillCatInfo(value[0], id);
        })
        .catch((reason) => {
            console.log(reason);
            elements.hiddenLoader();
            elements.hiddenBreeds();
            showError();
        })
  });

function fillCatInfo(cat, id) {
    const {url} = cat;
    const {name, description, temperament} = getCatData(id);
    console.log(cat);
    const createCatInfo = `
    <img class="cat-image" alt="cat" src=${url} width=400px height=400px></img>
    <div class="body__internal-wrapper">
      <h2 class="body__head2">${name}</h2>
      <p class="body__p-description">${description}</p>
      <h3 class="body__head3-temperament">Temperament:</h3>
      <p class="body__p-temperament">${temperament}</p>
    </div>`;
    elements.catInfo.innerHTML = createCatInfo;
}

function getCatData(id) {
    return catsData.find(value => value.id === id);
}

function showError(){
  iziToast.error({
    message: 'Oops! Something went wrong! Try reloading the page!',
    position: 'topRight',
  });
}