export const countries = [
  { code: "FRA", name: "France", flagCode: "FR" },
  { code: "USA", name: "United States", flagCode: "US" },
  { code: "ESP", name: "Spain", flagCode: "ES" },
  { code: "GBR", name: "United Kingdom", flagCode: "GB" },
  { code: "GER", name: "Germany", flagCode: "DE" },
  { code: "ITA", name: "Italy", flagCode: "IT" },
  { code: "ARG", name: "Argentina", flagCode: "AR" },
  { code: "AUS", name: "Australia", flagCode: "AU" },
  { code: "AUT", name: "Austria", flagCode: "AT" },
  { code: "BEL", name: "Belgium", flagCode: "BE" },
  { code: "BRA", name: "Brazil", flagCode: "BR" },
  { code: "CAN", name: "Canada", flagCode: "CA" },
  { code: "CHI", name: "Chile", flagCode: "CL" },
  { code: "SRB", name: "Serbia", flagCode: "RS" },
  { code: "CRO", name: "Croatia", flagCode: "HR" },
  { code: "CZE", name: "Czech Republic", flagCode: "CZ" },
  { code: "DEN", name: "Denmark", flagCode: "DK" },
  { code: "ECU", name: "Ecuador", flagCode: "EC" },
  { code: "EST", name: "Estonia", flagCode: "EE" },
  { code: "FIN", name: "Finland", flagCode: "FI" },
  { code: "GRE", name: "Greece", flagCode: "GR" },
  { code: "HUN", name: "Hungary", flagCode: "HU" },
  { code: "IRL", name: "Ireland", flagCode: "IE" },
  { code: "JPN", name: "Japan", flagCode: "JP" },
  { code: "RUS", name: "Russia", flagCode: "RU" },
];

export const isoToEmoji = (countryCode: string) =>
  countryCode
    .slice(0, 2) // keep the first two letters
    .split("")
    .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
    .map((emojiCode) => String.fromCodePoint(emojiCode))
    .join("");
