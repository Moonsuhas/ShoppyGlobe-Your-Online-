import ProductList from '../components/ProductList'
import './Home.css'

/**
 * Home page component - displays hero and product list
 * Hero section has animated gradient and floating effects
 * ProductList shows all products in a responsive animated grid
 */
function Home() {
  return (
    <main className="home-page">
      <div className="hero-section">
        <h2>Elevate Your ShoppyGlobe Experience</h2>
        <p>Exclusive collections, unbeatable prices</p>
      </div>

      <section className="products-wrapper">
        <ProductList />
      </section>
    </main>
  )
}

export default Home
