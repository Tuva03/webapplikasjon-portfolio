/*
import { Project } from "types";
import { Entries } from "src/types";
import { createProject } from "../mappers";

// Definerer gyldige basisregler for vaner
const baseRules = ["daily", "weekly", "monthly", "custom"] as const;

// Objektet inneholder valideringslogikk for hver regeltype
const ruleHandlers = {
  // Daglige vaner er alltid gyldige
  daily: () => true,
  // Ukentlige vaner må ha en gyldig ukedag (0-6)
  weekly: (rule: string) => {
    const [_, day] = rule.split(":");
    if (!day || Number.isNaN(day)) return false;
    return Number(day) >= 0 && Number(day) <= 6;
  },
  // Månedlige vaner må ha en gyldig dag i måneden (0-30)
  monthly: (rule: string) => {
    const [_, day] = rule.split(":");
    if (!day || Number.isNaN(day)) return false;
    return Number(day) >= 0 && Number(day) <= 30;
  },
  // Tilpassede vaner kan være ukentlige eller månedlige med flere dager
  custom: (rule: string) => {
    const [_, type, days] = rule.split(":");
    if (!type || !days) return false;
    if (type !== "weekly" && type !== "monthly") return false;
    return days.split(",").every((day) => ruleHandlers[type](`${type}:${day}`));
  },
};

// Validerer en enkelt regel
const isValidRule = (rule: string): boolean => {
  const baseRule = baseRules.find((base) => rule && base.startsWith(rule));
  if (!baseRule) return false;
  if (!ruleHandlers[baseRule]) return false;
  return ruleHandlers[baseRule](rule);
};

// Validerer et helt habit-objekt
export const isValidProject = (data: Partial<Project>): boolean => {
  const project = createProject(data);

  return (Object.entries(project) as Entries<Partial<Project>>).every(
    (entry) => {
      if (!entry) return false;

      const [key, value] = entry;

      switch (key) {
        case "title":
          return value && value.length > 3;
        default:
          return true;
      }
    }
  );
};
*/
