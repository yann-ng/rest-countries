import Head from 'next/head'
import { useState } from 'react'

import Search from '../components/Search'
import Filter from '../components/Filter'
import Countries from '../components/Countries'


export default function Home({countries}) {

  const allCountries = countries
  const [keyword, setKeyword] = useState("");
  const [continentSelected, setContinentSelected] = useState("");
  const [dropdown, showDropdown] = useState(false);

  function searchAction(keyword1, tosearch){
    return tosearch.filter((element) => 
      element.region.includes(continentSelected) && element.name.common.toLowerCase().includes(keyword1.toLowerCase())
    )
  }
  const CountriesFiltered = searchAction(keyword, allCountries)

  const handleDropdown = () => {
    showDropdown(!dropdown)
  }

  const handleSearch = (event) => {
    setKeyword(event.target.value)
  }



  return (
    <>
      <Head>
        <title>Rest Countries</title>
        <meta name="description" content="List of countries of the world" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;800&display=swap" rel="stylesheet" /> 
      </Head>
      <main className="mt-8 pb-8 w-4/5 mx-auto max-w-[1600px]">
        <section className="flex flex-col
          lg:flex-row lg:justify-between">
          <Search handleSearch={handleSearch} />
          <Filter handleDropdown={handleDropdown} dropdown={dropdown} setContinentSelected={setContinentSelected}/>
        </section>
        <section>
          <Countries countries={CountriesFiltered} />
        </section>

      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`)
  const countries = await response.json()

  return {
    props: {countries}
  }
}
