import React from "react";
import { ReleaseNotesHero } from "../release-notes-hero/release-notes-hero";
import { Badge } from "@/features/ui/badge";

export default function ReleaseNotesPage() {
  const features = [
    {
      title: "1. Rich & Intuitive UI",
      shortDescription:
        "Enjoy a sleek, modern interface designed for effortless navigation and a smooth user experience.",
    },
    {
      title: "2. Customizable Personas",
      shortDescription:
        "Empower teams and individuals to create unique intelligent agents with personalized expertise and characteristics.",
    },
    {
      title: "3. Multi-modal Capabilities",
      shortDescription:
        "Enhance interactions with AI that can understand and respond using both text and visual inputs for a richer user experience.",
    },
    {
      title: "4. Chat with Your Files",
      shortDescription:
        "Seamlessly integrate and engage with your documents and files directly within conversations.",
    },
    {
      title: "5. Pin Personas of Your Choice",
      shortDescription:
        "Quickly access your preferred personas by pinning them for immediate and tailored interactions.",
    },
    {
      title: "6. Prompt Templates",
      shortDescription:
        "Effortlessly craft engaging conversations using pre-built templates, or create your own prompts to suit your specific needs.",
    },
    {
      title: "7. Highly Customizable",
      shortDescription:
        "Tailor the platform extensively to fit your unique requirements, from visual themes to functional capabilities.",
    },
    {
      title: "8. Enterprise-Level Security",
      shortDescription:
        "Protect your data with robust security features designed to meet the stringent requirements of enterprise-level information security.",
    },
  ];

  return (
    <>
      <ReleaseNotesHero />
      <main className="w-full p-2 mt-12">
        {/* Features */}

        <div className="flex flex-col w-full ">
          <div className="release-header  flex">
            <div className="flex items-center w-full">
              <img
                src={"Whatsnew.png"}
                alt="What's new icon"
                className="w-8 h-8 mr-2"
              />
              <h1 className="font-bold text-xl dark:text-slate-200">
                Initial Release
              </h1>
              <Badge className="text-white ml-4">
                <p>v0.1.0-beta.1</p>
              </Badge>
              <Badge variant="outline" className="ml-auto  border-white">
                <p>Released Date: 1/07/2024</p>
              </Badge>
            </div>
          </div>
          <div className="w-full bg-black bg-opacity-40 rounded-md p-8 pl-10 flex flex-col gap-8 mt-4">
            {features.map((feature) => (
              <div className="wrapper flex flex-col gap-2">
                <h2>{feature.title}</h2>
                <p className="font-normal text-sm text-muted-foreground">
                  {feature.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
