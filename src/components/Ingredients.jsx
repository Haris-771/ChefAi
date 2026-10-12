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
        <section className="mx-auto max-w-143 mt-10">
            <h2 className="font-semibold text-3xl mb-4">Ingredients on hand:</h2>
            <ul className="list-disc list-inside pl-3 marker:text-gray-600 text-gray-600 text-lg  space-y-4">
                {ingredientItems}
            </ul>

            {ingredients.length > 3 && (
                <div className="bg-[#F0EFEB] flex justify-between py-8 px-10 rounded-lg my-15">
                    <div ref={recipeRef}>
                        <h3 className="font-medium text-lg">Ready for a recipe?</h3>
                        <p className="text-sm text-[#6B7280]">
                            Generate a recipe from your list of ingredients.
                        </p>
                    </div>

                    <button
                        className="px-4.25 py-2.25 bg-[#D17557] text-white rounded-md text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        onClick={getRecipe}
                        disabled={loading}
                    >
                        {loading && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white" />
                        )}
                        {loading ? "Generating..." : "Get a recipe"}
                    </button>
                </div>
            )}
        </section>
    );
}
