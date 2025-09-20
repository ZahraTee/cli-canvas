import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import {
  getAnsiColorLabel,
  type AnsiColor,
  type AnsiColorVariant,
} from "@/lib/color";
import { PRESET_THEMES, type PresetThemeName } from "@/lib/themes";
import { useTheme } from "@/stores/theme";
import { Section } from "./Section";

export function ThemeTab() {
  const {
    theme: { colors },
    selectedTheme,
    selectTheme,
    setBackgroundColor,
    setForegroundColor,
  } = useTheme();

  return (
    <TabsContent value="theme" className="w-full flex-1 flex flex-col gap-4">
      <div className="flex gap-2 justify-between items-center">
        <span className="text-sm">Theme</span>
        <Select
          value={selectedTheme}
          onValueChange={(value) =>
            selectTheme(value as PresetThemeName | "Custom")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(PRESET_THEMES)
              .concat("Custom")
              .map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center">
        <Label className="text-sm" htmlFor="background">
          Background
        </Label>
        <input
          id="background"
          type="color"
          value={colors.background}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <Label className="text-sm" htmlFor="foreground">
          Foreground
        </Label>
        <input
          id="foreground"
          type="color"
          value={colors.foreground}
          onChange={(e) => {
            setForegroundColor(e.target.value);
          }}
        />
      </div>

      <ThemeColorControls variant="standard" />
      <ThemeColorControls variant="intense" />
    </TabsContent>
  );
}

function ThemeColorControls({ variant }: { variant: AnsiColorVariant }) {
  const {
    theme: { colors },
    setAnsiColor,
  } = useTheme();
  const ansiColorMappings = colors[variant];
  return (
    <Section title={`${variant} Colors`}>
      <div className="grid grid-cols-2 gap-y-2 gap-x-5 items-center w-full flex-wrap">
        {Object.entries(ansiColorMappings).map(([color, value]) => (
          <div className="flex-1 flex justify-between" key={color}>
            <Label className="text-sm" htmlFor={`${color}-${variant}`}>
              {getAnsiColorLabel(color as AnsiColor)}
            </Label>
            <input
              id={`${color}-${variant}`}
              type="color"
              className="justify-self-center w-10"
              value={value}
              onChange={(e) => {
                setAnsiColor(
                  color as AnsiColor,
                  variant,
                  e.target.value as string,
                );
              }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
