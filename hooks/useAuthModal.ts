// Import the 'create' function from the 'zustand' library
import { create } from "zustand";

// Define the structure of the AuthModalStore
interface AuthModalStore {
  isOpen: boolean; // A boolean flag indicating whether the modal is open or not
  onOpen: () => void; // A function to open the modal
  onClose: () => void; // A function to close the modal
}

// Create a custom hook named 'useAuthModal' using Zustand's 'create' function
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false, // Initial state: modal is closed
  onOpen: () => set({ isOpen: true }), // Function to set the 'isOpen' state to true, opening the modal
  onClose: () => set({ isOpen: false }), // Function to set the 'isOpen' state to false, closing the modal
}));

// Export the 'useAuthModal' custom hook as the default export
export default useAuthModal;
