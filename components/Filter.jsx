import { IoIosArrowDown } from "react-icons/io";

function Filter({handleDropdown, dropdown, setContinentSelected}){

  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  return(
    <div className="relative flex items-center justify-center w-48 py-3 px-4 text-sm text-lmrs-text bg-lmrs-element rounded-md shadow cursor-pointer 
      dark:bg-dmrs-element dark:text-dmrs-text" onClick={handleDropdown}>
      <span className="font-semibold ">Filter by Region </span>
      <IoIosArrowDown className={`ml-10 text-lmrs-text dark:text-dmrs-text ${dropdown ? "rotate-180": "rotate-0"}`}/>
      <div className={`${dropdown ? "flex": "hidden"} absolute top-14 w-48 p-4 px-6 bg-lmrs-element text-lmrs-text font-semibold text-opacity-80 rounded-md shadow cursor-pointer 
        dark:bg-dmrs-element dark:text-dmrs-text`}>
        <ul className="list-none space-y-1">
          {continents.map((continent, index) => (
            <li key={index} onClick={() => setContinentSelected(continent)}>{continent}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filter