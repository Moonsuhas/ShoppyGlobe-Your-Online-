import { useState, useEffect } from 'react'

/**
 * Custom hook to fetch products from the API
 * Handles loading and error states
 */
export const useProductFetch = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://dummyjson.com/products')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProducts(data.products || [])
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to fetch products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
