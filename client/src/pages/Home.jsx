import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { jtwToken } from '../constants/authToken';
import { Link } from 'react-router-dom';


const itemsPerPage = 9;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const displayMovies = filteredMovies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5001/api/movie", {
      headers: {
        jwttoken: jtwToken
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if(data.success) {
          setMovies(data.data);
        } else {
          window.alert('Error: ' + data.message);
        }
      })
      .catch((e) => {
        setLoading(false);
        window.alert(e.message);
      });
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Movies</h2>
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayMovies.map((movie) => (
            <Link to={`/movie/${movie._id}`}>
              {/* Navigate to movie detail page and put movie id in url and we can get it using useParams in MovieDetail.jsx. Its route is already defined in App.js */}
              {/* <Route path="/movie/:movieId" element={<MovieDetail />} /> */}
              <div key={movie._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <p className="text-gray-600">{movie.language.join(', ')}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
        {loading ? (
          <div className="text-center mt-6">
            <p>Loading movies...</p>
          </div>
        ) : movies.length === 0 && (
          <div className="text-center mt-6">
            <p>No movies</p>
          </div>
        )}
        {movies?.length > 0 && (
          <div className="mt-6 flex justify-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredMovies.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
