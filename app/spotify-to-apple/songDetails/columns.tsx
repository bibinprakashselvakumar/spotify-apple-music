"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
export type Song = {
  id: string;
  trackName: string;
  trackArtist: string;
  trackURL: string;
};

export const columns: ColumnDef<Song>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trackName",
    header: "Track Name",
  },
  {
    accessorKey: "trackArtist",
    header: "Artist",
  },
  {
    accessorKey: "trackURL",
    header: "Apple Music Link",
  },
];
