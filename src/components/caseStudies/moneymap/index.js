import JourneyDemo from "./JourneyDemo";
import MonthlyAmountDemo from "./MonthlyAmountDemo";
import StatusRuleDemo from "./StatusRuleDemo";
import MoneyStatesDemo from "./MoneyStatesDemo";
import { ChangePlanFlow, CreateGoalFlow } from "./LiveFlow";

// Case-study sections reference these by name: `interactive: "mm-journey"`.
export const MONEY_MAP_WIDGETS = {
  "mm-journey": JourneyDemo,
  "mm-monthly": MonthlyAmountDemo,
  "mm-status": StatusRuleDemo,
  "mm-states": MoneyStatesDemo,
  "mm-live-create": CreateGoalFlow,
  "mm-live-change": ChangePlanFlow,
};
