interface Filter {
    handleClick: (event: any) => void;

}

const Filter = ({handleClick} : Filter) => {
    return(
        <>
        <div className="flex w-full justify-center gap-4 items-center p-10">
            <div className="flex flex-col">
                <label>Meuble</label>
                    <select name="type" onClick={(e) => handleClick(e)}>
                        <option value="">---</option>
                        <option value="canapé">Canapé</option>
                        <option value="chaise">Chaise</option>
                        <option value="lampe">Lampe</option>
                        <option value="armoire">Armoire</option>
                        <option value="tapis">Tapis</option>
                        <option value="fauteuil">Fauteuil</option>
                        <option value="table">Table</option>
                    </select>
            </div>
            <div className="flex flex-col">
                <label>Matière</label>
                    <select name="material" onClick={(e) => handleClick(e)}>
                        <option value="">---</option>
                        <option value="bois">Bois</option>
                        <option value="plastique">Plastique</option>
                        <option value="acier">Acier</option>
                        <option value="verre">Verre</option>
                        <option value="tissu">Tissu</option>
                    </select>
            </div>
            <div className="flex flex-col">
                <label>Couleur</label>
                    <select name="color" onClick={(e) => handleClick(e)}>
                        <option value="">---</option>
                        <option value="bleu">Bleu</option>
                        <option value="marron">Marron</option>
                        <option value="noir">Noir</option>
                        <option value="blanc">Blanc</option>
                        <option value="rouge">Rouge</option>
                        <option value="gris">Gris</option>
                    </select>
            </div>
            <div className="flex flex-col">
                <label>État</label>
                    <select name="state" onClick={(e) => handleClick(e)}>
                        <option value="">---</option>
                        <option value="neuf">Neuf</option>
                        <option value="très bon état">Très bon état</option>
                        <option value="bon état">Bon état</option>
                        <option value="état satisfaisant">État satisfaisant</option>
                    </select>
            </div>
         </div>
        </>
    )
}

export default Filter; 