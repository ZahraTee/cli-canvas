import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeTab } from "./ThemeTab";
import { ContentTab } from "./ContentTab";

export function SidePanel({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  return (
    <menu className="flex flex-col items-center w-[400px] min-w-[280px] px-4 pt-4 pb-6 overflow-y-auto border-l border-l-gray-200 dark:border-l-gray-800">
      <Tabs defaultValue="content" className="w-full gap-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <ContentTab onClickResetContent={onClickResetContent} />
        <ThemeTab />
      </Tabs>
    </menu>
  );
}
