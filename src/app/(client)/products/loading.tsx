import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center grid-row-3 md:grid-rows-2 gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
                <div className="flex flex-col space-y-3 my-3 m-auto" key={index}>
                    <Skeleton className="h-[250px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
