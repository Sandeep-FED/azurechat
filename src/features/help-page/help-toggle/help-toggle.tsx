"use client";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { useState } from "react";
import FAQPage from "../faq-page/faq-page";
import GetStartedPage from "../get-started-page/get-started-page";

export const HelpToggle = () => {
  const [tabValue, setTabvalue] = useState("GetStarted");

  return (
    <>
      <Tabs defaultValue={tabValue} className="w-80">
        <TabsList className="flex flex-1">
          <TabsTrigger
            value="GetStarted"
            onClick={() => setTabvalue("GetStarted")}
            className="flex-1"
            title="Get Started"
          >
            Get Started
          </TabsTrigger>
          <TabsTrigger
            value="FAQ"
            onClick={() => setTabvalue("FAQ")}
            className="flex-1"
            title="FAQ"
          >
            FAQ
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {tabValue === "GetStarted" && <GetStartedPage />}
      {tabValue === "FAQ" && <FAQPage />}
    </>
  );
};
