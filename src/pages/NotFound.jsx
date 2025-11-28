import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'
import './NotFound.css'

/**
 * NotFound page component
 * Shows a 404 message when the page is not found
 */
function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-container">
        {/* Alert icon */}
        <AlertCircle size={80} color="#ff4757" />

        {/* Main 404 Heading */}
        <h1>404</h1>
        <h2>Page Not Found</h2>

        {/* Description */}
        <p className="error-details">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Show current path */}
        <p className="error-path">
          Requested URL: <code>{window.location.pathname}</code>
        </p>

        {/* Go back to home button */}
        <Link to="/" className="home-btn">
          <Home size={20} />
          Go to Home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
