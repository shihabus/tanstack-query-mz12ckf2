import { useQuery, useQueryClient } from '@tanstack/react-query';
import { pokemonQuery, pokemonsQuery } from './queries';
import { Error, Loader } from './common';
import { Button } from './components';
import { useState } from 'react';

export default function PokemonList() {
  // fetch list and show as buttons
  const [pokemon, setPokemon] = useState(null);
  const queryClient = useQueryClient();
  const { data, isFetching, isError } = useQuery(pokemonsQuery());

  if (isError) return <Error />;

  if (isFetching) return <Loader />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <section>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {data?.map((pokemon) => (
            <Button
              key={pokemon.name}
              onClick={() => setPokemon(pokemon.name)}
              onMouseEnter={() => {
                // prefetch
                // queryClient.prefetchQuery(pokemonQuery(pokemon.name));
              }}
            >
              {pokemon.name}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <PokemonDetails pokemon={pokemon} />
      </section>
    </div>
  );
}

const PokemonDetails = ({ pokemon }) => {
  const { data, isFetching, isError } = useQuery(pokemonQuery(pokemon));

  if (!pokemon) return null;

  const Card = () => {
    if (isError) return <Error />;
    if (isFetching) return <Loader />;

    return (
      <article>
        <div
          style={{
            background: 'darkgoldenrod',
            padding: '10px 15px',
            width: 'fit-content',
            borderRadius: '8px',
          }}
        >
          <img width="200" src={data?.sprites?.front_shiny} alt={pokemon} />
          <hr />
          <p>Height {data?.height}</p>
          <p>Weight {data?.weight}</p>
        </div>
      </article>
    );
  };

  return (
    <>
      {/* accessed from placeholder */}
      <h4>Name: {pokemon}</h4>
      <Card />
    </>
  );
};
