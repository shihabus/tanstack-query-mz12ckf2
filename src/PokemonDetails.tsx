import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { pokemonsQuery, pokemonQuery } from './queries';

function PokemonDetails() {
  const queryClient = useQueryClient();

  const { data, isError, isPending } = useQuery(pokemonsQuery());

  if (isPending) return <p>Loading....</p>;

  if (isError) return <p>Error</p>;

  return (
    <div className="App">
      <h3>Pokemon</h3>
      <PokemonSelect pokemons={data} />
    </div>
  );
}

const PokemonSelect = ({ pokemons }: { pokemons: any[] }) => {
  const [selection, setSelection] = useState<null | string>(
    () => pokemons?.[0]?.name
  );

  const { data, isError, isPending, isFetched, isStale, isFetching } = useQuery(
    pokemonQuery(selection)
  );

  return (
    <>
      <label htmlFor="Pokemon">Choose a Pokemon: </label>
      <select
        name="Pokemon"
        id="Pokemon"
        onChange={(e) => setSelection(e.target.value)}
      >
        {pokemons?.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {isFetching ? <p>Loading....</p> : null}

      {!isPending && !isError && !isFetching ? (
        <>
          <div
            style={{
              border: '1px solid red',
              width: 'fit-content',
              borderRadius: '10px',
              marginBlockStart: '10px',
            }}
          >
            <img width="200" src={data?.sprites?.front_shiny} alt="Bulbasaur" />
          </div>
          {isStale ? <p>Data can be stale</p> : null}
        </>
      ) : null}
    </>
  );
};

export default PokemonDetails;
