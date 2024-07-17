'use client';
import { type ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';
import { Checkbox } from '~/components/ui/checkbox';
import { type Faculty } from '~/types';

export const columns: ColumnDef<Faculty>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "subjects",
    header: "Subjects",
  },
  //   {
  //     id: 'actions',
  //     cell: ({ row }) => <CellAction data={row.original} />
  //   }
];