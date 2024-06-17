import React from "react";
import { GetStartedHero } from "../get-started-hero/get-started-hero";

const instructionsList = [
  {
    title: "Pick Your Persona",
    description: (
      <div className="flex flex-col gap-4">
        <li>
          Kick things off by choosing a persona that fits your current need.
          Each persona has a unique skill set, so choose wisely!
        </li>
        <li>
          Example: Need tech help? Go for the "Technical Support Specialist."
          Want health tips? Pick the "Fitness Coach."
        </li>
      </div>
    ),
  },
  {
    title: "Start the Conversation",
    description: (
      <div className="flex flex-col gap-4">
        <li>
          Type your question or request into the chat box and watch the persona
          spring into action.
        </li>
        <li>
          Example: For the tech specialist, you might ask, "How do I fix a red
          blinking light on my SP-300a machine?"
        </li>
      </div>
    ),
  },
  {
    title: "Engage in Interactive Chat",
    description: (
      <div className="flex flex-col gap-4">
        <li>
          The persona will provide detailed, context-specific answers. Feel free
          to ask follow-up questions to get even more out of the conversation.
        </li>
        <li>
          Example Response: "You need to replace parts A & B. Here's the link to
          order them.
        </li>
      </div>
    ),
  },
];

export default function GetStartedPage() {
  return (
    <>
      <GetStartedHero />
      <div className="max-w-full mx-auto mt-2 p-4">
        {instructionsList.map((instruction, index) => (
          <div key={index} className="step mb-8">
            <div className="step-header flex items-center mb-2 gap-8">
              <div className="step-number w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4 self-baseline p-4 relative">
                <p>{index + 1}</p>
                {/* Add vertical line connecting to the next step */}
                {index < instructionsList.length - 1 && (
                  <div className="line-connector absolute top-0  w-[2px] bg-blue-500 h-36 mt-8"></div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="step-title font-bold text-xl dark:text-slate-200">
                  {instruction.title}
                </div>
                <div className="step-content mt-4 font-light text-sm text-muted-foreground">
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
