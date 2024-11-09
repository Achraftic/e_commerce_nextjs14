import { create } from 'zustand';


type Store = {
    orderid: number | null;
    setOrderid: (orderid: number) => void;
}

const useOrderStore = create<Store>((set) => ({
    orderid: null,
    setOrderid: (orderid: number) => set(state => ({ orderid })),
}));

export default useOrderStore