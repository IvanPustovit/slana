import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState();
  const [loading, setloading] = useState(false);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      const user = await response.json();
      if (Object.keys(user).length === 0) {
        return M.toast({
          html: `Користувач з email ${form.email} існує`,
        });
      }
      router.push("/auth/login");
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
                  placeholder="Напишіть Ваше Ім'я"
                  id="name"
                  type="text"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Ваше ім'я</label>
              </div>
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
            <Link href="/auth/login" name="action">
              Увійти
            </Link>
            <button
              className="btn yellow darken-4"
              type="submit"
              name="action"
              onClick={registerHandler}
              disabled={loading}
            >
              Зареєструватися
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
