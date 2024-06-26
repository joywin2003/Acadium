'use client';
import { ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';
import { Student } from '~/constants/data';
import { Checkbox } from '~/components/ui/checkbox';

export const columns: ColumnDef<Student>[] = [
  {
    id: 'select',
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
    enableHiding: false
  },
  {
    accessorKey: 'usn',
    header: 'USN'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'branch',
    header: 'Branch'
  },
  {
    accessorKey: 'section',
    header: 'Section'
  }
//   {
//     id: 'actions',
//     cell: ({ row }) => <CellAction data={row.original} />
//   }
];