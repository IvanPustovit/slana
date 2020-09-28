import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { useMyContext } from "../../helpers/context";
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

// import { connectToDatabase } from "../../util/mongodb";

export default function login() {
  const router = useRouter();
  const { setUserId } = useMyContext();

  const [form, setForm] = useState();
  const [loading, setloading] = useState(false);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      const user = await response.json();
      if (Object.keys(user).length === 0) {
        return M.toast({
          html: `Невірно введено email або пароль`,
        });
      }
      setUserId(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("Cart", JSON.stringify([]));
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3 ">
        <h1 className="widht-auth">Увійти до магазину</h1>

        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш Email"
                  id="email"
                  type="email"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Ваш email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш пароль"
                  id="password"
                  type="password"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Ваш пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect waves-light btn-auth-m"
              type="submit"
              name="action"
              onClick={loginHandler}
              disabled={loading}
            >
              Увійти
            </button>
            <Link href="/auth/register" name="action">
              Зареєструватися
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const { db } = await connectToDatabase();

//   const cards = await db.collection("itemshops").find({}).toArray();

//   return {
//     props: {
//       cards: JSON.parse(JSON.stringify(cards)),
//     },
//   };
// }
