import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PokemonCard = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <Container>
      <Link to={`/pokemons/${pokemon.name}`}>
        <h1># {pokemon.name}</h1>
      </Link>
    </Container>
  );
};

export default PokemonCard;

const Container = styled.li``;
