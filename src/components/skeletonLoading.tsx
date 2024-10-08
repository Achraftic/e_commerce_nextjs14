import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-row-3 md:grid-rows-2 gap-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
