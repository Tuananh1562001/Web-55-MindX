import NavBar from "./Navbar";
import Home from "./Home";
import Product from "./Product";
import AboutUs, {Members, Contact, Address} from "./AboutUs";
import { Routes, Route } from "react-router-dom"
import ProductDetail from "./ProductDetail";
import NotFound from "./NotFound";
import Users from "./User";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/products" element={<Product />}></Route>
        <Route path="/products/:id" element={<ProductDetail/>}></Route>

        <Route path="/about-us" element={<AboutUs />}>
          <Route path="members" element={<Members />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="address" element={<Address />}></Route>
        </Route>
        <Route path="/users" element={<Users/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <footer>This is my footer</footer>
    </div>
  );
}

export default App;
