import ProductList from "./features/product/ProductList";
import Navigation from "./components/Navigation";
import CartList from "./features/cart/CartList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./provider/ToastProvider";

function App() {
  return (
    <div id="app">
      <ToastProvider>
        <Router>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/my-cart" element={<CartList />} />
            </Routes>
          </main>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
