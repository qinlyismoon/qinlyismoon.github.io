/**
 * Live weather for the Desk — Open-Meteo (no API key).
 *
 * Always uses Phoebe's written current location (Columbus, OH), never the
 * visitor's geolocation. The sidebar "Current location" and the window
 * weather stay one place.
 */

/** Columbus, Ohio — same city as pageContext "Current location". */
export const SITE_LOCATION = {
  latitude: 39.9612,
  longitude: -82.9988,
  labelEn: "Columbus, Ohio",
  labelZh: "俄亥俄州哥伦布市",
};

/** @deprecated Prefer SITE_LOCATION — kept as an alias for older imports. */
export const FALLBACK_COORDS = SITE_LOCATION;

/** WMO weather codes → desk window kinds. */
export function weatherKindFromCode(code) {
  const n = Number(code);
  if (Number.isNaN(n)) return "sunny";
  if (n === 0 || n === 1) return "sunny";
  if (n === 2 || n === 3 || n === 45 || n === 48) return "cloudy";
  if ((n >= 71 && n <= 77) || n === 85 || n === 86) return "snowy";
  if (
    (n >= 51 && n <= 67) ||
    (n >= 80 && n <= 82) ||
    (n >= 95 && n <= 99)
  ) {
    return "rainy";
  }
  return "cloudy";
}

const LABELS = {
  en: {
    sunny: "Sunny",
    cloudy: "Cloudy",
    rainy: "Rainy",
    snowy: "Snowy",
  },
  zh: {
    sunny: "晴",
    cloudy: "多云",
    rainy: "雨",
    snowy: "雪",
  },
};

export function formatWeatherLabel(language, { temperatureC, kind }) {
  const temp = Number.isFinite(temperatureC)
    ? `${Math.round(temperatureC)}°C`
    : "—";
  const condition =
    (LABELS[language] ?? LABELS.en)[kind] ?? LABELS.en.sunny;
  return `${temp} · ${condition}`;
}

export async function fetchCurrentWeather(
  coords = {
    latitude: SITE_LOCATION.latitude,
    longitude: SITE_LOCATION.longitude,
  },
) {
  const { latitude, longitude } = coords;
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("current", "temperature_2m,weather_code");
  url.searchParams.set("temperature_unit", "celsius");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Weather request failed (${response.status})`);
  }
  const data = await response.json();
  const temperatureC = data?.current?.temperature_2m;
  const weatherCode = data?.current?.weather_code;
  const kind = weatherKindFromCode(weatherCode);
  return {
    temperatureC:
      typeof temperatureC === "number" ? temperatureC : null,
    weatherCode,
    kind,
  };
}
