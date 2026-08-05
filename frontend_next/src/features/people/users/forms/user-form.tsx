import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { User, UserFormMode } from "../types";

interface UserFormProps {
  mode: UserFormMode;
  user?: User;
}

export function UserForm({
  mode,
  user,
}: UserFormProps) {
  const readOnly = mode === "view";

  return (
    <div className="grid gap-5 py-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">
          Full Name
        </Label>

        <Input
          id="fullName"
          defaultValue={user?.fullName}
          placeholder="Enter full name"
          disabled={readOnly}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          type="email"
          defaultValue={user?.email}
          placeholder="Enter email"
          disabled={readOnly}
        />
      </div>

      {mode === "create" && (
        <div className="grid gap-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            placeholder="Enter password"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>
            Role
          </Label>

          <Select
            defaultValue={user?.role}
            disabled={readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="admin">
                Admin
              </SelectItem>

              <SelectItem value="doctor">
                Doctor
              </SelectItem>

              <SelectItem value="patient">
                Patient
              </SelectItem>

              <SelectItem value="receptionist">
                Receptionist
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>
            Status
          </Label>

          <Select
            defaultValue={user?.status}
            disabled={readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="active">
                Active
              </SelectItem>

              <SelectItem value="inactive">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}