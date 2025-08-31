export function SidePanel({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  return (
    <menu className="flex flex-col w-120 h-full p-10 border-l border-l-gray-700 items-center">
      <button className="btn btn-error" onClick={onClickResetContent}>
        Reset content to default
      </button>
    </menu>
  );
}
