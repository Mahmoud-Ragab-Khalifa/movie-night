import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="py-4">
      <div className="container flex items-center justify-between">
        <Logo />

        <Navbar />

        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
