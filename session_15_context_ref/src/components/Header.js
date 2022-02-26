import MenuBar from "./MenuBar";
const Header = () => {
  return (
    <div className="flex justify-between items-center border">
      <div>BookStore</div>
      <MenuBar/>
    </div>
  );
};

export default Header