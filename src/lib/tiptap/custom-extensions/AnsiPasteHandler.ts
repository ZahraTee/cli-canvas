import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { parseAnsiText } from "../ansi";

export const AnsiPasteHandler = Extension.create({
  name: "ansiPaste",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("ansiPasteHandler"),
        props: {
          handlePaste: (view, event) => {
            const pastedText = event.clipboardData?.getData("text/plain");
            if (!pastedText) return false;

            const containsAnsiSequence = pastedText.includes("\x1b[");
            if (!containsAnsiSequence) {
              return false; // Allow default paste behavior
            }

            const parsedSegments = parseAnsiText(pastedText);

            const { tr } = view.state;
            const { from, to } = view.state.selection;

            // Delete current selection if any
            if (from !== to) {
              tr.delete(from, to);
            }

            let currentPos = from;
            parsedSegments.forEach((segment) => {
              if (!segment.text) {
                return;
              }
              const textNode = view.state.schema.text(segment.text);

              if (
                segment.fgColor ||
                segment.bgColor ||
                segment.bold ||
                segment.underline
              ) {
                const mark = view.state.schema.marks.textStyle.create({
                  fgColor: segment.fgColor,
                  bgColor: segment.bgColor,
                  bold: segment.bold ? "ansi-bold" : undefined,
                  underline: segment.underline ? "ansi-underline" : undefined,
                });
                tr.insert(currentPos, textNode.mark([mark]));
              } else {
                tr.insert(currentPos, textNode);
              }

              currentPos += segment.text.length;
            });

            view.dispatch(tr);
            return true; // Prevent default paste
          },
        },
      }),
    ];
  },
});
