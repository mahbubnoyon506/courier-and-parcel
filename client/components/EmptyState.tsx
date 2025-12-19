import React from "react";

interface Props {
  context: string;
}

const EmptyState = ({ context }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <p className="text-muted-foreground animate-pulse">
        The items of {context} is empty
      </p>
    </div>
  );
};

export default EmptyState;
