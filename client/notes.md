-- Routing
-> Declare route in App.js
<Route path="/movie/:movieId" element={<MovieDetail />} />

-> Now use Link to navigate to declared route in Home.jsx.
<Link to={`/movie/${movie._id}`}>
movie._id will be put in url as declared in route above.

-> Now get the passed movieId in MovieDetail page
const { movieId } = useParams();

=> Now if we want to pass extra params then pass using query param.
<Link to={`/movie/${movie._id}?genre=${movie.genre}&language=${movie.language}`}>

-> And consume this passed param like below
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const genre = searchParams.get('genre');
  const language = searchParams.get('language');

=> There is one more way to do it using State object (for complex/sensitive data)
Pass in the Link:
<Link to={`/movie/${movie._id}`} state={{ genre: movie.genre, language: movie.language }}>

-> Receive in MovieDetail:
import { useParams, useLocation } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const { genre, language } = location.state || {};
  // ...
};

