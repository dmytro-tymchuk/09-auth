import { User } from "@/types/user"
import { api } from "./api"
import { cookies } from "next/headers"
import { NoteResponse, SessionResponse } from "./clientApi"
import { Note } from "@/types/note"
export {
  getServerMe,
  fetchServerNotes,
  fetchServerNoteById,
  checkServerSession
}

const getServerMe = async () => {
  const cookieStore = await cookies()
  const { data } = await api.get<User>(`/users/me`, {
    headers: { Cookie: cookieStore.toString() }
  })
  return data
}

const fetchServerNotes = async (
  page: number = 1,
  searchValue: string = "",
  tag?: string
): Promise<NoteResponse> => {
  const cookieStore = await cookies()
  const res = await api.get<NoteResponse>(`/notes`, {
    headers: {
      Cookie: cookieStore.toString()
    },
    params: {
      page,
      perPage: 12,
      ...(searchValue ? { search: searchValue } : {}),
      ...(tag ? { tag } : {})
    }
  })
  return res.data
}

const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies()
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  return res.data
}

const checkServerSession = async () => {
  const cookieStore = await cookies()
  const res = await api.get<SessionResponse>(`/auth/session`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  return res
}
