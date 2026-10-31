export default function Recipe({ recipe }) {
    if (!recipe) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-xl my-10">
            <h2 className="font-semibold text-2xl mb-4">Suggested Recipe:</h2>
            <article className="text-gray-600 text-base md:text-base leading-relaxed" aria-live="polite">
                <p>Based on the ingredients you have available, here is a recipe suggestion:</p>
                <p className="mt-3 rounded-md bg-amber-50 p-3 text-sm text-black">
                    AI-generated recipes may contain missed allergens or restricted ingredients.
                    Check every ingredient and product label before preparing or eating.
                </p>

                <h3 className="font-bold text-xl text-[#e66f48] my-8">{recipe.recipeName}</h3>

                <strong className="text-lg">Ingredients:</strong>
                <ul className="mt-5 mb-15 list-disc list-inside pl-3 marker:text-gray-600 space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index}`}>{ingredient}</li>
                    ))}
                </ul>

                <strong className="text-lg">Instructions:</strong>
                <ol className="mt-5 mb-15 list-decimal list-inside pl-3 marker:text-gray-600 space-y-5">
                    {recipe.instructions.map((step, index) => (
                        <li key={`${step}-${index}`}>{step}</li>
                    ))}
                </ol>
            </article>
        </section>
    );
}