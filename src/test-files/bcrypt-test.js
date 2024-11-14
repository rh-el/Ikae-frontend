import bcrypt from "bcryptjs";
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let cryptedPassword = ""

function generate() {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
            // Store hash in your password DB.
            cryptedPassword = hash
            console.log("in gen, crypted: ", cryptedPassword);
            return hash
        });
    })
    
};

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("azertyuiop", salt);
console.log(hash);



function check() {
    bcrypt.compare(myPlaintextPassword, cryptedPassword, (err, result) => {
        // result == true
    console.log("in compare, crypted: ", cryptedPassword);
    console.log("result of compare: ", result);  
});
}

// generate()
// setTimeout(() => {
//     check()}, 2000);





// sur formulaire inscription
// récupérer le password user
// chiffrer le password avec genSalt
// requête POST avec informations utilisateurs + mdp chiffré
// récupérer le token, sauvegarde dans localStorage // cookies



// sur formulaire login
// récupérer email + password du user
// requête GET pour récupérer le password chiffré associé à l'email entré par l'utilisateur
// comparaison du mot de passe chiffré avec le mot de passe clair
// if true -> requête GET à la db et récupération du token
// false -> message d'erreur côté client