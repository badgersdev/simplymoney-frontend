import { AddAnnouncementBtn } from "@/components/announcements/AddAnnouncementBtn";
import AddToWaitlitsBtn from "@/components/waitlist/AddToWaitlitsBtn";
import WaitlistList from "@/components/waitlist/WaitlistList";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1>Content here !</h1>
      <AddToWaitlitsBtn />
      <AddAnnouncementBtn />
      <WaitlistList />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </div>
  );
}
