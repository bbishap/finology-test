import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const UserLoading: React.FC = () => {
  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index}>
          <Skeleton variant="rectangular" height={200} />
        </div>
      ))}
    </div>
  );
};
