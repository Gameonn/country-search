import { useState, useCallback } from "react";
import _ from "lodash";

import { countryAxios } from "./axios";
import CountryInfo from "./CountryInfo";

const Countries = () => {
  const [inputValue, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  // load options using API call
  const searchCountry = (value) => {
    console.log("searchCountry", value);
    if (value) {
      countryAxios.get(`/name/${value}?fields=name`).then((result) => {
        setOptions(result.data);
      });
    }
  };
  const delayedQuery = useCallback(
    _.debounce((q) => searchCountry(q), 500),
    []
  );

  const handleChangeWithDebounce = (e) => {
    const value = e.target.value;
    setValue(value);
    delayedQuery(value);
  };

  // const controlledSearch = useRef(_.debounce(searchCountry, 300));

  // handle input change event
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setValue(value);
  //   console.log("value", value);
  //   // searchCountry(value);
  //   controlledSearch.current(value);
  // };

  // handle selection
  const handleOptionChange = (e) => {
    console.log("value2", e);
    const value = e.target.value;
    setSelectedValue(value);
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <h3> Search Counries and check their details </h3>
        <div className="input-field col s12">
          <input placeholder="Placeholder" value={inputValue} onChange={handleChangeWithDebounce} type="text" />
        </div>
        <div className="input-field col s12">
          <select style={{ display: "block" }} defaultValue={selectedValue} onChange={handleOptionChange}>
            <option value="" disabled>
              Choose an Option
            </option>
            {options.map((option, i) => {
              return (
                <option value={option.name} key={i}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
        {selectedValue && <CountryInfo selectedCountry={selectedValue} />}
      </div>
    </div>
  );
};

export default Countries;
