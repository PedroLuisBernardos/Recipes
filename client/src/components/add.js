import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
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
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new recipe to the database.
        const newPerson = { ...form };

        await fetch("http://localhost:5000/recipe/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", cuisine: "", preptime: "", cooktime: "", totaltime: "", serves: 0, image: "", notes: "", sources: "", steps: "" });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create new Recipe</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cuisine">Cuisine</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cuisine"
                        value={form.cuisine}
                        onChange={(e) => updateForm({ cuisine: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preptime">Prep time</label>
                    <input
                        type="text"
                        className="form-control"
                        id="preptime"
                        value={form.preptime}
                        onChange={(e) => updateForm({ preptime: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cooktime">Cook time</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cooktime"
                        value={form.cooktime}
                        onChange={(e) => updateForm({ cooktime: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="totaltime">Total time</label>
                    <input
                        type="text"
                        className="form-control"
                        id="totaltime"
                        value={form.totaltime}
                        onChange={(e) => updateForm({ totaltime: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="serves">Serves</label>
                    <input
                        type="number"
                        className="form-control"
                        id="serves"
                        value={form.serves}
                        onChange={(e) => updateForm({ serves: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={form.image}
                        onChange={(e) => updateForm({ image: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <input
                        type="text"
                        className="form-control"
                        id="notes"
                        value={form.notes}
                        onChange={(e) => updateForm({ notes: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sources">Sources</label>
                    <input
                        type="text"
                        className="form-control"
                        id="sources"
                        value={form.sources}
                        onChange={(e) => updateForm({ sources: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="steps">Steps</label>
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
                        value="Create recipe"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}