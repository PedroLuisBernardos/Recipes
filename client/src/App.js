import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecipeList from "./components/recipesList";
import Recipe from "./components/recipe";
import Edit from "./components/edit";
import Create from "./components/add";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecipeList />} />
                <Route path="/:id" element={<Recipe />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/add" element={<Create />} />
            </Routes>
        </div>
    );
};

export default App;