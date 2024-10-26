

import CardStat from "@/components/dashboard/cardStat";
import LastestProducts from "@/components/dashboard/LastestProducts";
import TopUser from "@/components/dashboard/TopUser";

export default function Dahsboard() {
  return (
    <>
      <CardStat />
      <div className="flex lg:flex-row flex-col my-6  gap-4">
        <TopUser />
        <LastestProducts />
      </div>
    </>
  );
}
