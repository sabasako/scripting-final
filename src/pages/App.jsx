import ProductGrid from "../components/ProductGrid";
import products from "../products.json";

export default function App() {
  return (
    <div>
      <main>
        <ProductGrid products={products} />
      </main>
    </div>
  );
}
