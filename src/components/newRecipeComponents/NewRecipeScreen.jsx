import React, { useState } from "react";
import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import classes from './NewRecipeScreen.module.css'
const NewRecipeScreen = () => {
  const initialValues = {
    type: '',
    recipeName: '',
    imageURL: '',
    prepTime: '',
    cookTime: '',
    serves: '',
    ingredients: [],
    instructions: ''
  }
const [ingredients, setIngredients] = useState([])
const [name, setName] = useState('')
const [quantity, setQuantity] = useState('')


const addIngredients = () => {
  setIngredients([...ingredients, {name,quantity}])
  setName('')
  setQuantity('')
}


const onSubmit = (values, actions) => {
  values.ingredients = ingredients
  axios
    .post(`https://recipes.devmountain.com/recipes`, values)
    .then(() => {
      actions.resetForm({
        values: initialValues
        }
      )
      setIngredients([])
      .catch((err) => {
        console.error(err)
      })
    })
}




  return (
    <section className={classes.form_section}>
      <h1 className={classes.h1}>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} >
        {({values, handleChange, handleSubmit}) => (
        <Form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.name_img_container}>
            <Field 
              className={classes.name_input}
              placeholder="Name"
              value={values.recipeName}
              onChange={handleChange}
              name="recipeName"
            />
            <Field
              className={classes.name_input}
              placeholder="Image URL"
              value={values.imageURL}
              onChange={handleChange}
              name="imageURL"
            />
          </div>
          <div className={classes.radioButton_container}>
          <div className={classes.radio_container}>
            <Field
            className={classes.radio}
              type='radio'
              value='Cook'
              onChange={handleChange}
              name="type"
            />
            <h5>Cook</h5>
            </div>
            <div className={classes.radio_container}>
            <Field
              className={classes.radio}
              type='radio'
              value='Bake'
              onChange={handleChange}
              name="type"
            />
            <h5>Bake</h5>
            </div>
            <div className={classes.radio_container}>
            <Field
              className={classes.radio}
              type='radio'
              value='Drink'
              onChange={handleChange}
              name="type"
            />
            <h5>Drink</h5>
            </div>
          </div>
          <div className={classes.prep_cook_serves_container}>
            <Field
              className={classes.prep_cook_serves_input}
              placeholder="Prep Time"
              value={values.prepTime}
              onChange={handleChange}
              name="prepTime"
            />
            <Field
              className={classes.prep_cook_serves_input}  
              placeholder="Cook Time"
              value={values.cookTime}
              onChange={handleChange}
              name="cookTime"
            />
            <Field
              className={classes.prep_cook_serves_input}
              placeholder="Servings"
              value={values.serves}
              onChange={handleChange}
              name="serves"
            />
          </div>
          <div className={classes.ing_container}>
          <div className={classes.ing_quantity_container}>
            <Field
            className={classes.name_input}
              placeholder="Ingredient"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Field
              className={classes.name_input}
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
            
            <ul>
                {ingredients.map((ing) => {
                  return <li className={classes.ingredients}>{ing.quantity} {ing.name}</li>
                  })}
            </ul>
            </div>
            <button
              className={classes.ing_button}
              type="button"
              onClick={addIngredients}
              >Add More
            </button>
            <textarea 
              placeholder="What are the instructions?"
              value={values.instructions}
              onChange={handleChange}
              name="instructions"
              rows={3}/>
            <button 
            className={classes.sub_button}
            type="submit">Submit</button>
        </Form>
      )}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;
