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
import {ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHAMPIONS } from "../lib/constants";

export default function ChampionSearchToggle({selectedChamp, setSelectedChamp, direction}: { selectedChamp: string, setSelectedChamp: (champ: string) => void, direction?: "left" | "right"}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "h-8 w-8 shrink-0 transition-colors bg-black text-white",
              open && ""
            )}
            aria-label="Toggle search"
          >
            {direction === "left" ? 
              <ArrowLeft
                className={`h-4 w-4 transition-transform duration-250 ${open ? "-rotate-90" : ""}`}
              />
            :
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-250 ${open ? "rotate-90" : ""}`}
              />
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-40 p-0 bg-black text-white shadow-2xl max-h-36"
          align="start"
          side={direction === "left" ? "left" : "right"}
          sideOffset={8}
        >
        <Command 
          className="font-serif bg-black text-white text-xs"
          filter={(value, search) => {
            if (value.toLowerCase().startsWith(search.toLowerCase())) return 1;
              return 0;
          }}
        >
          <CommandInput placeholder="Search..." className="h-7 text-xs" />
            <CommandList className="pt-1">
              <CommandEmpty>No results found.</CommandEmpty>
              {Object.entries(CHAMPIONS).map(([value, label]) => (
                <CommandItem
                  key={label}
                  value={label}
                  className="text-xs py-1.5 data-[selectedChamp=true]:bg-zinc-800 data-[selectedChamp=true]:text-white"
                  onSelect={() => {
                    setSelectedChamp(value === selectedChamp ? "" : value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-white!",
                      selectedChamp === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}