import { FC } from "react";

import { Types } from "modules/movie";

interface GenresProps {
  genres: Types.IEntity.Genre[];
  onOpen: () => void;
  onGenre: (genreName: string) => void;
}

const Genres: FC<GenresProps> = ({ genres, onOpen, onGenre }) => {
  return (
    <ul className="list-group">
      <li
        role="button"
        className="list-group-item"
        onClick={() => onGenre("all")}
      >
        All Genres
      </li>

      {genres.map((genre) => {
        return (
          <li
            key={genre.id}
            role="button"
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => onGenre(genre.name)}
          >
            {genre.name}
          </li>
        );
      })}

      <li
        role="button"
        className="list-group-item text-center text-primary fw-bold"
        onClick={onOpen}
      >
        Genre ➕
      </li>
    </ul>
  );
};

export default Genres;
