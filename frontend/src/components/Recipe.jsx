export default function Recipe({ recipe }) {
    if (!recipe) {
        return null;
    }

    return (
        <section className="mx-auto max-w-143 my-15">
            <h2 className="font-semibold text-3xl mb-4">Suggested Recipe:</h2>
            <article className="text-gray-600 text-lg" aria-live="polite">
                <p>Based on the ingredients you have available, here is a recipe suggestion:</p>

                <h3 className="font-bold text-lg mt-8 mb-4">{recipe.recipeName}</h3>

                <strong>Ingredients:</strong>
                <ul className="mt-5 mb-15 list-disc list-inside pl-3 marker:text-gray-600 space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index}`}>{ingredient}</li>
                    ))}
                </ul>

                <strong>Instructions:</strong>
                <ol className="mt-5 mb-15 list-decimal list-inside pl-3 marker:text-gray-600 space-y-5">
                    {recipe.instructions.map((step, index) => (
                        <li key={`${step}-${index}`}>{step}</li>
                    ))}
                </ol>
            </article>
        </section>
    );
}