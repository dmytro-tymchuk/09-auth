import type { CreateNoteRequest, Note } from "../../types/note"
import { User } from "@/types/user"
import { api } from "./api"

export {
  fetchNotes,
  createNote,
  deleteNote,
  fetchNoteById,
  register,
  login,
  checkSession,
  getMe,
  logout,
  updateMe
}

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

export interface SessionResponse {
  success: boolean
}

const fetchNotes = async (
  page: number = 1,
  searchValue: string = "",
  tag?: string
): Promise<NoteResponse> => {
  const res = await api.get<NoteResponse>(`/notes`, {
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
  const res = await api.post<SingleNoteResponse>(`/notes`, data)
  return res.data.note
}

const deleteNote = async (noteId: string) => {
  const res = await api.delete<SingleNoteResponse>(`/notes/${noteId}`)
  return res.data.note
}

const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`)
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

const checkSession = async () => {
  const { data } = await api.get<SessionResponse>(`/auth/session`)
  return data.success
}

const getMe = async () => {
  const { data } = await api.get<User>(`/users/me`)
  return data
}

const logout = async () => {
  await api.post(`/auth/logout`)
}

const updateMe = async (payload: { username: string }) => {
  const { data } = await api.patch<User>("/users/me", payload)
  return data
}
