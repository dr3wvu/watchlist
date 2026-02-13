"use client";
import React, { useCallback, useState, forwardRef, useEffect } from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// utils
import { cn } from "@/lib/utils";

// assets
import { ChevronDown, CheckIcon, Globe, ChevronsUpDown } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

// datas
import { countries as allCountries } from "country-data-list";
import { Label } from "../ui/label";
import { Controller, Control, FieldError } from "react-hook-form";
import { Button } from "../ui/button";

// Country interface
export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

const CountryDropdownComponent = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  //   const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
  //     undefined,
  //   );

  const countries = allCountries.all.filter(
    (country: Country) =>
      country.emoji && country.status !== "deleted" && country.ioc !== "PRK",
  );

  const selectedCountry = value
    ? countries.find((c) => c.name === value)
    : undefined;

  //   const getFlagEmoji = (value: string) => {
  //     console.log(value);
  //     console.log(countries.find((c) => c.name === value)?.emoji);
  //     return countries.find((c) => c.name === value)?.emoji;
  //   };
  //   useEffect(() => {
  //     if (value) {
  //       const initialCountry = options.find(
  //         (country) => country.alpha3 === value,
  //       );
  //       if (initialCountry) {
  //         setSelectedCountry(initialCountry);
  //       } else {
  //         // Reset selected country if defaultValue is not found
  //         setSelectedCountry(undefined);
  //       }
  //     } else {
  //       // Reset selected country if defaultValue is undefined or null
  //       setSelectedCountry(undefined);
  //     }
  //   }, [value, options]);

  //   const handleSelect = useCallback(
  //     (country: Country) => {
  //       console.log("🌍 CountryDropdown value: ", country);
  //       setSelectedCountry(country);
  //     //   onChange?.(country);
  //       setOpen(false);
  //     },
  //     [onChange],
  //   );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="country-select-trigger"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {selectedCountry && (
              <span className="h-8 w-8">
                <CircleFlag
                  countryCode={selectedCountry.alpha2.toLowerCase()}
                  height={20}
                />
              </span>
            )}
            <span className="">
              {selectedCountry
                ? selectedCountry.name
                : "Select your country..."}
            </span>
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="min-w-[var(--radix-popper-anchor-width)] p-0 bg-gray-800 border-gray-600"
        avoidCollisions={true}
      >
        <Command className="bg-gray-800 border-gray-600">
          <CommandList>
            <CommandInput
              className="country-select-input"
              placeholder="Search country..."
            />
            <CommandEmpty className="country-select-empty">
              No country found.
            </CommandEmpty>
            <CommandGroup>
              {countries
                .filter((x) => x.name)
                .map((country, key: number) => (
                  <CommandItem
                    className="flex items-center w-full gap-2"
                    key={key}
                    onSelect={() => {
                      onChange(country.name);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
                      <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                        <CircleFlag
                          countryCode={country.alpha2.toLowerCase()}
                          height={20}
                        />
                      </div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {country.name}
                      </span>
                    </div>
                    {/* <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        country.name === selectedCountry?.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    /> */}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <CountryDropdownComponent
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <p className="text-xs text-gray-500">
        Show market data and news relevant to you
      </p>
    </div>
  );
};
