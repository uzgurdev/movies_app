import { Context } from "modules/auth";
import { Types } from "modules/movie";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

interface MovieProps {
  id: string;
  title: string;
  genre: string;
  owner: string;
  stock: number;
  rate: number;
  onDelete: ({ movieId }: Types.IApi.Movie.Delete.Request) => Promise<void>;
}

const Movie: React.FC<MovieProps> = ({
  id,
  title,
  genre,
  owner,
  stock,
  rate,
  onDelete,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const { user } = useContext(Context);

  return (
    <tr id={id}>
      <th>
        <Link to={`/movies/${id}`}>{title}</Link>
      </th>
      <td>{genre}</td>
      <td>{owner}</td>
      <td>{`${stock}`}</td>
      <td>{`${rate}`}</td>
      <td>
        <button className="btn" onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? "💚" : "💛"}
        </button>
      </td>
      <td>
        {user?.email === "ars@domain.com" ? (
          <button
            className="btn btn-danger"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();

              const elm = document.getElementById(id);
              if (elm) {
                elm.style.display = "none";
                onDelete({ movieId: id });
              }
            }}
          >
            Delete
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default Movie;
