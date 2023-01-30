import React, { useState, Fragment } from "react"
import classes from './RecipeCard.module.css'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Navigate, useNavigate } from 'react-router-dom'

const RecipeCard = ({recipes}) => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const clickHandler = (button) => {
      navigate(`recipe/${button.target.id}`)
      
      
    }
    
    
    
    
    
    const recipeDisplay = recipes 
          .filter((recipe, index) => {
          let title = recipe.recipe_name.toLowerCase()
          let searchParams = search.toLowerCase()
          return title.includes(searchParams) && recipe.image_url.includes('https')
        }) 
          .map((recipe) => {
            return (  
              
              <div className={classes.recipe_card} id={recipe.recipe_id}>
              <img src={recipe.image_url} />
              <h1>{recipe.recipe_name}</h1>
              <button id={recipe.recipe_id} recipe={recipe} onClick={clickHandler}>See More</button>
              </div>)
          })
          
        
        
      
    
    return (
      <Fragment>
        <span>
          <BiSearchAlt2 size="2em" color="#DA7635" />
             <input
              className={classes.home_input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a Recipe"/>
        </span>  
        <div className={classes.recipe_card_continer}>
            {recipeDisplay}
        </div>
      </Fragment>

    )
}
export default RecipeCard