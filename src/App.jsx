import Products from "./features/product/Products";
import Navigation from "./components/Navigation";
import CartList from "./features/cart/CartList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./provider/ToastProvider";
import ProductPage from "./features/product/ProductPage";

function App() {
  return (
    <div id="app">
      <ToastProvider>
        <Router>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/:id" element={<ProductPage />} />
              <Route path="/my-cart" element={<CartList />} />
            </Routes>
          </main>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
