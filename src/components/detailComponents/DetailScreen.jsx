import React, { useEffect, useState } from 'react'
import classes from './DetailScreen.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const DetailScreen = () => {  
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState({})
  const [ingredients, setIngredients] =useState([])
  useEffect(() => {
    axios
        .get(`https://recipes.devmountain.com/recipes/${recipeId}`)
        .then((res) => {
          setRecipe(res.data)
          console.log(res.data)
          setIngredients(res.data.ingredients || [])
        })
  }, [])
  
  
  return (
    <section>
       <div className={classes.ad_banner}
      style={{
        background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.8)),
          url(${recipe.image_url})`,
          backgroundSize: "cover",
        
      }}>
        <h1>{recipe.recipe_name}</h1>
    </div>
    <div className={classes.bottom_screen}>
      <div className={classes.recipe_ingredients_container}>
        <div className={classes.recipe}>
          <h2>Recipe</h2>
          <p>Prep Time: {recipe.prep_time} </p>
          <p>Cook Time: {recipe.cook_time} </p>
          <p>Servers: {recipe.serves}</p>
        </div>
        <div className={classes.ingredients}>
          <h2>Ingredients</h2>
            {ingredients.length > 0 ? ingredients.map(ingredient => ( 
                  <p>{ingredient.ingredient}: {ingredient.quantity}</p>
            )) :  <p>No Ingredients</p>}
        </div>
      </div>
      <div className={classes.instructions_container}>
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
    </section>
  );
};

export default DetailScreen;
