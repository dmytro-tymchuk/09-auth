"use client"

import css from "./NoteForm.module.css"
import { useQueryClient } from "@tanstack/react-query"
import { createNote } from "../../lib/api"
import type { CreateNoteRequest } from "../../types/note"
import { useRouter } from "next/navigation"
import { useDraftNote } from "@/lib/store/noteStore"
import { ChangeEvent } from "react"

type NoteFormValues = {
  title: string
  content: string
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}

const NoteForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setDraft, draft, clearDraft } = useDraftNote()
  console.log(draft)

  async function handleCreate(formData: FormData) {
    const values: CreateNoteRequest = {
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? "").trim(),
      tag: String(formData.get("tag") ?? "Todo") as NoteFormValues["tag"]
    }

    if (values.title.length < 3 || values.title.length > 50) return
    if (values.content.length > 500) return

    await createNote(values)
    await queryClient.invalidateQueries({ queryKey: ["notes"] })
    clearDraft()
    router.push("/notes/filter/all")
  }

  const handleBack = () => {
    router.back()
  }

  const createDraft = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value
    const name = e.target.name
    setDraft({
      [name]: value
    })
  }

  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          onChange={createDraft}
          value={draft?.title ?? ""}
        />
        <span className={css.error} aria-live="polite"></span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          onChange={createDraft}
          value={draft?.content ?? ""}
        />
        <span className={css.error} aria-live="polite"></span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={createDraft}
          value={draft?.tag ?? ""}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} aria-live="polite"></span>
      </div>

      <div className={css.actions}>
        <button onClick={handleBack} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button className={css.submitButton} formAction={handleCreate}>
          Create note
        </button>
      </div>
    </form>
  )
}

export default NoteForm
