import { useState } from 'react'
import { useEffect } from 'react'
import { selectAllCities } from './api/apiSlice'
import { useSelector } from 'react-redux'
import { useGetCitiesQuery } from './api/apiSlice'
import { selectCityById } from './api/apiSlice'

function App() {
  const [salary1, setSalary1] = useState('')
  const [salary2, setSalary2] = useState('')
  const [city1, setCity1] = useState('')
  const[city2, setCity2] = useState('')
  const [message, setMessage] = useState('')

  const {
    data: cities,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCitiesQuery()
  
  //const cities = useSelector(selectAllCities)

  console.log(cities)

  let content;
  let jsoncontent;
  if (isLoading) {
    content = <option>"Loading..."</option>;
    jsoncontent = "";
  } else if(isSuccess){
    jsoncontent = JSON.stringify(cities)
    const { ids, entities } = cities
    content = ids.map((id) => (
        <option value={id}>
          {entities[id].City} , {entities[id].State}
        </option>
    ))
  }else if(isError){
    content = <option>{error}</option>
  }
 
  const compareSalaries = (salary1, salary2) => {
    if(salary2 > salary1){
      console.log(salary1)
      console.log(salary2)
      let standardOfLivingDiff = (salary2 - salary1)/salary1
      return (
        <>
          <h1 class="text-xl m-4">
            <p class="text-blue-400 text-xl inline">Job Two </p> 
            gives a 
            <p class="text-blue-400 text-xl inline"> {(standardOfLivingDiff * 100).toFixed(2)}% </p> 
            higher standard of living than 
            <p class="text-purple-500 text-xl inline"> Job One</p>
          </h1>
        </>
        
      )
    } else {
      console.log(salary1)
      console.log(salary2)
    let standardOfLivingDiff = (salary1 - salary2)/salary2
    return (
      <>
        <h1 class="text-xl m-4">
            <p class="text-purple-500 text-xl inline">Job One </p> 
            gives a 
            <p class="text-purple-500 text-xl inline"> {(standardOfLivingDiff * 100).toFixed(2)}% </p> 
            higher standard of living than 
            <p class="text-blue-400 text-xl inline"> Job Two</p>
          </h1>
      </>
    )
  }
  }

  const calculateGreaterStandardOfLiving = (CoL1, CoL2, salary1, salary2) => {
    if(CoL1 > CoL2){        
      let CoLIndexDiff= CoL1 - CoL2
      let CoLDiffPercent = CoLIndexDiff/100
      let salary2bonus = (salary2 * CoLDiffPercent)
      salary2 = Number(salary2bonus) + Number(salary2)
      const message = compareSalaries(salary1, salary2)
      setMessage(message)
   } else {
      let CoLIndexDiff= CoL2 - CoL1
      let CoLDiffPercent = CoLIndexDiff/100
      let salary1bonus = (salary1 * CoLDiffPercent)
      salary1 = Number(salary1bonus) + Number(salary1)
      const message = compareSalaries(salary1, salary2)
      setMessage(message)

  }
}

  //selecting 
  //useselector hook to select city by id in the normalized state
  //the option tag has the id attribute as the city's id in the state
  const selectedCity1 = useSelector(state => selectCityById(state, city1))
  const selectedCity2 = useSelector(state => selectCityById(state, city2))

  {/* useEffect(() => {
    if(!(isNaN(salary1)) && !(isNaN(salary2)) && city1 && city2 ){
      //find CoL index for each city in the database somehow
      console.log(salary1)
      console.log(salary2)
      console.log(city1)
      console.log(city2)

      const cityObject1 = selectedCity1
      const cityObject2 = selectedCity2

      const CoL1 = cityObject1['Cost of Living Index']
      const CoL2 = cityObject2['Cost of Living Index']

      console.log(CoL1)
      console.log(CoL2)
      
      calculateGreaterStandardOfLiving(CoL1, CoL2, salary1, salary2)

      console.log(message)
    }
  }, [salary1, salary2, city1, city2, message]) */}
  
  const doTest = (e) => {
  if(!(isNaN(salary1)) && !(isNaN(salary2)) && city1 && city2 ){
    //find CoL index for each city in the database somehow
    console.log(salary1)
    console.log(salary2)
    console.log(city1)
    console.log(city2)

    const cityObject1 = selectedCity1
    const cityObject2 = selectedCity2

    const CoL1 = cityObject1['Cost of Living Index']
    const CoL2 = cityObject2['Cost of Living Index']

    console.log(CoL1)
    console.log(CoL2)
    
    calculateGreaterStandardOfLiving(CoL1, CoL2, salary1, salary2)

    console.log(message)
  }
}

  //event handlers
  const handleCity1Change = (e) => {
    setCity1(e.target.value)
  }

  const handleCity2Change = (e) => {
    setCity2(e.target.value)
  }

  const handleSalary1Change = (e) => {
    setSalary1(e.target.value)
  }

  const handleSalary2Change = (e) => {
    setSalary2(e.target.value)
  } 

  return (
    <>
      <div class="text-xl h-screen w-screen max-w-5xl">
        <form class="h-full w-full flex flex-col justify-evenly items-center">
          <label for="JobOneSalary" class="block text-xl text-purple-500">Job One Salary:</label>
          <input type="number" name="JobOneSalary" class="h-1/12 w-4/5 border-2 border-purple-500 text-purple-500" onChange={handleSalary1Change}/>
          <select name="JobOneState" class="h-1/12 w-4/5 border-2 border-purple-500 text-purple-500" onChange={handleCity1Change}>
            <option disabled selected value> -- select an option -- </option>
            {content}
          </select>

          <label for="JobTwoSalary" class="block text-xl text-blue-400">Job One Salary:</label>
          <input type="number" name="JobTwoSalary" class="h-1/12 w-4/5 border-2 border-blue-400 text-blue-400" onChange={handleSalary2Change}/>
          <select name="JobTwoState" class="h-1/12 w-4/5 border-2 border-blue-400 text-blue-400" onChange={handleCity2Change}>
            <option disabled selected value> -- select an option -- </option>
            {content}
          </select>

          <div class="h-1/12 w-4/5 bg-gradient-to-r from-blue-500 to-purple-500 hover:border-2 hover:border-b-black flex justify-center items-center" onClick={doTest}>
            <h1 class="text-xl text-white">Compare</h1>
          </div>
        </form>
      </div>
      {message}
      {/*{jsoncontent}*/}
    </>
  )
}

export default App
