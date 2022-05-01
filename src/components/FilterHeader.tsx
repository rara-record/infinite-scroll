import styled from "styled-components";

import { useRef } from "react";
import { getPokemonById } from "api/pokemonAPI";

const FilterHeader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: {
    preventDefault: () => void;
    currentTarget: { value: any };
  }) => {
    e.preventDefault();
    const value = e.currentTarget.value;
  };

  return (
    <Container>
      <div>
        <input type="text" ref={inputRef} onChange={handleChange} />
        <button type="button">검색</button>
      </div>
    </Container>
  );
};

export default FilterHeader;

const Container = styled.div`
  margin-top: 100px;
  text-align: center;

  button {
    margin: 0 10px;
  }
`;
