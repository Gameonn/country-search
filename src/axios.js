import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const countryAxios = axios.create({
  baseURL: "https://restcountries.eu/rest/v2",
});

const currencyAxios = axios.create({
  baseURL: "http://data.fixer.io/api",
});

currencyAxios.defaults.params = {
  access_key: "585fd7dc6d582db3e19f6c8c108d67a9",
};

export { countryAxios, currencyAxios };
