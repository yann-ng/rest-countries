
import CountryCard from './CountryCard'

function Countries({countries}) {
  return (
    <div className="flex flex-col w-full mx-auto space-y-8
      xsm:flex-row xsm:flex-wrap xsm:gap-x-[5%]
      lg:gap-x-[2.5%]">
      {countries.map((country) => (
        <CountryCard key={country.cca2} country={country}/>
      ))}
    </div>
  )
}

export default Countries