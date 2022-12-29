import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";

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
    const [recipe, setRecipe] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    // This method fetches the recipes from the database.
    useEffect(() => {
        async function getRecipe() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/recipe/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const recipe = await response.json();
            if (!recipe) {
                window.alert(`Recipe with id ${id} not found`);
                navigate("/");
                return;
            }
            setRecipe(recipe);
        }

        getRecipe();

        return;
    }, [params.id, navigate]);

    // This method will delete a recipe
    async function deleteRecipe(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecipes = recipe.filter((el) => el._id !== id);
        setRecipe(newRecipes);
    }

    // This method will map out the recipes on the table
    function renderRecipe() {
        return (
            <Recipe
                recipe={recipe}
                deleteRecipe={() => deleteRecipe(recipe._id)}
                key={recipe._id}
            />
        );
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
                <tbody>{renderRecipe()}</tbody>
            </table>
        </div>
    );
}