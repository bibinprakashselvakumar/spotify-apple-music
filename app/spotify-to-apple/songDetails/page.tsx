import { Song, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): Song[] {
  return [
    {
      id: "728ed52f",
      trackName: "Cruel Summer",
      trackArtist: "Taylor Swift",
      trackURL: "www.bibinprakash.info",
    },
    {
      id: "728ed52g",
      trackName: "Lover",
      trackArtist: "Taylor Swift",
      trackURL: "www.bibinprakash.info",
    },
    {
      id: "728ed52h",
      trackName: "Bad Blood",
      trackArtist: "Taylor Swift",
      trackURL: "www.bibinprakash.info",
    },
  ];
}
interface SongDetailsTableProps {
  data: Song[];
}
export default function SongDetailsTable({ data }: SongDetailsTableProps) {
  // const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
