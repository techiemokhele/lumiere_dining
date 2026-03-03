import React from "react";

interface FormLabelWithNumberProps {
  number?: number;
  label: string;
}

export function FormLabelWithNumberComponent({
  number,
  label,
}: FormLabelWithNumberProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex justify-center h-6 w-6 rounded-full border border-crimson-500 bg-burgundy-700">
        <p className="font-normal text-sm text-crimson-500">{number}</p>
      </div>
      <p className="!font-bold xl:text-2xl lg:text-md !text-sm text-white">
        {label}
      </p>
    </div>
  );
}
