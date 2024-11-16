import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
// import App from "../App";

// import { useEffect } from "react";

const Login = ({ setIsLoggedIn } : any) => {

  const navigate = useNavigate();

  const getPasswordFromDb = async (email: string) => {
    const request = await fetch(`http://localhost:3000/login`, {
      method: "GET",
      headers: {
        email: email,
      },
    });
    const cryptedPassword = await request.json();    
    return cryptedPassword;
  };

  async function comparePassword(
    userPassword: string,
    cryptedPasswordFromDb: string,

  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(userPassword, cryptedPasswordFromDb, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    });
  }

  async function getToken(email: string) {
    const request = await fetch(`http://localhost:3000/token`, {
      headers: {
        'email': email,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    const token = await request.json();    
    return token;
  }

  // fetch à passer en useEffect?
  async function execOrder(data: any) {
    const dbPassword = await getPasswordFromDb(data.email);
    const result = await comparePassword(data.password, dbPassword);  
      
    if (result) {
      console.log("JE SUIS DANS LE IF RESULT")
      const token = await getToken(data.email)
      await Cookies.set('token', token, { secure: true });
      console.log(Cookies.get());
      setIsLoggedIn(true)
      navigate(-1);
    } else {
      alert('Wrong password')
    }
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => execOrder(data);

  return (
    <div className="flex justify-around items-end w-1/2 h-full gap-10 py-10">
      <div className="flex flex-col w-1/2 gap-4">
        <h2 className="text-3xl text-center">Connectez-vous</h2>
        <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-col gap-4 w-full pb-8">
              <div>
                <label htmlFor="email">Email : </label>
                <input type="text" className="border w-full outline-none px-4 py-2 " {...register("email")}></input>
              </div>
              <div>
                <label htmlFor="password">Mot de passe : </label>
                <input type="password" className="border w-full outline-none px-4 py-2" {...register("password")}></input>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Button className="w-full py-6" type="submit" >Se connecter</Button>
              {/* <button className="border py-4 px-8  hover:bg-black hover:text-white duration-150 mt-2" type="submit"> */}
                {/* Se connecter
              </button> */}
            </div>
          </div>
        </form>
      </div>
      <div className="w-1/2">

        <h2 className="text-3xl text-center mb-6">Vous n'avez pas de compte ?</h2>
        <div className="flex justify-center w-full">
          <Link className="w-full" to="/register">
          <Button className="w-full py-6">Créer mon compte</Button>
            {/* <button type="button" className="border py-4 px-8 bg-slate-950 text-white" >
              Créer mon compte
            </button> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
