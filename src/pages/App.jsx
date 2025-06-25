import ProductGrid from "../components/ProductGrid";

export default function App() {
  const sampleProducts = [
    {
      id: 1,
      name: "Classic Running Short",
      category: "Women",
      price: 50.0,
      imageUrl:
        "https://m.media-amazon.com/images/I/61-BoEmicfL._AC_UY1000_.jpg",
      inStock: true,
      description:
        "Lightweight and breathable running shorts designed for ultimate comfort during your workouts. Features an elastic waistband and quick-dry fabric.",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Performance Gym Tee",
      category: "Men",
      price: 35.0,
      imageUrl:
        "https://www.gymreapers.com/cdn/shop/files/short-sleeve-shirt-black-main.jpg?v=1725917924",
      inStock: true,
      description:
        "An essential gym t-shirt built with moisture-wicking fabric to keep you cool and dry. Perfect for any athletic activity.",
      sizes: ["M", "L", "XL"],
    },
    {
      id: 3,
      name: "Cozy Fleece Hoodie",
      category: "Kids",
      price: 45.0,
      imageUrl:
        "https://www.primary.com/cdn/shop/files/cozy-fleece-pullover-hoodie_heather-storm_P.jpg?v=1724092939",
      inStock: false,
      description:
        "Super soft and warm fleece hoodie for kids. Ideal for chilly days or just lounging around.",
      sizes: ["XS", "S", "M"],
    },
    {
      id: 4,
      name: "Durable Canvas Tote",
      category: "Women",
      price: 25.0,
      imageUrl:
        "https://graflantz.com/cdn/shop/files/5255NTN_1_900x.jpg?v=1743628069",
      inStock: true,
      description:
        "A versatile and sturdy canvas tote bag, perfect for everyday use, groceries, or a trip to the beach. Features reinforced handles.",
      sizes: ["One Size"],
    },
    {
      id: 5,
      name: "Track & Field Joggers",
      category: "Men",
      price: 60.0,
      imageUrl:
        "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665325445.jpg",
      inStock: true,
      description:
        "Stylish and comfortable joggers designed for both training and casual wear. Tapered fit with zippered pockets.",
      sizes: ["S", "M", "L"],
    },
    {
      id: 6,
      name: "Youth Training Sneakers",
      category: "Kids",
      price: 70.0,
      imageUrl:
        "https://m.media-amazon.com/images/I/91V9W6lLBfL._AC_UY1000_.jpg",
      inStock: true,
      description:
        "Lightweight and supportive sneakers for active kids. Provides excellent grip and comfort for all their adventures.",
      sizes: ["Kids 1", "Kids 2", "Kids 3"],
    },
    {
      id: 7,
      name: "Sporty Compression Leggings",
      category: "Women",
      price: 55.0,
      imageUrl:
        "https://images.napali.app/global/rvca-products/all/default/xlarge/avjnp00228_rvca,w_blk_frt1.jpg",
      inStock: true,
      description:
        "High-waisted compression leggings offering support and flexibility for all types of workouts. Features a hidden pocket.",
      sizes: ["XS", "S", "M"],
    },
    {
      id: 8,
      name: "Casual Denim Jacket",
      category: "Men",
      price: 85.0,
      imageUrl:
        "https://i.etsystatic.com/30137715/r/il/d3b514/3547455223/il_570xN.3547455223_jfsx.jpg",
      inStock: true,
      description:
        "A classic denim jacket that never goes out of style. Perfect for layering and adding a touch of cool to any outfit.",
      sizes: ["M", "L", "XL"],
    },
  ];

  return (
    <div>
      <main>
        <ProductGrid products={sampleProducts} />
      </main>
    </div>
  );
}
