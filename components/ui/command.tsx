"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useLanguage } from "@/components/language-provider"
import { useTranslations } from "@/lib/translations"

interface CommandDialogProps extends DialogProps {
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
}

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-card text-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, searchValue, onSearchValueChange, ...props }: CommandDialogProps) => {
  const { language } = useLanguage()
  const { t } = useTranslations()
  
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 bg-card shadow-none border border-border max-w-2xl w-full rounded-none md:rounded-2xl">
        <DialogTitle asChild>
          <VisuallyHidden>Global Search</VisuallyHidden>
        </DialogTitle>
        <Command className="w-full">
          <div className="flex flex-col items-center w-full p-8 pt-8" style={{ flexDirection: 'column' }}>
            {/* Logo at the top center */}
            <div className="w-full flex justify-center mb-6">
              <img src="/images/Light_Mode_Logo.jpeg" alt="Berwel Logo" className="h-16 w-16 object-contain" />
            </div>
            {/* Search bar with icon - exactly like English version */}
            <div className="w-full mb-8 flex items-center border-b border-border px-3" style={{ flexDirection: 'row' }}>
              <Search className="mr-3 h-8 w-8 text-primary" />
              <CommandInput
                autoFocus
                value={searchValue}
                onValueChange={onSearchValueChange}
                className="flex-1 h-16 text-3xl font-bold bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground placeholder:font-bold placeholder:text-3xl px-0"
                style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                placeholder={t('searchBerwel')}
              />
            </div>
            <div className="w-full">
              <div className="text-foreground text-lg font-semibold mb-4 text-center">{t('quickLinks')}</div>
              <CommandList>
                <CommandGroup className="text-center">
                  <CommandItem asChild className="justify-center">
                    <a href="/library" className="text-xl font-bold text-foreground hover:text-primary transition-colors text-center block w-full">{t('libyanSongs')}</a>
                  </CommandItem>
                  <CommandItem asChild className="justify-center">
                    <a href="/library?tab=maloof" className="text-xl font-bold text-foreground hover:text-primary transition-colors text-center block w-full">{t('maloofEntries')}</a>
                  </CommandItem>
                </CommandGroup>
                {/* Suggestions will be rendered here by children */}
          {children}
              </CommandList>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  value?: string;
  onValueChange?: (value: string) => void;
}
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, value, onValueChange, ...props }, ref) => (
    <CommandPrimitive.Input
      ref={ref}
    value={value}
    onValueChange={onValueChange}
      className={cn(
      "flex h-16 w-full rounded-md bg-transparent py-3 text-3xl font-bold text-foreground placeholder:text-muted-foreground outline-none border-none disabled:cursor-not-allowed disabled:opacity-50 px-0",
        className
      )}
      {...props}
    />
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
