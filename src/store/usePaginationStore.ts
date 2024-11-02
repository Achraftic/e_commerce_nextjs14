import { create } from 'zustand';


type Store = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const usePaginationStore = create<Store>((set) => ({
    currentPage: 1,
    setCurrentPage: (page: number) => set((state) => ({ ...state, page })),
}));

export default usePaginationStore