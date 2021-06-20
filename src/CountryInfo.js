import { useEffect, useState } from "react";
import { countryAxios } from "./axios";
import CurrencyConversion from "./CurrencyConversion";

const CountryInfo = ({ selectedCountry }) => {
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    console.log(selectedCountry, "thwjhe");
    if (selectedCountry) {
      countryAxios
        .get("/name/" + selectedCountry + "?fullText=true&fields=name;capital;currencies;popluation;latlng;flag;timezones")
        .then((result) => {
          const data = result.data[0];
          console.log(data);
          setCountryInfo(data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedCountry]);

  return (
    <div className="row">
      <div className="col s6">
        <h3>{selectedCountry} Info</h3>
        <table className="striped bordered">
          <thead>
            <tr>
              <th>Capital</th>
              <td>{countryInfo?.capital}</td>
            </tr>
            <tr>
              <th>Currency</th>
              <td>{countryInfo.currencies?.map((info) => info.code + " " + info.symbol)}</td>
            </tr>
            <tr>
              <th>Lat Long</th>
              <td>{countryInfo.latlng?.join(", ")}</td>
            </tr>
            <tr>
              <th>Timezones</th>
              <td>{countryInfo.timezones?.join(", ")}</td>
            </tr>
            <tr>
              <th>Flag</th>
              <td className="chip">
                <img src={countryInfo?.flag} alt={countryInfo?.name} />
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div className="col s6">
        <CurrencyConversion currency={countryInfo.currencies?.map((info) => info.code)} />
      </div>
    </div>
  );
};

export default CountryInfo;
