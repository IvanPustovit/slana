import Link from "next/link";

function HeaderApp({ children }) {
  return (
    <>
      <div className="container">
        <nav className="brown lighten-1 z-depth-4 navigation">
          <p className="baner">
            Сайт на стадії розробки, може не працювати увесь функціонал
          </p>
          <div className="nav-wrapper">
            {/* {user.isAuth && ( */}
            <p className="hello">
              Вітамо{" "}
              <Link href="/profile">
                <a className="name-user">"user.userNam"</a>
              </Link>
            </p>
            {/* )} */}
            <Link href="/">
              <a className="brand-logo logo-pad ">
                <img
                  alt=""
                  className="responsive-img"
                  width="100vh"
                  src="https://i.ibb.co/YQNpyLL/logo.png"
                />
              </a>
            </Link>

            <Link href="/">
              <a data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link href={`/shop/`}>
                  <a name="Футболка"> Футболки</a>
                </Link>
              </li>
              <li>
                <Link href={`/shop/`}>
                  <a name="Рушники">Рушники</a>
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <a className="count">
                    <i className=" material-icons medium">add_shopping_cart</i>
                    <span className="cou">"auth.countCart"</span>
                  </a>
                </Link>
              </li>
              {/* {user.isAuth && ( */}
              <li>
                <Link href="/">
                  <a
                  //   onClick={logoutHandler}
                  >
                    Вийти
                  </a>
                </Link>
              </li>
              {/* )} */}
              {/* {!user.isAuth && ( */}
              <li>
                <Link href="/auth/login">
                  <a>Увійти</a>
                </Link>
              </li>
              {/* )} */}
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="sass.html">Футболки</a>
          </li>
          <li>
            <a href="badges.html">Рушники</a>
          </li>
        </ul>
        {/* <main>{children}</main> */}
      </div>
    </>
  );
}

export default HeaderApp;
