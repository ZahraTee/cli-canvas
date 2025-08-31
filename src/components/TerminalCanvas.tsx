import React from "react";

export const TerminalCanvas = React.forwardRef<HTMLDivElement>(
  function TerminalCanvas(_, canvasRef) {
    return (
      <div className="mockup-code w-full min-w-200 min-h-100 m-10 overflow-hidden">
        <div
          contentEditable
          suppressContentEditableWarning
          className="canvas min-w-lg caret-accent"
          ref={canvasRef}
        />
      </div>
    );
  },
);
