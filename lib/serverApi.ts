import { User } from "@/types/user"
import { api } from "./api"
import { cookies } from "next/headers"
export { getServerMe }

const getServerMe = async () => {
  const cookieStore = await cookies()
  const { data } = await api.get<User>(`/users/me`, {
    headers: { Cookie: cookieStore.toString() }
  })
  return data
}
