import { useCategory } from "../contexts/CategoryContext";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products }) {
  const { category, changeCategory } = useCategory();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryTitle}>Category: {category}</h1>
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
