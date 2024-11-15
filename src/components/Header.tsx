import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

interface Header {
  setFilter: (filter: string) => void;
  isLoggedIn: boolean;
}

const Header = ({ setFilter, isLoggedIn }: Header) => {
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
        className="rounded-lg px-4 py-2 max-w-sm w-full text-slate-700 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
        type="text"
        onInput={handleInput}
      ></input>
    ) : (
      <input
        placeholder="Recherche..."
        className="rounded-lg px-4 py-2 max-w-sm w-full text-slate-700 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
        type="text"
        onKeyDown={handleKeyDown}
      ></input>
    );

  return (
    <>
      <div className="sticky z-10 top-0 w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <Link to="/" className="self-start rounded-lg px-4 py-2 hover:text-slate-700 text-slate-700 font-medium">
          meublio.
        </Link>
        {inputType}
        <div className="self-end rounded-lg px-3 py-2 text-slate-700 font-medium">
          <Link to="/basket" className="self-end rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
            🛒
          </Link>
          {isLoggedIn ? (
              <Link to="/dashboard" className="self-end rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">👤</Link>
            ) : (
              <Link to="/login" className="self-end rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">👤</Link>
            )
          }

        </div>
      </div>
    </>
  );
};

export default Header;
