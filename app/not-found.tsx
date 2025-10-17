import { Metadata } from "next"
import css from "./page.module.css"

export const metadata: Metadata = {
  title: "Not Found",
  description: "Page does not exist",
  openGraph: {
    title: "Not Found",
    url: `https://08-zustand-seven-zeta.vercel.app/404`,
    images: [
      {
        url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
        width: 1200,
        height: 630,
        alt: "Create Next App"
      }
    ]
  }
}

const NotFoundPage = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  )
}

export default NotFoundPage
