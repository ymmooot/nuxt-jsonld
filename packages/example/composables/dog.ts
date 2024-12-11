type Dog = {
  breed: string;
  name: string;
  age: number;
};

export const useDog = async () => {
  const app = useNuxtApp();

  // fetch Dog data
  await new Promise((res) => setTimeout(res, 100));
  const dog: Dog = {
    breed: 'Golden Retriever',
    name: 'Buddy',
    age: 5,
  };

  // Note: This jsonld will not disappear even after page transition.
  // If you want to link it to the page, use useJsonld in the component side.
  app.runWithContext(() => {
    useJsonld(() => ({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: dog.name,
      description: `A ${dog.breed} dog: not linked to the page`,
    }));
  });

  return {
    dog,
  };
};
