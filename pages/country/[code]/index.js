import Head from 'next/head'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'

export default function index({country}){
  return(
    <>
      <Head>
        <title>{country.name.common} - Information</title>
        <meta name="description" content="All about the country" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;800&display=swap" rel="stylesheet" /> 
      </Head>
      <main className="mt-14 pb-8 w-4/5 mx-auto max-w-[1600px]">
        <section>
          <Link href="/">
            <div className="flex items-center justify-center px-6 py-1 w-28 shadow bg-lmrs-element text-lmrs-text rounded cursor-pointer 
              dark:bg-dmrs-element dark:text-dmrs-text">
              <BsArrowLeft className="text-lg text-lmrs-text dark:text-dmrs-text"/>
              <span className="ml-2">Back</span>
            </div>
          </Link>
        </section>
        <section className="mt-14 flex flex-col
            md:flex-row md:justify-between">
          <div className="w-full md:w-[45%] min-h-[96]">
            <img src={country.flags.svg} alt={country.name.common + " flag"} className="w-full object-cover shadow" />
          </div>
          <div className="w-full md:w-[45%]">
            <h2 className="mt-8 text-semibold text-2xl font-extrabold
              md:mt-0 lg:mt-8">{country.name.common}</h2>
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between md:flex-col lg:flex-row">
              <div className="font-semibold space-y-2 lg:mr-4">
                <p>Native Name: <span className="font-light">{country.name.common}</span></p>
                <p>Population: <span className="font-light">{numberWithCommas(country.population)}</span></p>
                <p>Region: <span className="font-light">{country.region}</span></p>
                <p>Sub Region: <span className="font-light">{country.subregion}</span></p>
                <p>Capital: <span className="font-light">{country.capital}</span></p>
              </div>
              <div className="font-semibold space-y-2 mt-8 sm:mt-0 md:mt-2 lg:mt-0">
                <p>Top Level Domain: <span className="font-light">{country.tld}</span></p>
                <p>Currencies: <span className="font-light">{(Object.values(country.currencies))[0].name}</span></p>
                <p>Languages: <span className="font-light">{(commasOfLanguages(country.languages))}</span></p>
              </div>
            </div>
            <div className="mt-14 md:mt-8 xl:mt-14">
              <div className="flex flex-col space-x-2 sm:flex-row sm:items-center md:flex-col md:items-start xl:items-center xl:flex-row">
                <span className="font-semibold">Border Countries: </span>
                <div className="flex space-x-4">
                  {country.borders && country.borders.map((border, index) => ( (index <= 2) ? 
                    <Link href={`./${border}`}><span key={index} className="flex items-center justify-between px-6 py-1 shadow bg-lmrs-back text-lmrs-text rounded cursor-pointer 
                      dark:bg-dmrs-element dark:text-dmrs-text">{border}</span></Link> : ''
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const code = context.params.code
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
  const countries = await response.json()
  // considering only the first match
  const country = await countries[0]

  return {
    props: {country}
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function commasOfLanguages(languages){
  var results = "";
  var keys = Object.keys(languages).slice(-1).toString();
  for (let lang in languages){
    (keys == lang) ? results += languages[lang] : results += languages[lang] + ", ";
  }
  return results;
}
