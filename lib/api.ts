import axios from "axios"
import type { CreateNoteRequest, Note } from "../types/note"
import { User } from "@/types/user"

export { fetchNotes, createNote, deleteNote, fetchNoteById, register, login }

// axios.defaults.baseURL = "http://localhost:3000/api"

export const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL ?? "") + "/api",
  withCredentials: true
})

export type NoteResponse = {
  notes: Note[]
  totalPages: number
}

type SingleNoteResponse = {
  note: Note
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

const fetchNotes = async (
  page: number = 1,
  searchValue: string = "",
  tag?: string
): Promise<NoteResponse> => {
  const res = await api.get<NoteResponse>(`/notes`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
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

const createNote = async (data: CreateNoteRequest): Promise<Note> => {
  const res = await api.post<SingleNoteResponse>(`/notes`, data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }
  })
  return res.data.note
}

const deleteNote = async (noteId: string) => {
  const res = await api.delete<SingleNoteResponse>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }
  })
  return res.data.note
}

const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }
  })
  return res.data
}

const register = async (body: RegisterRequest) => {
  const { data } = await api.post<User>(`/auth/register`, body)
  return data
}

const login = async (body: LoginRequest) => {
  const { data } = await api.post<User>(`/auth/login`, body)
  return data
}
