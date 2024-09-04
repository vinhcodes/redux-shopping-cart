import ProductList from "./features/product/ProductList";
import Navigation from "./components/Navigation";
import CartList from "./features/cart/CartList";

function App() {
  return (
    <div id="app">
      <Navigation />
      <main>
        <CartList />
        <ProductList />
      </main>
    </div>
  );
}

export default App;
