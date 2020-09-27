import CardItem from "./CardItem";

function ShopMain(cards) {
  return (
    <div className="row container">
      <ul className="col s12 m12">
        {cards.cards.map((item) => (
          <CardItem {...item} key={item._id} />
        ))}
      </ul>
    </div>
  );
}

export default ShopMain;
