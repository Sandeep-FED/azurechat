import { proxy, useSnapshot } from "valtio";
import { RevalidateCache } from "../common/navigation-helpers";
import { PERSONA_ATTRIBUTE, PersonaModel } from "./persona-services/models";
import {
  CreatePersona,
  CreatePersonaPin,
  EnsurePinPersonaOperation,
  UpsertPersonaPin,
  UpsertPersona,
} from "./persona-services/persona-service";

class PersonaState {
  private defaultModel: PersonaModel = {
    id: "",
    name: "",
    description: "",
    department: "",
    personaMessage: "",
    createdAt: new Date(),
    isPublished: false,
    isPinned: false,
    type: "PERSONA",
    userId: "",
    personaIcon: "",
  };

  public isOpened: boolean = false;
  public errors: string[] = [];
  public persona: PersonaModel = { ...this.defaultModel };
  public pinnedPersonas: string[] = [];

  public updateOpened(value: boolean) {
    this.isOpened = value;
  }

  public updatePersona(persona: PersonaModel) {
    this.persona = {
      ...persona,
    };
    this.isOpened = true;
  }

  public newPersona() {
    this.persona = {
      ...this.defaultModel,
    };
    this.isOpened = true;
  }

  public newPersonaAndOpen(persona: {
    name: string;
    description: string;
    personaMessage: string;
  }) {
    this.persona = {
      ...this.defaultModel,
      name: persona.name,
      description: persona.description,
      personaMessage: persona.personaMessage,
    };
    this.isOpened = true;
  }

  public updateErrors(errors: string[]) {
    this.errors = errors;
  }

  // Method to toggle pinned status
  public togglePinned(personaId: string) {
    const index = this.pinnedPersonas.indexOf(personaId);
    if (index === -1) {
      this.pinnedPersonas.push(personaId);
    } else {
      this.pinnedPersonas.splice(index, 1);
    }
  }
}

export const personaStore = proxy(new PersonaState());

export const usePersonaState = () => {
  return useSnapshot(personaStore);
};

export const addOrUpdatePersona = async (previous: any, formData: FormData) => {
  personaStore.updateErrors([]);

  const model = FormDataToPersonaModel(formData);
  const response =
    model.id && model.id !== ""
      ? await UpsertPersona(model)
      : await CreatePersona(model);

  if (response.status === "OK") {
    personaStore.updateOpened(false);
    RevalidateCache({
      page: "persona",
    });
  } else {
    personaStore.updateErrors(response.errors.map((e) => e.message));
  }
  return response;
};

export const FormDataToPersonaModel = (formData: FormData): PersonaModel => {
  return {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    department: formData.get("department") as string,
    personaMessage: formData.get("personaMessage") as string,
    isPublished: formData.get("isPublished") === "on" ? true : false,
    userId: "", // the user id is set on the server once the user is authenticated
    createdAt: new Date(),
    personaIcon: formData.get("image-base64") as unknown as string,
    isPinned: false,
    type: PERSONA_ATTRIBUTE,
  };
};

export const addOrUpdatePinPersona = async (
  persona: any,
  isPinned: boolean
) => {
  personaStore.updateErrors([]);

  let isPersonaForCurrentUserExist = await EnsurePinPersonaOperation(
    persona.id
  );

  console.log(isPersonaForCurrentUserExist, "isPersonaForCurrentUserExist ");

  const response =
    isPersonaForCurrentUserExist.status === "UNAUTHORIZED"
      ? await CreatePersonaPin(persona)
      : await UpsertPersonaPin(persona, isPinned);

  if (response.status === "OK") {
    console.log("Persona pinned successfully");
  } else {
    personaStore.updateErrors(response.errors.map((e) => e.message));
  }
  return response;
};
