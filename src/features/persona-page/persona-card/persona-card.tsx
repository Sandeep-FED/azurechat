import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { PersonaModel } from "../persona-services/models";
import { PersonaCardContextMenu } from "./persona-card-context-menu";
import { ViewPersona } from "./persona-view";
import { StartNewPersonaChat } from "./start-new-persona-chat";
import { PersonaPin } from "./persona-pin";
import Image from "next/image";

interface Props {
  persona: PersonaModel;
  showContextMenu: boolean;
  pinnedPersonas: any;
}

export const PersonaCard: FC<Props> = async (props) => {
  const colors = [
    "#FFA51F",
    "#FF5F5F",
    "#00DE9C",
    "#297FF1",
    "#8E66FF",
    "#8E44AD",
    "#02BDE7",
    "#E91E63",
    "#CDDC39",
    "#4F66E9",
    "#E814AC",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const { persona } = props;

  console.log("persona card response", props.pinnedPersonas);
  return (
    <Card
      key={persona.id}
      className="flex flex-col gap-6 h-auto items-start text-start justify-start dark:bg-opacity-5 dark:bg-[#FFFFFF]  dark:hover:border-fuchsia-400 hover:border-fuchsia-400 relative"
    >
      <CardHeader className="flex flex-col w-full bg-primary/25 rounded-lg  rounded-b-none">
        <div className="flex flex-row pb-1 w-full items-center justify-between">
          <div className="absolute w-16 h-16 rounded-full dark:bg-white/25 bg-sky-100 backdrop-blur-lg flex items-center justify-center top-11">
            <Image
              src={persona.personaIcon}
              alt="Persona Icon"
              width={30}
              height={30}
              quality={100}
            />
          </div>
          <div className="flex gap-4 ml-auto">
            <PersonaPin
              persona={persona}
              pinnedPersonas={props.pinnedPersonas}
            />
            {props.showContextMenu && (
              <div>
                <PersonaCardContextMenu persona={persona} />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground flex-1 text-sm mt-4">
        <div>
          <CardTitle
            className="flex-1 text-base"
            style={{ color: getRandomColor() }}
          >
            {persona.name}
          </CardTitle>
        </div>
        {persona.description.length > 100
          ? persona.description.slice(0, 100).concat("...")
          : persona.description}
      </CardContent>
      <CardFooter className="content-stretch w-full gap-4">
        <ViewPersona persona={persona} />

        <StartNewPersonaChat persona={persona} />
      </CardFooter>
    </Card>
  );
};
