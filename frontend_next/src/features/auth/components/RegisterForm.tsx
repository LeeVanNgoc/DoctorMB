import Link from "next/link";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button"
export function RegisterForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle> Register</CardTitle>

        <CardDescription> Register new account</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@gmail.com">
              
              </Input>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder=""></Input>
          </div>

          <Button className="w-full">Register</Button>

          <p className="text-center text-sm text-muted-foreground">
            If you have an account? {" "}
            <Link href="/login" className="font-medium text-primary hover:underline">Login</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
