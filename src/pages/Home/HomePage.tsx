import styled from "styled-components";

import PokemonSection from "pages/Home/components/PokemonSection";
import FilterHeader from "components/FilterHeader";

const Home = () => {
  return (
    <Container>
      <FilterHeader />
      <PokemonSection />
    </Container>
  );
};

export default Home;

const Container = styled.div``;
