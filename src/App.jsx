import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import ProductList from "./components/Product List/Product-List";
import { CartProvider, ProductProvider } from "./provider";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Header />
        <Hero />
        <ProductList />
        <Footer />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
