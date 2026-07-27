import * as developerModules from "./developer";
import * as officeModules from "./office";
import * as csModules from "./customer-support";
import * as hrModules from "./hr";
import * as deModules from "./data-entry";
import * as studentModules from "./student";

type PassagesMap = Record<string, string[]>;

const contentMap: Record<string, PassagesMap> = {};

function toHyphenated(camel: string): string {
  return camel.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function populateMap(modules: Record<string, any>, map: PassagesMap) {
  for (const [key, value] of Object.entries(modules)) {
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
      map[key] = value as string[];
      const hyphenated = toHyphenated(key);
      if (hyphenated !== key) {
        map[hyphenated] = value as string[];
      }
    }
  }
}

populateMap(developerModules, (contentMap["developer"] = {}));
populateMap(officeModules, (contentMap["office"] = {}));
populateMap(csModules, (contentMap["customer-support"] = {}));
populateMap(hrModules, (contentMap["hr"] = {}));
populateMap(deModules, (contentMap["data-entry"] = {}));
populateMap(studentModules, (contentMap["student"] = {}));

export function getPassages(careerId: string, subId: string): string[] {
  return contentMap[careerId]?.[subId] ?? [];
}

export function getRandomPassage(careerId: string, subId: string): string {
  const passages = getPassages(careerId, subId);
  if (passages.length === 0) {
    return "Welcome to CareerType! Start typing to improve your typing skills with career-focused content.";
  }
  return passages[Math.floor(Math.random() * passages.length)];
}
