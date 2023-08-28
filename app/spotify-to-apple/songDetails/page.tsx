import { song, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): song[] {
  return [
    {
      id: "728ed52f",
      songName: "Cruel Summer",
      Artist: "Taylor Swift",
    },
    {
      id: "728ed52g",
      songName: "Lover",
      Artist: "Taylor Swift",
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
