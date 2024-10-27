

import CardStat from "@/components/dashboard/cardStat";
import LastestProducts from "@/components/dashboard/LastestProducts";
import TopUser from "@/components/dashboard/TopUser";
import H1 from "@/components/ui/h1";

export default function Dahsboard() {
  return (
    <>
    <H1 className=" max-md:text-2xl text-zinc-700">Welcome Back 👋  <span className="text-primary"> Admin</span>  </H1>
      <CardStat />
      <div className="flex lg:flex-row flex-col my-6  gap-4">
        <TopUser />
        <LastestProducts />
      </div>
    </>
  );
}
