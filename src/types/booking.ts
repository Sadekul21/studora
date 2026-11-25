export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  studioCategory: string;
  hostName: string;
  hostEmail: string;
  userName: string;
  userEmail: string;
  userImage?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  guests: number;
  note: string;
  hourlyRate: number;
  securityDeposit: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
};
