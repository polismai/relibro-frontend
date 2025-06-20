// import { Skeleton } from "@/components/ui/skeleton";

// type SkeletonSchemaProps = {
//   grid: number;
// };

// const SkeletonSchema = ({ grid }: SkeletonSchemaProps) => {
//   return (
//     <div className="max-w-6xl px-4 py-16 mx-auto">
//       <div className="grid gap-6 justify-center sm:grid-cols-2 lg:grid-cols-3">
//         {Array.from({ length: grid }).map((_, index) => (
//           <div key={index} className="flex flex-col gap-3 p-4 rounded-lg border shadow-sm w-[250px]">
//             <Skeleton className="h-[200px] w-full rounded-lg" />
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-3/4" />
//               <Skeleton className="h-4 w-1/2" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SkeletonSchema;

import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number
}

export const SkeletonSchema = (props: SkeletonSchemaProps) => {
  const { grid } = props;
  return (
    Array.from({ length: grid }).map((_, index) => (
      <div key={index} className="flex flex-col gap-8 mx-auto space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    ))
  );
}

export default SkeletonSchema;

