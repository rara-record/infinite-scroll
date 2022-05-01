import styled, { css } from "styled-components";
import PokemonCard from "./PokemonCard";

import { useEffect } from "react";
import { IPokemon } from "types/pokemon";
import { useRef } from "react";
import { useState } from "react";

const PokemonList = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    containerRef.current && setIsOn(true);
  }, []);

  return (
    <Container ref={containerRef} isOn={isOn}>
      {data && (
        <ul>
          {data.map((pokemons: { response: IPokemon[] }) =>
            pokemons.response.map((pokemon: IPokemon, index: number) => (
              <PokemonCard key={index} pokemon={pokemon} />
            ))
          )}
        </ul>
      )}
    </Container>
  );
};

export default PokemonList;

const Container = styled.div<{ isOn: boolean }>`
  transform: translateY(200px);
  opacity: 0;
  transition: all 1s ease-in-out;

  ${(props) =>
    props.isOn &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}

  h1 {
    padding: 10px 0;
    text-align: center;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  li {
    flex: 1;
    min-width: 250px;
    padding: 50px;
    border: 1px solid #999;
  }
`;
