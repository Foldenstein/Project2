import Navbar from "../pages/Navbar"
import "../styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Navbar />

      <div className="container">
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  )
}

export default MyApp