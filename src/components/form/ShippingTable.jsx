export default function ShippingTable({ even, data }) {
  return (
    <ul className="shipping-list">
      {data.map((item, index) => (
        <li
          key={index}
          className={`shipping-item ${even === true ? "even" : ""}`}
        >
          <h3>{item.heading}</h3>
          <p>{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
