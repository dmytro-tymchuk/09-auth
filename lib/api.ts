import axios from "axios"
import type { CreateNoteRequest, Note } from "../types/note"

export { fetchNotes, createNote, deleteNote, fetchNoteById}

export type NoteResponse = {
    notes: Note[],
    totalPages: number
}

type SingleNoteResponse = {
    note: Note
}

const fetchNotes = async (page:number = 1, searchValue: string = "", tag?:string):Promise<NoteResponse> => {
    const res = await axios.get<NoteResponse>(`https://notehub-public.goit.study/api/notes`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        },
        params: {
        page,
        perPage: 12,
        ...(searchValue ? { search: searchValue } : {}),
        ...(tag ? { tag } : {}), 
      }
    })
    return res.data
}

const createNote = async (data: CreateNoteRequest): Promise<Note> => {
    const res = await axios.post<SingleNoteResponse>(`https://notehub-public.goit.study/api/notes`, data, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })
    return res.data.note
}

const deleteNote = async (noteId: string) => {
    const res = await axios.delete<SingleNoteResponse>(`https://notehub-public.goit.study/api/notes/${noteId}`,{
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })
    return res.data.note
}

const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })
    return res.data
}