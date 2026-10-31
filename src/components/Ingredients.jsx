import Image from "next/image";

export default function IngredientsList({
    ingredients,
    recipeRef,
    ingredientRefs,
    getRecipe,
    loading,
    toggleEditMode,
    handleKeydown,
    deleteIngredient,
    dietaryRestrictions,
    setDietaryRestrictions,
}) {
    const ingredientItems = ingredients.map((ingredient) => (
        <li key={ingredient.id} className="flex justify-between items-center">
            <span
                ref={(el) => (ingredientRefs.current[ingredient.id] = el)}
                contentEditable={ingredient.isEditing}
                suppressContentEditableWarning={true}
                onKeyDown={(e) => handleKeydown(e, ingredient.id)}
                className={`${ingredient.isEditing ? "rounded-md px-5 border-2 border-black" : ""}`}
            >
                {ingredient.name}
            </span>

            <div className="flex gap-3">
                <button
                    onClick={() => toggleEditMode(ingredient.id)}
                    className="inline-flex items-center gap-1 cursor-pointer text-[#D17557]"
                >
                    {ingredient.isEditing ? (
                        <Image
                            src="/icons/save.svg"
                            alt=""
                            aria-hidden="true"
                            width={16}
                            height={16}
                        />
                    ) : (
                        <Image
                            src="/icons/edit.svg"
                            alt=""
                            aria-hidden="true"
                            width={16}
                            height={16}
                        />
                    )}
                    {ingredient.isEditing ? "Save" : "Edit"}
                </button>

                <button
                    onClick={() => deleteIngredient(ingredient.id)}
                    className="inline-flex items-center gap-1 cursor-pointer text-[#D17557]"
                >
                    <Image
                        src="/icons/delete.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                    />
                    Delete
                </button>
            </div>
        </li>
    ));

    const restrictionOptions = [
        "Vegetarian",
        "Vegan",
        "Gluten-free",
        "Dairy-free",
        "Nut-free",
        "Egg-free",
        "Soy-free",
        "Shellfish-free",
    ];

    return (
        <section className="mx-auto w-full max-w-xl mt-10">
            <h2 className="font-semibold text-2xl mb-4">Ingredients on hand:</h2>
            <ul className="list-disc list-inside pl-3 marker:text-gray-600 text-gray-600 text-base leading-relaxed space-y-3">
                {ingredientItems}
            </ul>

            <fieldset className="my-6">
                <legend className="font-semibold text-lg mb-2">
                    Dietary restrictions
                </legend>
                <div className="grid grid-cols-2 gap-2">
                    {restrictionOptions.map((restriction) => (
                        <label key={restriction} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={dietaryRestrictions.includes(restriction)}
                                onChange={(e) => {
                                    setDietaryRestrictions((prev) =>
                                        e.target.checked
                                            ? [...prev, restriction]
                                            : prev.filter((item) => item !== restriction),
                                    );
                                }}
                            />
                            {restriction}
                        </label>
                    ))}
                </div>
            </fieldset>

            {ingredients.length > 3 && (
                <div className="bg-amber-50 grid grid-cols-3 gap-4 justify-center items-center py-5 px-6 rounded-lg my-10">
                    <div ref={recipeRef} className="col-span-2">
                        <h3 className="font-medium text-base">Ready for a recipe?</h3>
                        <p className="text-sm text-[#6B7280]">
                            Generate a recipe from your list of ingredients.
                        </p>
                    </div>

                    <button
                        className="col-span-1 py-3 bg-[#D17557] text-white rounded-md text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={getRecipe}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Get recipe"}
                    </button>
                </div>
            )}
        </section>
    );
}
