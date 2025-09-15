import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

export function Toolbar({ onClickDownload }: { onClickDownload: () => void }) {
  return (
    <menu className="flex w-full min-h-fit items-center border-b border-b-gray-200 dark:border-b-gray-800 px-5 py-3">
      <div className="flex-1 items-center">
        <h1 className="text-md before:content-['_>_'] before:text-primary dark:before:text-indigo-400">
          mocli
        </h1>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <Button onClick={onClickDownload}>Export PNG</Button>
      </div>
    </menu>
  );
}
