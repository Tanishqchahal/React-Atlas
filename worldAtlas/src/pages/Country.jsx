import React, { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/countryApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";

function Country() {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;

  function searchCountry(country) {
    if (search) {
      return country.name.common.toLowerCase().includes(search);
    }
    return country;
  }

  function filterRegion(country) {
    if (filter === "all") {
      return country;
    }
    return country.region === filter;
  }

  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  return (
    <>
      <section className="country-section">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
        <ul className="grid grid-four-cols">
          {filterCountries.map((country, index) => {
            return <CountryCard country={country} key={index} />;
          })}
        </ul>
      </section>
    </>
  );
}

export default Country;
