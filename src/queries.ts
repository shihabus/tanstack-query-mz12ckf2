import {useQueryClient} from '@tanstack/react-query';
import {Pokemon} from './type';

export function pokemonsQuery() {
    return {
        queryKey: ['pokemons'],
        queryFn: async (): Promise < Pokemon[] > => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
            const data = await response.json();
            return data ?. results ?? [];
        }
    };
}

export function pokemonQuery(selectedPokemon : string | null) {
    const queryClient = useQueryClient();
    return {
        queryKey: [
            'pokemons', selectedPokemon
        ],
        queryFn: async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
            const data = await response.json();
            return data;
        },
        enabled: Boolean(selectedPokemon),
        // should set staleTime to non-zero to benefit from prefetch
        staleTime: Infinity,
        placeHolderData: () => {
            return queryClient.getQueryData(pokemonsQuery().queryKey)
            // @ts-ignore
            ?. find((pokemon : Pokemon) => pokemon.name === selectedPokemon);
        }
    };
}
