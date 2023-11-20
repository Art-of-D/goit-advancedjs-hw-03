"use strict";
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_oSINAuIL5VeXPZdbvcxtlq0EkN8PZNKc0mxfdrsdea4ju9clPwyFoZ9g0X0IN5Ib";

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
   return axios.get(`https://api.thecatapi.com/v1/images/search?breed_=ids${breedId}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}