export type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  gallery: string[];
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  ownerImage?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
};
