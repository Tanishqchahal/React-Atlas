import React, { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/countryApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";

function Country() {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;
  return (
    <>
      <section className="country-section">
        <ul className="grid grid-four-cols">
          {countries.map((country, index) => {
            return <CountryCard country={country} key={index} />;
          })}
        </ul>
      </section>
    </>
  );
}

export default Country;
