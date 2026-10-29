export default function Recipe({ recipe }) {
    if (!recipe) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-xl my-10">
            <h2 className="font-semibold text-xl md:text-2xl mb-4">Suggested Recipe:</h2>
            <article className="text-gray-600 text-sm md:text-base" aria-live="polite">
                <p>Based on the ingredients you have available, here is a recipe suggestion:</p>

                <h3 className="font-bold text-lg md:text-xl text-[#e66f48] my-8">{recipe.recipeName}</h3>

                <strong className="text-base md:text-lg">Ingredients:</strong>
                <ul className="mt-5 mb-15 list-disc list-inside pl-3 marker:text-gray-600 space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index}`}>{ingredient}</li>
                    ))}
                </ul>

                <strong className="text-base md:text-lg">Instructions:</strong>
                <ol className="mt-5 mb-15 list-decimal list-inside pl-3 marker:text-gray-600 space-y-5">
                    {recipe.instructions.map((step, index) => (
                        <li key={`${step}-${index}`}>{step}</li>
                    ))}
                </ol>
            </article>
        </section>
    );
}