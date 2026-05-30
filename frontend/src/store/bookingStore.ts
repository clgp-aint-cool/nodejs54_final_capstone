import { create } from 'zustand';
import type { Seat } from '../types/booking';

interface BookingState {
  selectedSeats: Seat[];
  toggleSeat: (seat: Seat) => void;
  clearSeats: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedSeats: [],
  toggleSeat: (seat) => set((state) => {
    const isSelected = state.selectedSeats.some((s) => s.maGhe === seat.maGhe);
    if (isSelected) {
      return { selectedSeats: state.selectedSeats.filter((s) => s.maGhe !== seat.maGhe) };
    } else {
      return { selectedSeats: [...state.selectedSeats, seat] };
    }
  }),
  clearSeats: () => set({ selectedSeats: [] }),
}));
