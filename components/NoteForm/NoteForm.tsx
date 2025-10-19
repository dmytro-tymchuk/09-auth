"use client"

import css from "./NoteForm.module.css"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createNote } from "../../lib/api/clientApi"
import type { CreateNoteRequest } from "../../types/note"
import { useRouter } from "next/navigation"
import { useDraftNote } from "@/lib/store/noteStore"
import { ChangeEvent, FormEvent } from "react"

type NoteFormValues = {
  title: string
  content: string
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}

const NoteForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setDraft, draft, clearDraft } = useDraftNote()

  const createMutation = useMutation({
    mutationFn: (payload: CreateNoteRequest) => createNote(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] })
      clearDraft()
      router.push("/notes/filter/all")
    }
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const values: CreateNoteRequest = {
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? "").trim(),
      tag: String(formData.get("tag") ?? "Todo") as NoteFormValues["tag"]
    }

    if (values.title.length < 3 || values.title.length > 50) return
    if (values.content.length > 500) return

    createMutation.mutate(values)
  }

  const handleBack = () => {
    router.back()
  }

  const createDraft = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setDraft({ [name]: value } as Partial<NoteFormValues>)
  }

  return (
    <form className={css.form} onSubmit={onSubmit}>
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
          value={draft?.tag ?? "Todo"}
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
        <button
          className={css.submitButton}
          type="submit"
          disabled={createMutation.isPending}
          aria-busy={createMutation.isPending}
        >
          {createMutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  )
}

export default NoteForm
