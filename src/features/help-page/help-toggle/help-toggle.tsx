"use client";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { useState } from "react";
import FAQPage from "../faq-page/faq-page";
import GetStartedPage from "../get-started-page/get-started-page";
import TermsConditionsPage from "../terms-conditions-page/terms-conditions-page";
import ReleaseNotesPage from "../release-notes-page/release-notes-page";

export const HelpToggle = () => {
  const [tabValue, setTabvalue] = useState("GetStarted");

  return (
    <>
      <Tabs defaultValue={tabValue} className="w-auto">
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
          <TabsTrigger
            value="ReleaseNotes"
            onClick={() => setTabvalue("ReleaseNotes")}
            className="flex-1"
            title="Release Notes"
          >
            Release Notes
          </TabsTrigger>
          <TabsTrigger
            value="T&C"
            onClick={() => setTabvalue("T&C")}
            className="flex-1"
            title="Terms & Conditions"
          >
            Terms & Conditions
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {tabValue === "GetStarted" && <GetStartedPage />}
      {tabValue === "FAQ" && <FAQPage />}
      {tabValue === "ReleaseNotes" && <ReleaseNotesPage />}
      {tabValue === "T&C" && <TermsConditionsPage />}
    </>
  );
};
