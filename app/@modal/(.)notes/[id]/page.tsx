import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query"

import NotePreviewClient from "./NotePreview.client"
import { fetchServerNoteById } from "@/lib/api/serverApi"

interface NoteDetailsProps {
  params: Promise<{ id: string }>
}

export default async function NotePreview({ params }: NoteDetailsProps) {
  const { id } = await params
  const parsedId = id

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchServerNoteById(parsedId)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={parsedId} />
    </HydrationBoundary>
  )
}
