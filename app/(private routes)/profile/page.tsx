"use client"
import { useAuth } from "@/lib/store/authStore"
import css from "./ProfilePage.module.css"

const Profile = () => {
  const { user } = useAuth()
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a className={css.editProfileButton}>Edit Profile</a>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  )
}

export default Profile
