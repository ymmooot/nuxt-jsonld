import type { NuxtApp } from '#app';

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

  app.runWithContext(() => {
    useJsonld(() => ({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: dog.name,
      description: `A ${dog.breed} dog`,
    }));
  });

  return {
    data: {
      dog,
    },
  };
};
