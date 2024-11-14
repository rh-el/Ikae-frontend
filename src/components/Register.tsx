// import { useForm } from "react-hook-form";
// import bcrypt from "bcryptjs";

// const registerInDb = async () => {
//     const registerInDb = async () => {
//         const request = await fetch(`http://192.168.5.181:3000/login`, {
//           method: "POST",
//           headers: {
//             email: email,
//           },
//         });
//         const cryptedPassword = await request.json();
//         // console.log("crypted password from db: ", cryptedPassword[0].password);
//         return cryptedPassword[0].password;
//         // setDashboardData(fetchData)
//       };

const Register = () => {
  //   const { register, handleSubmit } = useForm();
  //   const onSubmit = (data: object) => console.log(data);
  //   return (
  //     <>
  //       <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
  //         <div className="flex w-full flex-col items-center p-10">
  //           <div className="flex flex-col gap-4 w-3/4 pb-4">
  //             <div>
  //               <label htmlFor="lastname">Nom : </label>
  //               <input
  //                 type="text"
  //                 className="border w-full"
  //                 {...register("lastname")}
  //               ></input>
  //             </div>
  //             <div>
  //               <label htmlFor="firstname">Prénom : </label>
  //               <input
  //                 type="text"
  //                 className="border w-full"
  //                 {...register("firstname")}
  //               ></input>
  //             </div>
  //             <div>
  //               <label htmlFor="username">Nom d'utilisateur : </label>
  //               <input
  //                 type="text"
  //                 className="border w-full"
  //                 {...register("username")}
  //               ></input>
  //             </div>
  //             <div>
  //               <label htmlFor="email">Email : </label>
  //               <input
  //                 type="text"
  //                 className="border w-full"
  //                 {...register("email")}
  //               ></input>
  //             </div>
  //             <div>
  //               <label htmlFor="password">Mot de passe : </label>
  //               <input
  //                 type="text"
  //                 className="border w-full"
  //                 {...register("password")}
  //               ></input>
  //             </div>
  //           </div>
  //           <a href="/register">
  //             <button className="border py-4 px-8" type="submit">
  //               Créer mon compte
  //             </button>
  //           </a>
  //         </div>
  //       </form>
  //     </>
  //   );
};

export default Register;
