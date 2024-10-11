import { ModuleCalculator } from "./calculator/src/components/module-calculator";

export const communityModulesList = [
  {
    name: "Calculator",
    slugId: "calculator",
    description: "A simple calculator module",
    icon: "calculator",
    version: "1.0.0",
    component: <ModuleCalculator />,
  },
];
