"use client"
import { RegisterRequest, register } from "@/lib/api/clientApi"
import css from "./SignUpPage.module.css"
import { useAuth } from "@/lib/store/authStore"
import { useRouter } from "next/navigation"
const SignUpPage = () => {
  const { setUser } = useAuth()
  const router = useRouter()
  const handleAction = async (formData: FormData) => {
    const payload = Object.fromEntries(formData) as unknown as RegisterRequest
    const user = await register(payload)
    setUser(user)
    router.replace("/profile")
  }
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleAction} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {/* <p className={css.error}>Error</p> */}
      </form>
    </main>
  )
}

export default SignUpPage
