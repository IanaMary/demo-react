import React, { useEffect, useState } from "react";
import "./Filmes.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;

const Filmes = () => {
  const [filmes, setFilmes] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setFilmes(data.results || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="filmes-container">
      <h1>Filmes Populares</h1>
      {filmes.length > 0 ? (
        <ul className="filmes-list">
          {filmes.map((filme) => (
            <li key={filme.id} className="filme-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
                alt={filme.title}
              />
              <p>{filme.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
};

export default Filmes;
