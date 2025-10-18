import {
  QueryClient,
  dehydrate,
  HydrationBoundary
} from "@tanstack/react-query"
import NotesClient from "./Notes.client"
import css from "../../../../page.module.css"
import { Metadata } from "next"
import { fetchServerNotes } from "@/lib/serverApi"

type PageProps = {
  params: Promise<{ slug: string[] }>
  searchParams?: { page?: string; searchValue?: string }
}

export const generateMetadata = async ({
  params
}: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const [tag] = slug
  return {
    title: tag,
    description: `This page is with ${tag} filter`,
    openGraph: {
      title: `${tag} notes`,
      url: `https://08-zustand-seven-zeta.vercel.app/notes/filter/${tag}`,
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

export default async function NotesByFilter({
  params,
  searchParams
}: PageProps) {
  const { slug } = await params
  const [tag] = slug
  const sp = await searchParams

  const page = Number(sp?.page ?? 1)
  const searchValue = sp?.searchValue ?? ""

  const tagParam = tag === "All" || tag === "all" ? undefined : tag

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, searchValue, tag: tagParam }],
    queryFn: () => fetchServerNotes(page, searchValue, tagParam)
  })

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tagParam} />
      </HydrationBoundary>
    </div>
  )
}
