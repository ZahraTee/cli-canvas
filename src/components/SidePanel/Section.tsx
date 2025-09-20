import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      className="w-full"
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-widest  dark:text-indigo-300 text-indigo-700 py-1">
        {title}
        <CollapsibleTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            {isOpen ? <Minus /> : <Plus />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-3 mt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
