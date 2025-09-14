export function Toolbar({ onClickDownload }: { onClickDownload: () => void }) {
  return (
    <menu className="navbar border-b border-b-gray-300 dark:border-b-gray-600 min-h-fit px-5 py-3">
      <div className="flex-1">
        <h1 className="text-md before:content-['_>_'] before:text-primary dark:before:text-indigo-400">
          mocli
        </h1>
      </div>
      <div>
        <button className="btn btn-sm btn-primary" onClick={onClickDownload}>
          Export PNG
        </button>
      </div>
    </menu>
  );
}
