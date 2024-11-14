const email = "testuser@test.ts"
import bcrypt from "bcryptjs";
const clearPassword = "azertyuiop"
const cryptedPasswordHard = "$2a$10$.7CsAZ5D/YLNEKeGT0AmReANhw7ZtZVERuvU230kLX1f.MbTLXBPy"


// sur formulaire login
// récupérer email + password du user
// requête GET pour récupérer le password chiffré associé à l'email entré par l'utilisateur

///////////////////////////////////////////////////////////////////////////////////////////

// comparaison du mot de passe chiffré avec le mot de passe clair
// if true -> requête GET à la db et récupération du token
// false -> message d'erreur côté client


// passer en state??

//   useEffect(() => {
//     fetchFunction()
//   }, [])


const getPasswordFromDb = async (userEmail) => {
    const request = await fetch(`http://192.168.5.181:3000/login`, {
        method: "GET",
        headers: {
          "email": userEmail,
        },
    });
    const cryptedPassword = await request.json();
    console.log("crypted password from db: ", cryptedPassword[0].password);
    return cryptedPassword[0].password
    // setDashboardData(fetchData)
};



async function comparePassword(userPassword, cryptedPasswordFromDb) {
    console.log('userPassword', userPassword);
    console.log(cryptedPasswordFromDb);
    
    
    bcrypt.compare(userPassword, cryptedPasswordFromDb, (err, result) => {
    console.log("result of compare: ", result);  
    return result
    });
}



// fetch à passer en useEffect?
async function execOrder() {
    const dbPassword = await getPasswordFromDb(email)
    console.log(dbPassword);
    
    const result = await comparePassword(clearPassword, dbPassword)
    // console.log(result);
    
}

execOrder()




// const requestToken = async () => {
//     const request = await fetch("http://192.168.5.181:3000/test");
//     const token = request.json()
//     return token
// }


// comparePassword(clearPassword, dbPassword)

