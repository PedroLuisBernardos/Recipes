import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        cuisine: "",
        preptime: "",
        cooktime: "",
        totaltime: "",
        serves: 0,
        image: "",
        notes: "",
        sources: "",
        steps: "",
        recipes: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/recipe/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const recipe = await response.json();
            if (!recipe) {
                window.alert(`Recipe with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(recipe);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedRecipe = {
            name: form.name,
            cuisine: form.cuisine,
            preptime: form.preptime,
            cooktime: form.cooktime,
            totaltime: form.totaltime,
            serves: form.serves,
            image: form.image,
            notes: form.notes,
            sources: form.sources,
            steps: form.steps,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedRecipe),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Recipe</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cuisine">Cuisine: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cuisine"
                        value={form.cuisine}
                        onChange={(e) => updateForm({ cuisine: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preptime">Prep time: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="preptime"
                        value={form.preptime}
                        onChange={(e) => updateForm({ preptime: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cooktime">Cook time: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cooktime"
                        value={form.cooktime}
                        onChange={(e) => updateForm({ cooktime: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="totaltime">Total time: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="totaltime"
                        value={form.totaltime}
                        onChange={(e) => updateForm({ totaltime: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="serves">Serves: </label>
                    <input
                        type="number"
                        className="form-control"
                        id="serves"
                        value={form.serves}
                        onChange={(e) => updateForm({ serves: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={form.image}
                        onChange={(e) => updateForm({ image: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="notes"
                        value={form.notes}
                        onChange={(e) => updateForm({ notes: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sources">Sources: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sources"
                        value={form.sources}
                        onChange={(e) => updateForm({ sources: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="steps">Steps: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="steps"
                        value={form.steps}
                        onChange={(e) => updateForm({ steps: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Recipe"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}