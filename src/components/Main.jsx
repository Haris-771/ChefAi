"use client";

import { useState, useRef, useEffect } from "react";
import IngredientsList from "./Ingredients";
import Recipe from "./Recipe";

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const recipeSection = useRef(null);
    const ingredientRefs = useRef({});

    //for auto-scroll
    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipe]);

    //auto focus on editing ingredient
    useEffect(() => {
        const activeItem = ingredients.find((item) => item.isEditing);

        if (activeItem && ingredientRefs.current[activeItem.id]) {
            const el = ingredientRefs.current[activeItem.id];
            el.focus();

            //focus at the end
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(el);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }, [ingredients]);

    const addIngredient = (formData) => {
        const newIngredient = formData.get("ingredient");

        if (!newIngredient || !newIngredient.trim()) return;

        setIngredients((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name: newIngredient.trim(),
                isEditing: false,
            },
        ]);
    };

    const getRecipe = async () => {
        if (!ingredients.length) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ingredients: ingredients.map((item) => item.name),
                    dietaryRestrictions: dietaryRestrictions,
                }),
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

    const toggleEditMode = (id) => {
        const ingredient = ingredients.find(item => item.id === id);

        if(!ingredient) return;

        //save
        if(ingredient.isEditing){
            const newText = ingredientRefs.current[id].innerText.trim();

            if(!newText) return;

            setIngredients(prev => 
                prev.map(item => 
                    item.id === id?
                {
                    ...item,
                    name: newText,
                    isEditing: false
                } : item
            ));
            return;
        }

        //discard changes if click on another edit
        const currentlyEditing = ingredients.find(item => item.isEditing);

        if(currentlyEditing){
            const editingElement = ingredientRefs.current[currentlyEditing.id];

            if(editingElement){
                editingElement.textContent = currentlyEditing.name;
            }
        }

        //toggle
        setIngredients(prev =>
            prev.map(item => ({
                ...item,
                isEditing: item.id === id
            }
        ))
        );
    };

    //save by key
    const handleKeydown = (e, id) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newText = ingredientRefs.current[id].innerText.trim();

            if (!newText) return;

            setIngredients(prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, name: newText, isEditing: false }
                        : item,
                ),
            );
        }

        if (e.key === "Escape") {
            e.preventDefault();
            const ingredient = ingredients.find(item => item.id === id);
            const element = ingredientRefs.current[id];

            if(ingredient && element){
                element.textContent = ingredient.name;
            }

            setIngredients( prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, isEditing: false }
                        : item,
                ),
            );
        }
    };

    const deleteIngredient = (id) => {
        setIngredients(prev => 
            prev.filter(item => item.id !== id)
        );
    };

    return (
        <main className="my-18 mx-5">
            <form
                action={addIngredient}
                className="mx-auto w-full max-w-xl grid grid-cols-3 gap-1 justify-center"
            >
                <input
                    type="text"
                    aria-label="Add ingredients"
                    placeholder="e.g oregano"
                    name="ingredient"
                    className="col-span-2 w-full border border-gray-300 rounded-md py-2.5 px-3.5 shadow-xs text-base focus:outline-2 focus:outline-black"
                />
                <button
                    type="submit"
                    className="col-span-1 w-full bg-black text-[#FAFAF8] rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-gray-800"
                >
                    Add Ingredient
                </button>
            </form>

            {ingredients.length === 0 && (
                <p className="text-base italic text-gray-800 flex justify-center text-center my-20">
                    Create a recipe from the ingredients you have on hand
                </p>
            )}
            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    recipeRef={recipeSection}
                    ingredientRefs={ingredientRefs}
                    getRecipe={getRecipe}
                    loading={loading}
                    toggleEditMode={toggleEditMode}
                    handleKeydown={handleKeydown}
                    deleteIngredient={deleteIngredient}
                    dietaryRestrictions={dietaryRestrictions}
                    setDietaryRestrictions={setDietaryRestrictions}
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
