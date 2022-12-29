import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recipe = (props) => (
    <tr>
        <td>{props.recipe.name}</td>
        <td>{props.recipe.cuisine}</td>
        <td>{props.recipe.preptime}</td>
        <td>{props.recipe.cooktime}</td>
        <td>{props.recipe.totaltime}</td>
        <td>{props.recipe.serves}</td>
        <td>{props.recipe.image}</td>
        <td>{props.recipe.notes}</td>
        <td>{props.recipe.sources}</td>
        <td>{props.recipe.steps}</td>
        <td>
            <Link className="btn btn-link" to={`/${props.recipe._id}`}>Recipe page</Link> |
            <Link className="btn btn-link" to={`/edit/${props.recipe._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecipe(props.recipe._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    // This method fetches the recipes from the database.
    useEffect(() => {
        async function getRecipes() {
            const response = await fetch(`http://localhost:5000/recipe/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const recipes = await response.json();
            setRecipes(recipes);
        }

        getRecipes();

        return;
    }, [recipes.length]);

    // This method will delete a recipe
    async function deleteRecipe(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecipes = recipes.filter((el) => el._id !== id);
        setRecipes(newRecipes);
    }

    // This method will map out the recipes on the table
    function recipeList() {
        return recipes.map((recipe) => {
            return (
                <Recipe
                    recipe={recipe}
                    deleteRecipe={() => deleteRecipe(recipe._id)}
                    key={recipe._id}
                />
            );
        });
    }

    // This following section will display the table with the recipes of individuals.
    return (
        <div>
            <h3>Recipe List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cuisine</th>
                        <th>Prep time</th>
                        <th>Cook time</th>
                        <th>Total time</th>
                        <th>Serves</th>
                        <th>Image</th>
                        <th>Notes</th>
                        <th>Sources</th>
                        <th>Steps</th>
                    </tr>
                </thead>
                <tbody>{recipeList()}</tbody>
            </table>
        </div>
    );
}