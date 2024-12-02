import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";

type User = {
  email: string,
  password: string
}

const Login = () => {

  const navigate = useNavigate();

  async function login(data: User) {
    try {
      const token = Cookies.get('token') ? Cookies.get('token') : null
      const response =  await fetch(`https://ikae-backend-supabase.vercel.app/login`, {
        headers: {
          "Content-Type": "application/json",
          "email": data.email,
          "password": data.password,
          Authorization: `Bearer ${token}` 
        }
      });
      const loginData = await response.json()

      if (loginData.error) {
        throw new Error(loginData.error)
      }
    
      Cookies.set('token', loginData.token, { secure: true });
      navigate(-1);

    } catch (error){
      console.error('login error:', error)
      return false;
  }
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => login(data);

  return (
    <div className="flex justify-center w-2/3 gap-14 py-10 min-h-[85vh]">
      <div className="flex justify-center w-full gap-14 py-10 h-1/2">
        <div className="flex flex-col justify-center items-center w-1/2 gap-4 p-10 border rounded-xl">
          <h2 className="text-3xl text-center mb-5">Connectez-vous</h2>
          <form className="flex w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col items-center">
              <div className="flex flex-col gap-4 w-full pb-8 mb-5">
                <div>
                  <label htmlFor="email">Email : </label>
                  <input type="text" className="border w-full outline-none px-4 py-2 rounded-sm" {...register("email")}></input>
                </div>
                <div>
                  <label htmlFor="password">Mot de passe : </label>
                  <input type="password" className="border w-full outline-none px-4 py-2 rounded-sm" {...register("password")}></input>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-2/3">
                <Button className="w-full py-6" type="submit" >Se connecter</Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-between items-center w-1/2 gap-4 p-10 border rounded-xl">
          <h2 className="text-3xl text-center">Vous n'avez pas de compte ?</h2>
          <div className="flex flex-col items-center text-center gap-4">
            <img src="../../public/assets/img/profile.png" className="w-14" alt="" />
            <p>Créez votre compte en quelques clics !</p>
          </div>
          <div className="flex justify-center w-2/3">
            <Link className="w-full" to="/register">
            <Button className="w-full py-6">Créer mon compte</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
