import { getServerMe } from "@/lib/api/serverApi"
import css from "./ProfilePage.module.css"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Profile - NoteHub",
  description: "User profile page for managing your NoteHub account",
  openGraph: {
    title: "NoteHub Profile",
    description: "View and edit your NoteHub user information.",
    url: ``,
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
const Profile = async () => {
  const user = await getServerMe()
  console.log(user)

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
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
