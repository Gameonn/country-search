import { useEffect, useState } from "react";
import { currencyAxios } from "./axios";

const CurrencyConversion = ({ currency }) => {
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    console.log(currency, "thwjhe");
    if (currency) {
      currencyAxios
        .get("/convert?from=SEK&amount=1&to=INR")
        .then((result) => {
          const data = result;
          console.log(data);
          setCountryInfo(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <h3> {currency} Currency Conversion</h3>
    </div>
  );
};

export default CurrencyConversion;
