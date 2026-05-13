import Logo from "./Logo";

const Header = () => {
  return (
    <header className="py-4">
      <div className="container flex items-center justify-between">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
