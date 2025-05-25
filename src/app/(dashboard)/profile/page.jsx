"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/avatar.png" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>

          <div className="grid gap-4">
            <div>
              <Label className="mb-1" htmlFor="name">
                Name
              </Label>
              <Input id="name" defaultValue="John Doe" />
            </div>

            <div>
              <Label className="mb-1" htmlFor="email">
                Email
              </Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>

            <div>
              <Label className="mb-1" htmlFor="password">
                New Password
              </Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button className="w-full">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
