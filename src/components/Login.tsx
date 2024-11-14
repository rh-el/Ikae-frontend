import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";

// import { useEffect } from "react";

const Login = () => {
  const getPasswordFromDb = async (email: string) => {
    const request = await fetch(`http://192.168.5.181:3000/login`, {
      method: "GET",
      headers: {
        email: email,
      },
    });
    const cryptedPassword = await request.json();
    // console.log("crypted password from db: ", cryptedPassword[0].password);
    return cryptedPassword[0].password;
    // setDashboardData(fetchData)
  };

  async function comparePassword(
    userPassword: string,
    cryptedPasswordFromDb: string
  ) {
    console.log(userPassword, cryptedPasswordFromDb);
    bcrypt.compare(userPassword, cryptedPasswordFromDb, (err, result) => {
      console.log("result of compare: ", result);
      return result;
    });
  }
  // fetch à passer en useEffect?
  async function execOrder(data: any) {
    const dbPassword = await getPasswordFromDb(data.email);
    console.log(dbPassword);
    const result = await comparePassword(data.password, dbPassword);
    // console.log(result);
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => execOrder(data);

  return (
    <>
      <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-center p-10">
          <div className="flex flex-col gap-4 w-3/4 pb-4">
            <div>
              <label htmlFor="email">Email : </label>
              <input
                type="text"
                className="border w-full"
                {...register("email")}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Mot de passe : </label>
              <input
                type="text"
                className="border w-full"
                {...register("password")}
              ></input>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="border py-4 px-8" type="submit">
              Se connecter
            </button>
            <a href="/register">
              <button className="border py-4 px-8" type="button">
                Créer mon compte
              </button>
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
