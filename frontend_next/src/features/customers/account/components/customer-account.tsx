"use client";

import { Pencil, UserCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function CustomerAccount() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Profile summary */}
      <Card>
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <UserCircle className="h-16 w-16 text-muted-foreground" />
          </div>

          <h2 className="text-lg font-semibold">Ngoc Le</h2>

          <p className="text-sm text-muted-foreground">
            Patient
          </p>
        </CardContent>
      </Card>

      {/* Personal information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>

          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="mt-1 font-medium">Ngoc Le</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="mt-1 font-medium">ngoc@example.com</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="mt-1 font-medium">+84 123 456 789</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="mt-1 font-medium">09/02/2003</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="mt-1 font-medium">Male</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="mt-1 font-medium">Hanoi, Vietnam</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}