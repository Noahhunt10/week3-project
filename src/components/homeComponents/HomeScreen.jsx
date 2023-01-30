import React, { useEffect, useState } from 'react'
import AdBanner from './AdBanner'
import axios from 'axios'
import RecipeCard from '../RecipeCard'
import classes from './HomeScreen.module.css'

const HomeScreen = () => {  
  const [recipes, setRecipes] = useState([])
  
  
  const getRecipes = () => {
    axios
        .get(`https://recipes.devmountain.com/recipes`)
        .then((res) => {
          setRecipes(res.data)
    })
  }
  
  useEffect(() =>{
    getRecipes()
  },[])
  
  
  
  return (
    <div className={classes.homescreen}>
      <AdBanner />
      <RecipeCard recipes={recipes}/>
    </div>
  )
}

export default HomeScreen