import React, { useState, useEffect } from "react";
import axios from "axios";

const YOUR_APP_ID = "6c8956b9";
const YOUR_APP_KEY = "a2a6ce308de52f5688b2f0db7594265d";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  

  const getRecipes = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  
  useEffect(() => {
    getRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <header>
        <h1>Food Recipe App</h1>
      </header>
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div className="recipe" key={recipe.recipe.label}>
            <h2>{recipe.recipe.label}</h2>
            <img
              className="recipe-image"
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
            />
            <ul className="ingredients">
              {recipe.recipe.ingredients.map((ingredient) => (
                <li key={ingredient.text}>{ingredient.text}</li>
              ))}
            </ul>
            <a className="recipe-link" href={recipe.recipe.url}>
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;