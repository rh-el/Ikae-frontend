import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

interface Header {
  setFilter: (filter: string) => void;
  isLoggedIn: boolean;
}

const Header = ({ setFilter }: Header) => {
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      const mot = target.value;
      setFilter(mot);
      navigate("/");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value;
    setFilter(filter);
  };

  const inputType =
    window.location.pathname === "/" ? (
      <input
        placeholder="Recherche..."
        className="rounded-lg px-4 py-2 max-w-sm w-full text-slate-700 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 font-family-nunito "
        type="text"
        onInput={handleInput}
      ></input>
    ) : (
      <input
        placeholder="Recherche..."
        className="rounded-lg px-4 py-2 max-w-sm w-full text-slate-700 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 font-family-nunito "
        type="text"
        onKeyDown={handleKeyDown}
      ></input>
    );

  const redirection = Cookies.get('token') ? "/dashboard" : "/login"

  return (
    <>
      <div className="sticky z-10 top-0 w-full flex items-center justify-between px-4 py-2 bg-white shadow-md ">
        <Link to="/" className="rounded-lg px-4 hover:text-slate-700 text-lg ">
          ikae.
        </Link>
        {inputType}
        <div className="px-3 py-2 text-slate-700 font-medium flex ">
          <Link to="/basket" className="self-end rounded-lg px-3 py-2  hover:bg-slate-100">
            <img src="../../public/assets/img/panier.png" className="w-6" alt="" />
          </Link>
          <Link to={redirection} className="self-end rounded-lg px-3 py-2 hover:bg-slate-100">
          <img src="../../public/assets/img/profile.png" className="w-6" alt="" />
          </Link>

        </div>
      </div>
    </>
  );
};

export default Header;
