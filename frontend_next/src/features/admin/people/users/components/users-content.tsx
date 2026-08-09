"use client";

import { useState } from "react";

import { UserTable } from "./user-table";
import { UserTableToolbar } from "./user-table-toolbar";

export function UsersContent() {
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("all");

  const [status, setStatus] = useState("all");


  return (
    <>
      <UserTableToolbar
        search={search}
        role={role}
        status={status}
        onSearchChange={setSearch}
        onRoleChange={(value) => {
          setRole(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
      />

      <UserTable
        page={page}
        limit={limit}
        search={search}
        role={role}
        status={status}
        onPageChange={setPage}
        onPageSizeChange={(value) => {
          setLimit(value);
          setPage(1);
        }}
      />
    </>
  );
}