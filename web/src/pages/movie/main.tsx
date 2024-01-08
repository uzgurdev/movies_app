import { Component } from "react";

import { Api, Mappers, Types } from "modules/movie";

import { Loader } from "components";
import Modal from "components/modal";
import Pagination from "components/pagination";

import Genres from "./genres";
import { Movies } from "./table";
import { Link } from "react-router-dom";

interface MainState {
  show: boolean;
  movies: Types.IEntity.Movie[];
  genres: Types.IEntity.Genre[];
  originalMovies: Types.IEntity.Movie[];
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
}

class Main extends Component<{}, MainState> {
  state: MainState = {
    movies: [],
    genres: [],
    originalMovies: [],
    isLoading: true,
    show: false,
    currentPage: 1,
    itemsPerPage: 5,
  };

  async componentDidMount() {
    const { data } = await Api.Movie.List();
    const { data: genreData } = await Api.Genre.List();

    const movies = data.map((movie) => Mappers.Movie(movie));
    const genres = genreData.map((genre) => Mappers.Genre(genre));

    this.setState({ movies, genres, originalMovies: movies, isLoading: false });
  }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState((prevState) => {
      if (value.trim() || value === "") {
        const filteredMovies = prevState.originalMovies.filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        );

        return { movies: filteredMovies };
      } else return { movies: prevState.originalMovies };
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ show: !prevState.show }));
  };

  handleGenre = (genreName: string) => {
    this.setState((prevState) => {
      if (genreName === "all") return { movies: prevState.originalMovies };
      else
        return {
          movies: prevState.originalMovies.filter(
            (movie) => movie.genre.name === genreName
          ),
        };
    });
  };

  onNext = (index: number) => {
    this.setState({ currentPage: index + 1 });
  };
  handlePrev = () => this.setState({ currentPage: 1 });
  handleNext = (page: number) => this.setState({ currentPage: page });

  handleDeleteMovie = async ({ movieId }: Types.IApi.Movie.Delete.Request) => {
    await Api.Movie.Delete({ movieId });
    const { data } = await Api.Movie.List();
    const movies = data.map((movie) => Mappers.Movie(movie));
    this.setState({ movies });
  };

  render() {
    const { movies, genres, isLoading, currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);
    const pagination = Math.ceil(movies.length / itemsPerPage);

    if (isLoading) return <Loader height={200} />;

    return (
      <div className="container">
        <Modal show={this.state.show} onClose={this.toggleModal} />
        <div className="row">
          <div className="col-3">
            <Genres
              genres={genres}
              onOpen={this.toggleModal}
              onGenre={this.handleGenre}
            />
          </div>
          <div className="col">
            <div className="header">
              <p>
                Showing <b>{movies.length} movies</b> in the database.
              </p>
              <div className="form d-flex justify-content-evenly align-items-center gap-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a movie..."
                  onChange={this.handleSearch}
                />

                <Link
                  to={"/movies/new"}
                  className="btn btn-primary"
                  style={{ minWidth: "max-content" }}
                >
                  Add Movie
                </Link>
              </div>
            </div>

            <Movies movies={currentItems} onDelete={this.handleDeleteMovie} />

            <Pagination
              pagination={pagination}
              handlePrev={this.handlePrev}
              handleNext={this.handleNext}
              onNext={this.onNext}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              movies={this.state.movies}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
