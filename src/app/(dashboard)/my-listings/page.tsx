import type { Metadata } from "next";
import MyListings from "@/components/studios/MyListings";

export const metadata: Metadata = {
  title: "My studio listings — Studora",
};

export default function MyListingsPage() {
  return <MyListings />;
}
