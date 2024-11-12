// type Header = {
// }

const Header = () => {



    return (
    <>
    <div className="sticky z-10 top-0 w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <a className="self-start rounded-lg px-4 py-2 hover:text-slate-700 text-slate-700 font-medium" href="/">meublio.</a>
        <input placeholder="Recherche..." className="rounded-lg px-4 py-2 max-w-sm w-full text-slate-700 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500" type="text"></input>
        <div className="self-end rounded-lg px-3 py-2 text-slate-700 font-medium">

            <a className="self-end rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" href="/basket">🛒</a>
            <a className="self-end rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" href="/login">👤</a>
        </div>
    </div>
    </>
    )
}

export default Header