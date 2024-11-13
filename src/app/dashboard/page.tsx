

import { InventoryLevels } from "@/components/dashboard/analytics/InventoryLevels";
import Overview from "@/components/dashboard/analytics/Overview";
import CardStat from "@/components/dashboard/cardStat";
import LastestProducts from "@/components/dashboard/LastestProducts";
import TopUser from "@/components/dashboard/TopUser";
import H1 from "@/components/ui/h1";

export default function Dahsboard() {
  return (
    <>
    <H1 className=" max-md:text-2xl text-zinc-700 dark:text-zinc-50">Welcome Back 👋  <span className="text-primary"> Admin</span>  </H1>
      <CardStat />
      <div className="grid md:grid-cols-2 grid-cols-1 my-10 gap-5 ">
        <InventoryLevels />
        <Overview/>
      </div>
      <div className="flex lg:flex-row flex-col my-6  gap-4">
        <TopUser />
        <LastestProducts />
      </div>
    </>
  );
}
