export function Toolbar({ onClickDownload }: { onClickDownload: () => void }) {
  return (
    <menu className="navbar border-b border-b-gray-700 min-h-fit px-5 py-3">
      <div className="flex-1">
        <h1 className="text-md before:content-['_>_'] before:text-accent">
          mocli
        </h1>
      </div>
      <div>
        <button className="btn btn-accent btn-sm" onClick={onClickDownload}>
          Export PNG
        </button>
      </div>
    </menu>
  );
}
