import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddToWaitlitsBtn() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2 justify-between items-center">
        <Button asChild>
          <Link href="/waitlist/add">Add User to Waitlist</Link>
        </Button>
      </div>

      {/* tu np. tabela lub lista użytkowników */}
    </div>
  );
}
