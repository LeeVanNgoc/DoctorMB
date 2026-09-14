"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { FilterSelect } from "@/shared/components/common/filter-select";
import { DataPagination } from "@/shared/components/common/data-pagination";

import { PatientDialogLayout } from "../components/patient-dialog-layout";

import {
  PATIENT_BLOOD_TYPE,
  PATIENT_GENDER,
} from "../constants/patient-filters";

import { useCreatePatient, usePatientUsers } from "../hooks/use-patients";

import type {
  BloodType,
  CreatePatientRequest,
  PatientGender,
  PatientUser,
} from "../types";

type AccountMode = "existing" | "new";

const INITIAL_FORM_DATA: CreatePatientRequest = {
  userId: undefined,
  fullName: "",
  email: "",
  password: "",
  phone: "",
  gender: "Male",
  dateOfBirth: "",
  address: "",
  bloodType: undefined,
};

interface CreatePatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePatientDialog({
  open,
  onOpenChange,
}: CreatePatientDialogProps) {
  const [userPage, setUserPage] = useState(1);

  const [accountMode, setAccountMode] = useState<AccountMode>("existing");

  const [userSearch, setUserSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState<PatientUser | null>(null);

  const [formData, setFormData] =
    useState<CreatePatientRequest>(INITIAL_FORM_DATA);

  const [showPassword, setShowPassword] = useState(false);

  const { data, isLoading } = usePatientUsers({
    search: userSearch,
    page: userPage,
  });

  const users = data?.data ?? [];

  const patientUsers = users.filter(
    (user): user is PatientUser => user.role === "patient",
  );

  const { mutateAsync: createPatient, isPending } = useCreatePatient();

  const handleChange = <K extends keyof CreatePatientRequest>(
    field: K,
    value: CreatePatientRequest[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectUser = (user: PatientUser) => {
    setSelectedUser(user);

    setFormData((prev) => ({
      ...prev,
      userId: user._id,
    }));
  };

  const handleChangeAccountMode = (mode: AccountMode) => {
    setAccountMode(mode);

    if (mode === "existing") {
      setFormData((prev) => ({
        ...prev,
        userId: undefined,
        fullName: "",
        email: "",
        password: "",
        phone: "",
      }));
    } else {
      setSelectedUser(null);

      setFormData((prev) => ({
        ...prev,
        userId: undefined,
      }));
    }
  };

  const handleSearchUsers = (value: string) => {
    setUserSearch(value);
    setUserPage(1);
  };

  const handleChangePage = (page: number) => {
    setUserPage(page);
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setAccountMode("existing");
    setSelectedUser(null);
    setUserSearch("");
    setUserPage(1);
    setShowPassword(false);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleAdd = async () => {
    // ==========================================
    // 1. Validate Existing User
    // ==========================================

    if (accountMode === "existing" && !formData.userId) {
      toast.error("Please select an existing user.");
      return;
    }

    // ==========================================
    // 2. Validate Patient Profile
    // ==========================================

    if (!formData.gender) {
      toast.error("Please select a gender.");
      return;
    }

    if (!formData.dateOfBirth) {
      toast.error("Please select date of birth.");
      return;
    }

    // ==========================================
    // 3. Validate New Account
    // ==========================================

    if (accountMode === "new") {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.phone
      ) {
        toast.error("Please fill in all account information.");
        return;
      }
    }

    try {
      // ==========================================
      // 4. Build Payload
      // ==========================================

      const payload: CreatePatientRequest =
        accountMode === "existing"
          ? {
              userId: formData.userId,
              gender: formData.gender,
              dateOfBirth: formData.dateOfBirth,
              address: formData.address || undefined,
              bloodType: formData.bloodType,
            }
          : {
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password,
              phone: formData.phone,
              gender: formData.gender,
              dateOfBirth: formData.dateOfBirth,
              address: formData.address || undefined,
              bloodType: formData.bloodType,
            };

      // ==========================================
      // 5. Create Patient
      // ==========================================

      await createPatient(payload);

      toast.success("Patient added successfully.");

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Create patient failed:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(
          Array.isArray(message)
            ? message[0]
            : message || "Failed to add patient.",
        );

        return;
      }

      toast.error("Failed to add patient.");
    }
  };

  return (
    <PatientDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Add Patient"
      description="Create a healthcare profile for a patient."
    >
      <div className="space-y-6">
        {/* Account Type */}
        <div className="space-y-3">
          <Label>Account</Label>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={accountMode === "existing" ? "default" : "outline"}
              onClick={() => handleChangeAccountMode("existing")}
            >
              Existing User
            </Button>

            <Button
              type="button"
              variant={accountMode === "new" ? "default" : "outline"}
              onClick={() => handleChangeAccountMode("new")}
            >
              New Account
            </Button>
          </div>
        </div>

        {/* Existing User */}
        {accountMode === "existing" && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>User</Label>

              <Input
                value={userSearch}
                onChange={(event) => handleSearchUsers(event.target.value)}
                placeholder="Search existing users..."
              />
            </div>

            <div className="rounded-md border">
              {isLoading ? (
                <p className="p-3 text-sm text-muted-foreground">
                  Loading users...
                </p>
              ) : patientUsers.length > 0 ? (
                <div className="divide-y">
                  {patientUsers.map((user) => (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => handleSelectUser(user)}
                      className="flex w-full flex-col items-start p-3 text-left hover:bg-muted"
                    >
                      <span className="text-sm font-medium">
                        {user.fullName}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>

                      {user.phone && (
                        <span className="text-sm text-muted-foreground">
                          {user.phone}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="p-3 text-sm text-muted-foreground">
                  No users found.
                </p>
              )}
            </div>

            {/* User Pagination */}
            {data?.pagination && data.pagination.totalPages > 1 && (
              <DataPagination
                currentPage={userPage}
                pageSize={5}
                totalItems={data.pagination.total}
                resourceName="users"
                onPageChange={setUserPage}
                showPageSizeSelector={false}
              />
            )}

            {/* Selected User */}
            <div className="rounded-md border">
              {selectedUser ? (
                <div className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm font-medium">
                      {selectedUser.fullName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {selectedUser.email}
                    </p>

                    {selectedUser.phone && (
                      <p className="text-sm text-muted-foreground">
                        {selectedUser.phone}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(null);

                      setFormData((prev) => ({
                        ...prev,
                        userId: undefined,
                      }));
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <p className="p-3 text-sm text-muted-foreground">
                  No user selected.
                </p>
              )}
            </div>
          </div>
        )}

        {/* New Account */}
        {accountMode === "new" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Account Information</h3>

              <p className="text-sm text-muted-foreground">
                Create a new account for this patient.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>

              <Input
                value={formData.fullName ?? ""}
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
                placeholder="Enter full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  value={formData.email ?? ""}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="Enter email"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>

                <Input
                  value={formData.phone ?? ""}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password ?? ""}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  placeholder="Enter password"
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patient Profile */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Patient Profile</h3>

            <p className="text-sm text-muted-foreground">
              Healthcare information for this patient.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>

              <FilterSelect
                value={formData.gender}
                onValueChange={(value) =>
                  handleChange("gender", value as PatientGender)
                }
                options={PATIENT_GENDER}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>

              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(event) =>
                  handleChange("dateOfBirth", event.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Address</Label>

              <Input
                value={formData.address ?? ""}
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
                placeholder="Enter address"
              />
            </div>

            <div className="space-y-2">
              <Label>Blood Type</Label>

              <FilterSelect
                value={formData.bloodType ?? ""}
                onValueChange={(value) =>
                  handleChange(
                    "bloodType",
                    value ? (value as BloodType) : undefined,
                  )
                }
                options={PATIENT_BLOOD_TYPE}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleCancel} disabled={isPending}>
          Cancel
        </Button>

        <Button onClick={handleAdd} disabled={isPending}>
          {isPending ? "Adding..." : "Add Patient"}
        </Button>
      </DialogFooter>
    </PatientDialogLayout>
  );
}
