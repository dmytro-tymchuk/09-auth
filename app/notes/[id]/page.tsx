import { fetchNoteById } from "@/lib/api"
import NoteDetailsClient from "./NoteDetails.client"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query"
import { Metadata } from "next"
interface DetailsProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params
}: DetailsProps): Promise<Metadata> => {
  const { id } = await params
  const note = await fetchNoteById(id)
  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      url: `https://08-zustand-seven-zeta.vercel.app/notes/${id}`,
      images: [
        {
          url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
          width: 1200,
          height: 630,
          alt: "Create Next App"
        }
      ]
    }
  }
}

const Details = async ({ params }: DetailsProps) => {
  const { id } = await params

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["task", id],
    queryFn: () => fetchNoteById(id)
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}

export default Details
