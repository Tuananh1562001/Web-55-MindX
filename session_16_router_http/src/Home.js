import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      This is my home page <Link to="/about-us">Go to AboutUs</Link>
    </div>
  );
};

export default Home;
