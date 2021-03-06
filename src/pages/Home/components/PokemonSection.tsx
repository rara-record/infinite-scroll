import styled from "styled-components";
import PokemonList from "components/PokemonList";

import { getPokemon } from "api/pokemonAPI";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "hook/useIntersectionObserver";

const PokemonSection = () => {
  const {
    data,
    isSuccess,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery("pokemon", getPokemon, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    isIntersecting && fetchNextPage();
  };

  const { setTarget } = useIntersectionObserver({
    onIntersect,
    enabled: !!hasNextPage,
  });

  return (
    <Container>
      {isSuccess && <PokemonList data={data.pages} />}

      <div ref={setTarget}>{isFetchingNextPage ? "Loading more..." : ""}</div>

      {isLoading && <div className="loading">Loading ! โค๏ธ</div>}

      {!hasNextPage && !isLoading && (
        <div>
          Congrats! You have scrolled through all the tutorials. You rock! ๐ค
        </div>
      )}
    </Container>
  );
};

export default PokemonSection;

const Container = styled.section`
  max-width: 980px;
  min-height: 100vh;
  margin: 50px auto;

  .loading {
    text-align: center;
  }
`;

/*
  ๋ฌดํ ์คํฌ๋กค ๊ตฌํํ๊ธฐ, ์ด ๋ฌธ์์ ๋ง์ง๋ง์ ์ด๋์ธ๊ฐ๋ฅผ ํ๋ณ
  ๋งจ ๋ง์ง๋ง์ ๋น ๊ฐ์ ๋๊ณ ,   
  intersectionObserver ๋ฅผ ํ์ฉํ์ฌ๊ทธ๊ฑธ ๊ด์ฐฐํจ

  useInfiniteQuery(queryKey, API, getNextPageParam(lastpage, allpage))
  - queryKey : ํด๋น๊ฐ์ด ๋ณํ๋ฉด ์ฌ์กฐํ๋ฅผ ๋๋ฆฐ๋ค. ๊ฐ์ ๋ณ๋์ด ์์๋๋ api ํต์  ์์ด 
  ์บ์์์ ๋ฐ์ดํฐ๋ฅผ ๋ถ๋ฌ์จ๋ค. 
  - API : ์กฐํ ํ  API
  - getNextPageParam(๋ง์ง๋ง์ผ๋ก fetchํ ํ์ด์ง, ์ง๊ธ๊น์ง ๋ถ๋ฅธ ๋ชจ๋  ํ์ด์ง๋ค์ ๋ฐฐ์ด)
     1. ๋ค์ ํ์ด์ง ์กฐํ๋ฅผ ์ํ API ํ๋ผ๋ฏธํฐ ์ํ์ ํ๊ฑฐ๋
     2. refetch ์กฐ๊ฑด์ ๊ฑธ์ด์ค
  
  useInfiniteQuery ๋ฐํ๊ฐ
  - status : api Status (loading, succes, error)
  - data : response ๋ฐ์ดํฐ
  - fetchNextPage : ๋ค์ ํ์ด์ง ์กฐํ๋ฅผ ์ํ action
  - hasNextPage : ๋ค์ ํ์ด์ง ์กฐํ ๊ฐ๋ฅ ์ฌ๋ถ 
  - isFetchingNextPage: ํ์ด์ง loading์ค ์ผ๋ ๊ฐ์ง (status)
*/
