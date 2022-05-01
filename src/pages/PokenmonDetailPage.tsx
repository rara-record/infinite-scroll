import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonById } from "api/pokemonAPI";

const PokenmonDetailPage = () => {
  const [name, setName] = useState<string>("");
  const { pokemonId } = useParams();

  useEffect(() => {
    getPokemonById(String(pokemonId)) //
      .then((response) => setName(response.name));
  }, [pokemonId]);

  return <div>{name && <h1>포켓몬 이름 : {name}</h1>}</div>;
};

export default PokenmonDetailPage;
