"use client"
import Link from "next/link"
import css from "./AuthNavigation.module.css"
import { useAuth } from "@/lib/store/authStore"
import { logout } from "@/lib/api/clientApi"
import { useRouter } from "next/navigation"
import TagsMenu from "../TagsMenu/TagsMenu"

const AuthNavigation = () => {
  const { user, isAuthenticated, clearAuth } = useAuth()
  const router = useRouter()
  const handleClick = async () => {
    await logout()
    clearAuth()
    router.replace("/sign-in")
  }
  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleClick} className={css.logoutButton}>
          Logout
        </button>
      </li>
      <TagsMenu />
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  )
}
export default AuthNavigation
