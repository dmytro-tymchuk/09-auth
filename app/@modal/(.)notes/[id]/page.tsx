import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: NoteDetailsProps) {
  const { id } = await params;
  const parsedId = (id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={parsedId} />
    </HydrationBoundary>
  );
} 