import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import Cookies from "js-cookie";

type RegistrationForm = {
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  super_user: boolean
}

const registerInDb = async (data: RegistrationForm) => {
  try {
    const response =  await fetch(`http://localhost:3000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        super_user: true
      }),
    });
    const registerData = await response.json()
  
    if (response.ok){
      Cookies.set('token', registerData.token)
      return true; 
    }

    throw new Error(registerData.error)
    
  } catch (error){
    console.log(error);
    return false;
  }
};

const sendRegistrationForm = async (data: RegistrationForm, setterRegistration: Dispatch<SetStateAction<boolean>>, setterError: Dispatch<SetStateAction<boolean>> ) => {
  const requete = await registerInDb(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  requete ? setterRegistration(true) : setterError(true); 
 }

const Register = () => {
  const navigate = useNavigate();

  const [registrationStatus, setRegistrationStatus] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => sendRegistrationForm(data, setRegistrationStatus, setError);
  
  return (
    <div className="min-h-[85vh]">
      <h2 className="my-5 text-center text-3xl">Créer un compte</h2>
      {!registrationStatus ? 
        <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center p-10">
            <div className="flex flex-col gap-4 w-full pb-8">
              <div>
                <label htmlFor="lastname">Nom : </label>
                <input
                  type="text"
                  className="border rounded-sm w-full outline-none px-4 py-2"
                  {...register("lastname")}
                ></input>
              </div>
              <div>
                <label htmlFor="firstname">Prénom : </label>
                <input
                  type="text"
                  className="border rounded-sm w-full outline-none px-4 py-2"
                  {...register("firstname")}
                ></input>
              </div>
              <div>
                <label htmlFor="username">Nom d'utilisateur : </label>
                <input
                  type="text"
                  className="border rounded-sm w-full outline-none px-4 py-2"
                  {...register("username")}
                ></input>
              </div>
              <div>
                <label htmlFor="email">Email : </label>
                <input
                  type="text"
                  className="border rounded-sm w-full outline-none px-4 py-2"
                  {...register("email")}
                ></input>
              </div>
              <div>
                <label htmlFor="password">Mot de passe : </label>
                <input
                  type="password"
                  className="border rounded-sm w-full outline-none px-4 py-2"
                  {...register("password")}
                ></input>
              </div>
            </div>
              <Button className="w-2/3 py-6" type="submit" >Créer mon compte</Button>
            {error && <p className="m-4">Vous avez déjà un compte ! Connectez-vous <Link to="/login" className="underline font-semibold">ici</Link>.</p>}
          </div>
        </form>
        : <div className="flex w-full flex-col items-center p-10 gap-90">
            <p>Félicitations ! Votre compte a bien été créé.</p>
            <button onClick={() => navigate(-2)} className="border py-4 px-8 m-6">Retour</button>
          </div>} 
    </div>
  );
};

export default Register;
