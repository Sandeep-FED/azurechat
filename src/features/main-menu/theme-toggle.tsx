"use client";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Tabs defaultValue={theme} className="w-full">
      <TabsList className="flex flex-1">
        <TabsTrigger
          value="light"
          onClick={() => setTheme("light")}
          className="flex-1"
          title="Light theme"
        >
          <Sun size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme("dark")}
          className="flex-1"
          title="Dark theme"
        >
          <Moon size={18} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
