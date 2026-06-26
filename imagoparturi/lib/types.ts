export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type Reservation = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service: string; // service id
  service_name: string; // human-readable, stored for convenience
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes: string;
  status: ReservationStatus;
  created_at: string; // ISO timestamp
};

export type NewReservation = Omit<Reservation, "id" | "status" | "created_at">;
