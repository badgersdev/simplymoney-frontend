"use-client";

import Link from "next/link";
import { Button } from "../ui/button";

export const AddAnnouncementBtn = () => {
  return (
    <Link href="/announcements/add">
      <Button
        variant="default"
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Dodaj Ogłoszenie
      </Button>
    </Link>
  );
};
