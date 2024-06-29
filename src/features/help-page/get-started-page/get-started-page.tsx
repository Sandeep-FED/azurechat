import React from "react";
import { GetStartedHero } from "../get-started-hero/get-started-hero";

const instructionsList = [
  {
    title: "Pick your persona",
    description: (
      <div className="flex flex-col gap-4">
        <div className="flex">
          <li></li>
          Start by selecting the persona that aligns with your current needs.
          Each persona is uniquely equipped to handle different types of
          inquiries and tasks, providing expert guidance tailored to their
          domain.
        </div>
        <div className="flex">
          <li></li>
          <strong>Example:&nbsp;</strong>Need to refine your hiring process?
          Choose the "Talent Acquisition Specialist."
        </div>
      </div>
    ),
  },
  {
    title: "Start the conversation",
    description: (
      <div className="flex flex-col gap-4">
        <div className="flex">
          <li></li>
          Type your question or request into the chat box and watch the persona
          spring into action.
        </div>
        <div className="flex">
          <li></li>
          <strong>Example:&nbsp;</strong>For the "Talent Acquisition
          Specialist," you might ask, "What are the best ways to attract
          high-quality candidates for a software engineering role?"
        </div>
      </div>
    ),
  },
  {
    title: "Engage in interactive chat",
    description: (
      <div className="flex flex-col gap-4">
        <div className="flex">
          <li></li>
          Enter your queries and watch as the persona delivers detailed and
          context-specific responses. You can also ask follow-up questions to
          delve deeper into the subject matter, ensuring you get the most out of
          the conversation.
        </div>
        <div>
          <div className="flex">
            <li></li>
            <strong>Example:&nbsp;</strong> With the "Talent Acquisition
            Specialist," you might explore:
          </div>
          <div className="flex flex-col pl-6 mt-4 gap-4">
            <div className="flex">
              <li></li>
              Initial Query: "What are the best ways to attract high-quality
              candidates for a software engineering role?"
            </div>
            <div className="flex">
              <li></li>
              Persona Response: "To attract top software engineers, consider
              using niche job boards like Stack Overflow and GitHub Jobs.
              Highlight your company's tech stack and innovation culture in the
              job description."
            </div>
            <div className="flex">
              <li></li>
              Follow-Up Question: "Can you provide examples of how to showcase
              our tech stack effectively in job postings?"
            </div>
            <div className="flex">
              <li></li>
              Persona Response: "Absolutely. You can mention specific
              technologies you use, like 'We work with Python, Django, and
              React,' and describe your approach to software development.
              Including links to your GitHub repositories or projects can also
              be a great way to attract tech-savvy candidates."
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function GetStartedPage() {
  return (
    <>
      <GetStartedHero />
      <div className="max-w-full mx-auto mt-12 p-10 bg-black bg-opacity-40 rounded-md text-justify">
        {instructionsList.map((instruction, index) => (
          <div key={index} className="step mb-8">
            <div className="step-header flex items-center mb-2 gap-8">
              <div className="step-number w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full  self-baseline p-4 relative">
                <p>{index + 1}</p>
                {/* Add vertical line connecting to the next step */}
                {index < instructionsList.length - 1 && (
                  <div className="line-connector absolute top-0  w-[2px] bg-blue-500 h-36 mt-8"></div>
                )}
              </div>

              <div className="flex flex-col mt-2">
                <div className="step-title font-bold text-xl dark:text-slate-200">
                  {instruction.title}
                </div>
                <div className="step-content mt-3 font-normal text-sm text-muted-foreground">
                  {instruction.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
