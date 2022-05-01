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

      {isLoading && <div className="loading">Loading ! ❤️</div>}

      {!hasNextPage && !isLoading && (
        <div>
          Congrats! You have scrolled through all the tutorials. You rock! 🤘
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
  무한 스크롤 구현하기, 이 문서의 마지막은 어디인가를 판별
  맨 마지막에 빈 값을 두고,   
  intersectionObserver 를 활용하여그걸 관찰함

  useInfiniteQuery(queryKey, API, getNextPageParam(lastpage, allpage))
  - queryKey : 해당값이 변하면 재조회를 돌린다. 값의 변동이 없을때는 api 통신 없이 
  캐시에서 데이터를 불러온다. 
  - API : 조회 할 API
  - getNextPageParam(마지막으로 fetch한 페이지, 지금까지 부른 모든 페이지들의 배열)
     1. 다음 페이지 조회를 위한 API 파라미터 셋팅을 하거나
     2. refetch 조건을 걸어줌
  
  useInfiniteQuery 반환값
  - status : api Status (loading, succes, error)
  - data : response 데이터
  - fetchNextPage : 다음 페이지 조회를 위한 action
  - hasNextPage : 다음 페이지 조회 가능 여부 
  - isFetchingNextPage: 페이징 loading중 일때 감지 (status)
*/
