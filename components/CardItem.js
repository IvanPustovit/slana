import formatMoney from "@jlozovei/format-money";
import Link from "next/link";

const CardItem = () => {
  return (
    <li className="col s12 l4 ">
      <div className="card fix">
        <div className="card-image">
          <img src="{item.img}" alt="{item.alt}" />

          <Link href={`/shop/`}>
            <a className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons">add</i>
            </a>
          </Link>
        </div>
        <div className="content-fix">
          <p className="card-info">
            {/* "{item.species} {item.category.toLowerCase()}" */}
          </p>
          <p className="card-info_name">{/* "{item.name.toUpperCase()}" */}</p>
        </div>

        <p className="card-price">
          {formatMoney({
            value: "item.price",
            currencyCode: "UAH",
            locale: "UA",
          })}
        </p>
      </div>
    </li>
  );
};

export default CardItem;
