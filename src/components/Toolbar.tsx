import { Button } from "@/components/ui/button";
import domToImage from "dom-to-image";
import { ChevronDown } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Toolbar() {
  const onClickDownload = async (format: "jpg" | "png" | "svg") => {
    const terminalElement = document.getElementById("terminal");
    if (!terminalElement) {
      return;
    }

    let dataUrl = "";

    if (format === "jpg") {
      dataUrl = await domToImage.toPng(terminalElement);
    }
    if (format === "png") {
      dataUrl = await domToImage.toJpeg(terminalElement);
    }
    if (format === "svg") {
      dataUrl = await domToImage.toSvg(terminalElement);
    }
    const downloadLink = document.createElement("a");
    downloadLink.download = `mo_cli-export.${format}`;
    downloadLink.href = dataUrl;
    downloadLink.click();
  };

  return (
    <menu className="flex w-full min-h-fit items-center border-b border-b-gray-200 dark:border-b-gray-800 px-3 pl-5 py-2">
      <div className="flex-1 items-center">
        <h1 className="text-md before:content-['_>_'] before:text-indigo-400">
          mo_cli
        </h1>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <div className="flex items-center">
          <Button
            variant="outline"
            className="rounded-r-none"
            onClick={() => onClickDownload("png")}
          >
            Export Image
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rounded-l-none border-l-0 px-2"
              >
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onClickDownload("png")}>
                Export PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onClickDownload("jpg")}>
                Export JPG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onClickDownload("svg")}>
                Export SVG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </menu>
  );
}
