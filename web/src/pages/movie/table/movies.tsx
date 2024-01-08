import { FC } from "react";

import { Types } from "modules/movie";

import Movie from "./movie";

interface MoviesProps {
  onDelete: ({ movieId }: Types.IApi.Movie.Delete.Request) => Promise<void>;
  movies: Types.IEntity.Movie[];
}

const Movies: FC<MoviesProps> = ({ movies, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Owner</th>
          <th>Stock</th>
          <th>Rate</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => {
          return (
            <Movie
              key={movie.title}
              id={movie.id}
              title={movie.title}
              genre={`${movie.genre.name}`}
              owner={movie.owner}
              stock={movie.stock}
              rate={movie.rate}
              onDelete={onDelete}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Movies;
