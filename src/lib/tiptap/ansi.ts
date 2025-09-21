import {
  getBgColorClassName,
  getFgColorClassName,
  type AnsiColor,
  type AnsiColorVariant,
} from "../color";

type TextSegment = {
  text: string;
  fgColor?: string | null;
  bgColor?: string | null;
  bold: boolean;
  underline: boolean;
};

export function parseAnsiText(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  // We're specifically looking for control chars!
  // eslint-disable-next-line no-control-regex
  const ansiRegex = /\x1b\[([0-9;]*)m/g;

  let lastIndex = 0;
  let currentFgColor: string | null = null;
  let currentBgColor: string | null = null;
  let currentBold = false;
  let currentUnderline = false;
  let match;

  while ((match = ansiRegex.exec(text)) !== null) {
    // Add text before this ANSI sequence
    const textBefore = text.slice(lastIndex, match.index);
    if (textBefore) {
      segments.push({
        text: textBefore,
        fgColor: currentFgColor,
        bgColor: currentBgColor,
        bold: currentBold,
        underline: currentUnderline,
      });
    }

    // Parse the ANSI sequence
    const codes = match[1].split(";").map(Number);
    ({ currentFgColor, currentBgColor, currentBold, currentUnderline } =
      parseAnsiCodes(
        codes,
        currentFgColor,
        currentBgColor,
        currentBold,
        currentUnderline,
      ));

    lastIndex = ansiRegex.lastIndex;
  }

  const remainingText = text.slice(lastIndex);
  if (remainingText) {
    segments.push({
      text: remainingText,
      fgColor: currentFgColor,
      bgColor: currentBgColor,
      bold: currentBold,
      underline: currentUnderline,
    });
  }
  return segments;
}

const colorMap: Record<
  number,
  { type: "fgColor" | "bgColor"; color: AnsiColor; variant: AnsiColorVariant }
> = {
  30: { type: "fgColor", color: "black", variant: "standard" },
  31: { type: "fgColor", color: "red", variant: "standard" },
  32: { type: "fgColor", color: "green", variant: "standard" },
  33: { type: "fgColor", color: "yellow", variant: "standard" },
  34: { type: "fgColor", color: "blue", variant: "standard" },
  35: { type: "fgColor", color: "purple", variant: "standard" },
  36: { type: "fgColor", color: "cyan", variant: "standard" },
  37: { type: "fgColor", color: "white", variant: "standard" },
  40: { type: "bgColor", color: "black", variant: "standard" },
  41: { type: "bgColor", color: "red", variant: "standard" },
  42: { type: "bgColor", color: "green", variant: "standard" },
  43: { type: "bgColor", color: "yellow", variant: "standard" },
  44: { type: "bgColor", color: "blue", variant: "standard" },
  45: { type: "bgColor", color: "purple", variant: "standard" },
  46: { type: "bgColor", color: "cyan", variant: "standard" },
  47: { type: "bgColor", color: "white", variant: "standard" },
  90: { type: "fgColor", color: "black", variant: "intense" },
  91: { type: "fgColor", color: "red", variant: "intense" },
  92: { type: "fgColor", color: "green", variant: "intense" },
  93: { type: "fgColor", color: "yellow", variant: "intense" },
  94: { type: "fgColor", color: "blue", variant: "intense" },
  95: { type: "fgColor", color: "purple", variant: "intense" },
  96: { type: "fgColor", color: "cyan", variant: "intense" },
  97: { type: "fgColor", color: "white", variant: "intense" },
  100: { type: "bgColor", color: "black", variant: "intense" },
  101: { type: "bgColor", color: "red", variant: "intense" },
  102: { type: "bgColor", color: "green", variant: "intense" },
  103: { type: "bgColor", color: "yellow", variant: "intense" },
  104: { type: "bgColor", color: "blue", variant: "intense" },
  105: { type: "bgColor", color: "purple", variant: "intense" },
  106: { type: "bgColor", color: "cyan", variant: "intense" },
  107: { type: "bgColor", color: "white", variant: "intense" },
};

/** Converts ANSI codes to class names */
export function parseAnsiCodes(
  codes: number[],
  currentFgColor: string | null,
  currentBgColor: string | null,
  currentBold: boolean = false,
  currentUnderline: boolean = false,
): {
  currentFgColor: string | null;
  currentBgColor: string | null;
  currentBold: boolean;
  currentUnderline: boolean;
} {
  for (const code of codes) {
    if (code === 0) {
      // Reset all formatting
      currentFgColor = null;
      currentBgColor = null;
      currentBold = false;
      currentUnderline = false;
    }
    if (code === 1) {
      currentBold = true;
    }
    if (code === 4) {
      currentUnderline = true;
    }
    if (colorMap[code]?.type === "fgColor") {
      currentFgColor = getFgColorClassName(
        colorMap[code].color,
        colorMap[code].variant,
      );
    }
    if (colorMap[code]?.type === "bgColor") {
      currentBgColor = getBgColorClassName(
        colorMap[code].color,
        colorMap[code].variant,
      );
    }
    if (code === 39) {
      // Reset foreground color to default
      currentFgColor = null;
    }
    if (code === 49) {
      // Reset background color to default
      currentFgColor = null;
    }
    // TODO: Add more ANSI code handling as needed (256-color, RGB, etc.)
  }

  return { currentFgColor, currentBgColor, currentBold, currentUnderline };
}
