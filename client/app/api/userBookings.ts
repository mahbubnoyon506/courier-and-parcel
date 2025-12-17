// api/bookings.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// READ
export const fetchCustomerBookings = async () => {
  const res = await fetch(`${API_URL}/history`);
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return res.json();
};

// DELETE
export const deleteBooking = async (bookingId: string) => {
  const res = await fetch(`${API_URL}/${bookingId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    // Attempt to parse error message from server
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete booking");
  }
  return res.json();
};

// UPDATE (Partial Update)
export const updateBooking = async (bookingId: string, updates: Partial) => {
  const res = await fetch(`${API_URL}/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update booking");
  }
  return res.json();
};
