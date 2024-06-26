"use client";
import { AI_NAME } from "@/features/theme/theme-config";
import { signIn } from "next-auth/react";
import { FC, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { cn } from "../ui/lib";
import { Raleway } from "next/font/google";
import { useTheme } from "next-themes";

interface LoginProps {
  isDevMode: boolean;
}

const ralewaySans = Raleway({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export const LogIn: FC<LoginProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const botIcon =
    theme === "dark" ? "Intellient_Dark_Icon.png" : "Intellient_Light_Icon.png";

  return (
    <>
      <div className="flex gap-2 flex-col min-w-[300px] items-center w-[70%]">
        <div className="flex items-center gap-2">
          <img src={botIcon} width={50} />
          <p className={cn(ralewaySans.className, "text-3xl font-semibold")}>
            {AI_NAME}
          </p>
        </div>
        <div className="flex flex-col items-center mt-8 gap-4">
          <p>Login</p>
          <Button
            onClick={() => signIn("azure-ad")}
            className="dark:bg-white dark:hover:bg-primary hover:text-white bg-primary"
          >
            {" "}
            <img src={"login_microsoft_logo.svg"} className="pr-3" />
            Microsoft 365
          </Button>
          {props.isDevMode ? (
            <Button
              onClick={() => signIn("localdev")}
              className="
                dark:bg-white dark:hover:bg-primary dark:hover:text-white bg-primary"
            >
              Basic Auth (DEV ONLY)
            </Button>
          ) : null}
        </div>
      </div>
      <Card className="flex gap-2 flex-col min-w-[480px] relative bg-[#7022D3] dark:bg-opacity-40 bg-opacity-100  h-full w-1/2">
        <img
          src={"login_circles_illustration.svg"}
          className="absolute bottom-0"
          width="400px"
        />
        <Card className="bg-[#E32FAB] bg-opacity-25 border-solid border-white border-opacity-20 backdrop-blur-[8px] m-8 pt-8 px-8 h-full relative">
          <CardTitle className="text-2xl text-white">
            Where AI meets enterprise agility
          </CardTitle>
          <CardDescription className="text-white pt-3 pr-4 font-thin text-base">
            Pave the way for true organizational intelligence.
          </CardDescription>
          <img
            src={"Quadra_Light_Logo.png"}
            className="absolute left-8 bottom-8"
            width={100}
          />
          <img
            src={"login_ilustration3.svg"}
            className="absolute right-4 -bottom-2 h-3/4 xl:h-3/5"
          />
        </Card>
      </Card>
    </>
  );
};
