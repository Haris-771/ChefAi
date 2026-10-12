"use client";

import { useState, useRef, useEffect } from "react";
import IngredientsList from "./Ingredients";
import Recipe from "./Recipe";

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const recipeSection = useRef(null);
    
    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    const addIngredient = (formData) => {
        const newIngredient = formData.get("ingredient");

        if (!newIngredient || !newIngredient.trim()) {
            return;
        }

        setIngredients((prev) => [...prev, newIngredient.trim()]);
    };

    const getRecipe = async () => {
        if (!ingredients.length) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredients }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate recipe");
            }

            setRecipe(data);
        } catch (err) {
            setError(err.message || "Failed to get recipe.");
            setRecipe(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="my-18 mx-8">
            <form action={addIngredient} className="flex justify-center gap-3">
                <input
                    type="text"
                    aria-label="Add ingredients"
                    placeholder="e.g oregano"
                    name="ingredient"
                    className="border border-gray-300 rounded-md py-2.5 px-3.5 shadow-xs flex-1 min-w-37.5 max-w-100 text-sm focus:outline-hidden focus:border-black"
                />
                <button
                    type="submit"
                    className="w-40 bg-black text-[#FAFAF8] rounded-md text-sm font-medium cursor-pointer"
                >
                    + Add Ingredients
                </button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    recipeRef={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    loading={loading}
                />
            )}

            {loading && !recipe && (
                <div className="mt-10 flex items-center justify-center gap-3 text-[#D17557]">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-[#D17557]" />
                    <span className="text-base font-medium">Cooking up a recipe...</span>
                </div>
            )}

            {error && <p className="text-red-600 text-center mt-8">{error}</p>}

            {recipe && <Recipe recipe={recipe} />}
        </main>
    );
}
