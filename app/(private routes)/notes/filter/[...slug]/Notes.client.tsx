"use client"

import css from "../../../../page.module.css"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchNotes, type NoteResponse } from "@/lib/api"
import SearchBox from "@/components/SearchBox/SearchBox"
import Pagination from "@/components/Pagination/Pagination"
import NoteList from "@/components/NoteList/NoteList"
import Link from "next/link"

type Props = {
  tag?: string
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1)

  const [searchValue, setSearchValue] = useState("")

  const { data } = useQuery<NoteResponse>({
    queryKey: ["notes", { page, searchValue, tag }],
    queryFn: () => fetchNotes(page, searchValue, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false
  })

  const totalPages = data?.totalPages ?? 0

  const handleChange = useDebouncedCallback((val: string) => {
    setSearchValue(val)
    setPage(1)
  }, 300)

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchValue={searchValue} onChange={handleChange} />

        {totalPages > 1 && (
          <Pagination
            onChange={setPage}
            totalPages={totalPages}
            currentPage={page}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <NoteList notes={data?.notes ?? []} />
    </div>
  )
}
