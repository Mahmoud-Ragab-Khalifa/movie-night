import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="sticky z-50 top-0 left-0 w-full py-5">
      <div className="container flex items-center justify-between">
        <Logo />

        <Navbar />

        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
