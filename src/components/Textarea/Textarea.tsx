import { TextareaHTMLAttributes } from "react";

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={className}
      {...props}
    />
  );
};
