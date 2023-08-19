// Import the 'create' function from the 'zustand' library
import { create } from "zustand";

// Define the structure of the UploadModalStore
interface UploadModalStore {
  isOpen: boolean; // A boolean flag indicating whether the modal is open or not
  onOpen: () => void; // A function to open the modal
  onClose: () => void; // A function to close the modal
}

// Create a custom hook named 'useUploadModal' using Zustand's 'create' function
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false, // Initial state: modal is closed
  onOpen: () => set({ isOpen: true }), // Function to set the 'isOpen' state to true, opening the modal
  onClose: () => set({ isOpen: false }), // Function to set the 'isOpen' state to false, closing the modal
}));

// Export the 'useUploadModal' custom hook as the default export
export default useUploadModal;
