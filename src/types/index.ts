import { type Icons } from "~/components/common/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export interface User {
  id: string | undefined;
  usn?: string |undefined;
  email: string |undefined;
  role: string | undefined;
  name: string | undefined;
  branch?: string |undefined;
}

export type Student = {
  id: string;
  usn: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  section: string;
};

export type Faculty = {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  subjects: string;
};


export type Mail = {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
  url?: string; 
}



// import { Key } from "react";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";

// export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {
//   key: Key | null | undefined;
//   url: string | StaticImport;
//   name: string;
// }