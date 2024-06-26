import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { AddNewPersona } from "./add-new-persona";
import { PersonaCard } from "./persona-card/persona-card";
import { PersonaHero } from "./persona-hero/persona-hero";
import { PersonaModel } from "./persona-services/models";
import { getCurrentUser } from "../auth-page/helpers";
import { GetPinnedPersonasForCurrentUser } from "./persona-services/persona-service";

interface ChatPersonaProps {
  personas: PersonaModel[];
  departments: any;
}

export const ChatPersonaPage: FC<ChatPersonaProps> = async (props) => {
  // filter departments by avoiding null values and duplicates

  const filteredDepartments = [
    { department: "All Department" },
    ...props?.departments?.value
      .filter(
        (data: any) =>
          data.department !== null &&
          data.department !== "Ex-Emp" &&
          data.department !== "ExEmp" &&
          data.department !== "Probeseven" &&
          data.department !== "Ex - Employee"
      )
      .filter((data: any, index: number, self: any[]) => {
        return (
          index === self.findIndex((d: any) => d.department === data.department)
        );
      }),
  ];

  const user = await getCurrentUser();

  let pinnedPersonas: any = await GetPinnedPersonasForCurrentUser();

  return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col dark:bg-opacity-25 dark:bg-[#262626] bg-[#FFFFFF] bg-opacity-25 m-4 rounded-lg border-0 min-h-screen gap-8 relative">
        <div className="dark:bg-[url('/Quadra_Light_Logo.png')] bg-[url('/Quadra_Dark_Logo.png')] w-28 h-8 bg-contain bg-no-repeat absolute top-8 right-8"></div>
        <PersonaHero user={user} />
        <div className="container max-w-4xl py-3 pb-16">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Personas List
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {props.personas.map((persona) => {
              return (
                <PersonaCard
                  persona={persona}
                  key={persona.id}
                  showContextMenu={user.isAdmin}
                  pinnedPersonas={
                    pinnedPersonas.response !== undefined
                      ? pinnedPersonas.response.filter(
                          (item: any) => item.personaId === persona.id
                        )
                      : []
                  }
                />
              );
            })}
          </div>
        </div>
        <AddNewPersona departments={filteredDepartments} />
      </main>
    </ScrollArea>
  );
};
