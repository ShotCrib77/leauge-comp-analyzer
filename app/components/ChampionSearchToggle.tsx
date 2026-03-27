"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "Gatsby",
  "React Router",
  "TanStack Start",
  "Qwik City",
  "SolidStart",
];

export default function ChampionSearchToggle() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 shrink-0 transition-colors",
              open && "bg-accent text-accent-foreground"
            )}
            aria-label="Toggle search"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-50 p-0"
          align="start"
          side="right"
          sideOffset={8}
        >
          <Command className="font-mono">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {ITEMS.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(val) => {
                    setSelected(val === selected ? null : val);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected && (
        <span className="text-sm text-muted-foreground">{selected}</span>
      )}
    </div>
  );
}