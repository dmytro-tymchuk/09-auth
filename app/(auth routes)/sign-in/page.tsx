"use client"
import { LoginRequest, login } from "@/lib/api"
import css from "./SignInPage.module.css"
const SignInPage = () => {
  const handleAction = async (formData: FormData) => {
    const payload = Object.fromEntries(formData) as unknown as LoginRequest
    const user = await login(payload)
    console.log("user", user)
  }

  return (
    <main className={css.mainContent}>
      <form action={handleAction} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        {/* <p className={css.error}>{error}</p> */}
      </form>
    </main>
  )
}

export default SignInPage
