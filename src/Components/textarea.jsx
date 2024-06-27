import * as React from "react";

import { cn } from "../utils/util";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border border-slate-2800 bg-[#3333] px-3 py-2 text-sm ring-offset-white placeholder:text-black placeholder:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3FCB80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
