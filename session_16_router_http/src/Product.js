import { Link, Outlet, useSearchParams, useNavigate } from "react-router-dom";
const Product = () => {
  const [query, setQuery] = useSearchParams()
  const navigate = useNavigate()

  return (
    <div>
      <ol>
          <li>
              <Link to="/products/1">Product 1</Link>
          </li>
          <li>
              <Link to="/products/2">Product 2</Link>
          </li>
      </ol>
      <Outlet/>
      <button onClick={() => {
        setQuery({ q: "2" }, {replace: true })
      }}>Change query</button>
      <button onClick={() => {
        navigate("/")
      }}>Go to Home</button>
    </div>  
  );
};

export default Product;
