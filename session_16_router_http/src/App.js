import NavBar from "./Navbar";
import Home from "./Home";
import Product from "./Product";
import AboutUs, {Members, Contact, Address} from "./AboutUs";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Product />}/>
        <Route path="/about-us" element={<AboutUs />}>
          <Route path="members" element={<Members />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="address" element={<Contact />}></Route>
        </Route>
      </Routes>
      <footer>This is my footer</footer>
    </div>
  );
}

export default App;
