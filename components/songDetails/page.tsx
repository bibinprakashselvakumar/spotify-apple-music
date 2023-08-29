import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Song } from "./columns";
interface SongDetailsTableType {
  data: Song[];
}
export default function SongDetailsTable({ data }: SongDetailsTableType) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
