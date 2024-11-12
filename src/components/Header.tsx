type Header = {
    setPrenom: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ setPrenom }: Header) => {



    return (
    <>
        <input type="text" onChange={(e) => setPrenom(e.target.value)}></input>
    </>
    )
}

export default Header