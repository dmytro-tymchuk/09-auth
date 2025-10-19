import { DraftNote } from "@/types/note"
import { User } from "@/types/user"
import { create } from "zustand"

interface AuthStore {
  isAuthenticated: boolean
  user: User | null
  setUser: (user: User) => void
  clearAuth: () => void
}

export const useAuth = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false })
}))
