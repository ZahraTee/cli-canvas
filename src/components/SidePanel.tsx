import { useCurrentEditor } from "@tiptap/react";

export function SidePanel({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  const { editor } = useCurrentEditor();
  return (
    <menu className="flex flex-col w-120 h-full p-10 border-l border-l-gray-700 items-center">
      <div className="flex-1">
        <div className="flex gap-2">
          <button
            className="btn btn-neutral"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            Bold
          </button>
          <button
            className="btn btn-neutral"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            Underline
          </button>
        </div>
      </div>
      <div className="flex-0">
        <button className="btn btn-error" onClick={onClickResetContent}>
          Reset content to default
        </button>
      </div>
    </menu>
  );
}
