export default function IngredientsList({
    ingredients,
    recipeRef,
    getRecipe,
    loading,
}) {
    const ingredientItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    return (
        <section className="mx-auto w-full max-w-xl mt-10">
            <h2 className="font-semibold text-xl md:text-2xl mb-4">Ingredients on hand:</h2>
            <ul className="list-disc list-inside pl-3 marker:text-gray-600 text-gray-600 text-sm md:text-base space-y-4">
                {ingredientItems}
            </ul>

            {ingredients.length > 3 && (
                <div className="bg-[#F0EFEB] grid grid-cols-3 gap-4 justify-center items-center py-5 px-6 rounded-lg my-10">
                    <div ref={recipeRef} className="col-span-2">
                        <h3 className="font-medium text-base">Ready for a recipe?</h3>
                        <p className="text-sm text-[#6B7280]">
                            Generate a recipe from your list of ingredients.
                        </p>
                    </div>

                    <button
                        className="col-span-1 h-15 md:h-10 bg-[#D17557] text-white rounded-md text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
