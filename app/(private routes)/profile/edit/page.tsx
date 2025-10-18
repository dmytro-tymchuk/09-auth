"use client"
import { useAuth } from "@/lib/store/authStore"
import css from "./EditProfilePage.module.css"
import Image from "next/image"
import { updateMe } from "@/lib/clientApi"
import { useRouter } from "next/navigation"

const EditProfilePage = () => {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = String(form.get("username")).trim()
    const email = String(form.get("email") || user?.email)

    const updatedUser = await updateMe({ email, username })

    setUser(updatedUser)
    router.replace("/profile")
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user?.avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={onSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              defaultValue={user?.username}
              id="username"
              type="text"
              name="username"
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.replace("/profile")}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditProfilePage
