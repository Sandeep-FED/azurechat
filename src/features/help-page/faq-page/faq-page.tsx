import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/features/ui/accordion";
import React from "react";
import { FAQHero } from "../faq-hero/faq-hero";

const faqs = [
  {
    question: "1. What is QBot?",
    answer:
      "QBot is Quadra’s enterprise AI assistant powered by Azure OpenAI Services. It provides intelligent support through chat, personalized interactions, and a range of AI-driven functionalities to streamline tasks and boost productivity.",
  },
  {
    question: "2. How does QBot enhance my daily tasks?",
    answer:
      "QBot assists with automating repetitive tasks, generating content, and providing insights tailored to your role and department. It integrates seamlessly with your existing workflows and tools.",
  },
  {
    question: "3. Can QBot generate images?",
    answer:
      "Yes, QBot can create images using DALL-E 3, an AI model that generates high-quality visuals from textual descriptions. You can request custom images for presentations, reports, or creative projects.",
  },
  {
    question: "4. Can QBot chat with your file?",
    answer:
      "QBot can analyze and provide insights from your files. Simply upload a document or dataset, and QBot will help you understand its content, answer questions about it, and extract key information.",
  },
  {
    question: "5. What are Extensions and how do they work?",
    answer:
      "Extensions enhance QBot's functionality by integrating it with internal APIs or external resources. Created using OpenAI Tools and Function Calling, these extensions allow QBot to perform specific tasks like fetching data from a CRM or automating a workflow.",
  },
  {
    question: "6. What is the Prompt Library?",
    answer:
      "The Prompt Library is a collection of predefined prompt templates designed to help users interact more effectively with QBot. These templates provide a starting point for generating content, asking questions, or performing tasks, making it easier to harness QBot's capabilities without starting from scratch.",
  },
  {
    question: "7. How can I report a bug, issue or feature request?",
    answer: (
      <>
        Go to{" "}
        <a
          href="https://quadra1.sharepoint.com/:l:/s/HomeSite/FD9grpqMMZZLvTTbMoYVaJUBDncKiuftCH6VnrKZXtNeOw?nav=ZDM3OTdjYWMtOTA1NS00MDllLTg4OGYtZWNmYWNlZWM3NWY3"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-blue-500"
        >
          link
        </a>
        . Provide a detailed description of your request, and our team will
        investigate it promptly.
      </>
    ),
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQHero />
      <Accordion
        type="multiple"
        className="bg-opacity-20 border rounded-md w-full p-2"
      >
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} className="" key={index}>
            <AccordionTrigger
              className={`text-sm py-1 items-center border-b dark:border-b-slate-700 border-b-slate-200 ${
                index !== faqs.length - 1 ? "pb-4" : "border-b-0"
              }`}
            >
              <div className="flex gap-2 items-center">
                <span className="text-base dark:text-slate-200">
                  {faq.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-2 pt-4">
              <span className="font-light text-muted-foreground">
                {faq.answer}
              </span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
