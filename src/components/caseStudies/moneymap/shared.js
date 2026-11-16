import { useAppSettings } from "../../../context/AppSettingsContext";

export function useLang() {
  const { language } = useAppSettings();
  return language === "zh" ? "zh" : "en";
}

export const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
