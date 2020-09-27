import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import formatMoney from "@jlozovei/format-money";
import Loader from "../components/Loader";
import { connectToDatabase } from "../util/mongodb";
import HeaderApp from "../components/Header";
import Footer from "../components/Footer";

export const STOREGE_CART = "Cart";

export default function itemId({ ...cards }) {
  const router = useRouter();
  const card = cards.cards[0];
  const [data, setData] = useState({});
  const [isAuth, setIsAuth] = useState();

  function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  function byField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitToCart = (e) => {
    let storage = localStorage.getItem(STOREGE_CART);
    if (!storage) {
      localStorage.setItem(STOREGE_CART, []);
    }
    // storage = getStor(STOREGE_CART);
    const order = { ...card, ...data, amountInCart: 1 };
    const n = storage.find(
      (el) => el.color === data.color && el.size === data.size
    );
    if (n) {
      const index = storage.indexOf(n);
      storage[index] = { ...n, amountInCart: n.amountInCart + 1 };
      M.toast({ html: "Товар добавлено в корзину!" });
      return localStorage.setItem(STOREGE_CART, storage);
    }

    storage.push(order);
    localStorage.setItem(STOREGE_CART, storage.sort(byField("name")));
    // auth.totalOrder();
    M.toast({ html: "Товар добавлено в корзину!" });
    router.push("/");
  };

  const auth = () => {
    const user = localStorage.getItem("user");
    setIsAuth(user);
  };

  useEffect(() => {
    auth();
  });

  return (
    <>
      <HeaderApp />
      <div className="container">
        {isEmpty(card) && <Loader />}
        {!isEmpty(card) > 0 && (
          <div className="row">
            <div className="col s12 m12 l12">
              <div className="card horizontal">
                <div className="card-image">
                  <img className="img-modal" src={card.img} alt={card.alt} />
                </div>

                <div className="card-stacked">
                  <p className="card-content card-name">
                    "{card.name.toUpperCase()}"
                  </p>
                  <div className="card-content">
                    <p>{card.info.toUpperCase()}</p>
                  </div>

                  <div>
                    <div className="input-field col s12">
                      <select
                        className="select-item"
                        name="color"
                        onChange={dataHandler}
                      >
                        <optgroup label="Україна">
                          <option></option>

                          <option value="білий-україна">Білий</option>
                        </optgroup>
                        <optgroup label="Турція">
                          <option className="bgr-white" value="білий-турція">
                            Білий
                          </option>
                          <option className="bgr-black" value="чорний-турція">
                            Чорний
                          </option>
                          <option className="bgr-grey" value="сірий-турція">
                            Сірий
                          </option>
                        </optgroup>
                        <optgroup label="Венгрія">
                          <option value="білий-венгрія">Білий</option>
                          <option value="чорний-венгрія">Чорний</option>
                          <option value="жовтий-венгрія">Жовтий</option>
                          <option value="синій-венгрія">Синій</option>
                          <option value="зелений-венгрія">Зелений</option>
                          <option value="сірий-венгрія">Сірий</option>
                          <option value="блакитний-венгрія">Блакитний</option>
                        </optgroup>
                      </select>
                      <label className="label-item">Виберіть колір</label>
                    </div>

                    <div className="input-field col s12">
                      <select
                        className="select-item"
                        name="size"
                        onChange={dataHandler}
                      >
                        <optgroup label="Розмір">
                          <option></option>
                          {card.size.split(",").map((el) => (
                            <option value={el} name={el} key={el}>
                              {el}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      <label className="label-item">Виберіть розмір</label>
                    </div>
                  </div>

                  <div className="card-action">
                    {!isAuth && (
                      <Link href="/">
                        <p className="link-auth">
                          Щоб продовжити покупку зареєтруйтеся або увійдіть під
                          своїм логіном
                        </p>
                      </Link>
                    )}
                    {isAuth && (
                      <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                        disabled={!data.color || !data.size}
                        onClick={submitToCart}
                      >
                        В корзину
                        <i className="material-icons right">send</i>
                      </button>
                    )}

                    <p className="item-price" pattern="\d+,\d{2}">
                      {formatMoney({
                        value: card.price,
                        currencyCode: "UAH",
                        locale: "UA",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(req, res) {
  const { db } = await connectToDatabase();
  const card = await db
    .collection("itemshops")
    .find({ _id: ObjectId(req.query.itemId) })
    .toArray();

  return {
    props: {
      cards: JSON.parse(JSON.stringify(card)),
    },
  };
}
