export const APP_CONFIG = {
  church: {
    year: 2026,
    reportTimezone: "Europe/Madrid",
  },
  programs: [
    {
      id: 1,
      start: "2026-01-31",
      title: {
        en: "Ministers & Workers Meeting with Pastor",
        es: "Reunion de Ministros y Obreros con el Pastor",
      },
    },
    {
      id: 2,
      start: "2026-02-15",
      title: { en: "Annual Thanksgiving", es: "Accion de Gracias Anual" },
    },
    {
      id: 3,
      start: "2026-03-19",
      title: {
        en: "Father's Day Celebration",
        es: "Celebracion del Dia del Padre",
      },
    },
    {
      id: 4,
      start: "2026-04-05",
      title: { en: "Easter Sunday", es: "Domingo de Pascua" },
    },
    {
      id: 5,
      start: "2026-04-25",
      title: {
        en: "First Ministers and Workers Retreat",
        es: "Primer Retiro de Ministros y Obreros",
      },
    },
    {
      id: 6,
      start: "2026-05-03",
      title: {
        en: "Mother's Day Celebration",
        es: "Celebracion del Dia de la Madre",
      },
    },
    {
      id: 7,
      start: "2026-05-10",
      title: {
        en: "Youth Conference/Retreat",
        es: "Conferencia/Retiro de Jovenes",
      },
    },
    {
      id: 8,
      start: "2026-05-15",
      end: "2026-05-17",
      title: {
        en: "Parish Retreat & Revival Programme",
        es: "Retiro Parroquial y Programa de Avivamiento",
      },
    },
    {
      id: 9,
      start: "2026-05-24",
      title: {
        en: "Parish Pentecost Celebration",
        es: "Celebracion Parroquial de Pentecostes",
      },
    },
    {
      id: 10,
      start: "2026-06-14",
      title: { en: "Praise Party", es: "Fiesta de Alabanza" },
    },
    {
      id: 11,
      start: "2026-06-20",
      title: { en: "Marriage Seminar", es: "Seminario sobre el Matrimonio" },
    },
    {
      id: 12,
      start: "2026-06-21",
      title: {
        en: "Pastor Week Parish Level",
        es: "Semana del Pastor - Nivel Parroquial",
      },
    },
    {
      id: 13,
      start: "2026-07-10",
      title: { en: "Summer Family Picnic", es: "Picnic Familiar de Verano" },
    },
    {
      id: 14,
      start: "2026-07-24",
      end: "2026-07-25",
      title: {
        en: "Children Weekend (Parish Level)",
        es: "Fin de Semana de los Ninos (Nivel Parroquial)",
      },
    },
    {
      id: 15,
      start: "2026-09-05",
      end: "2026-09-06",
      title: { en: "Youth Week", es: "Semana de los Jovenes" },
    },
    {
      id: 16,
      start: "2026-09-19",
      title: {
        en: "Second Ministers and Workers Retreat",
        es: "Segundo Retiro de Ministros y Obreros",
      },
    },
    {
      id: 17,
      start: "2026-09-20",
      title: {
        en: "Anniversary Celebration",
        es: "Celebracion de Aniversario",
      },
    },
    {
      id: 18,
      start: "2026-10-10",
      end: "2026-10-11",
      title: { en: "Women's Week", es: "Semana de las Mujeres" },
    },
    {
      id: 19,
      start: "2026-10-24",
      end: "2026-10-25",
      title: { en: "Men's Week", es: "Semana de los Hombres" },
    },
    {
      id: 20,
      start: "2026-11-08",
      title: { en: "Choir Week", es: "Semana del Coro" },
    },
    {
      id: 21,
      start: "2026-12-25",
      title: {
        en: "Love Feast & Gift Exchange",
        es: "Banquete de Amor e Intercambio de Regalos",
      },
    },
    {
      id: 22,
      start: "2026-12-29",
      end: "2026-12-31",
      title: { en: "Cross Over Programme", es: "Programa de Fin de Ano" },
    },
    {
      id: 23,
      start: "2026-12-31",
      title: {
        en: "Cross Over Night Service",
        es: "Servicio de Noche de Fin de Ano",
      },
    },
  ],
  finance: {
    accessCode: "CHANGE-ME-IN-PRIVATE-REPOSITORY",
    accessUsers: [
      { name: "Finance User 1", code: "CHANGE-ME-001" },
      { name: "Finance User 2", code: "CHANGE-ME-002" },
    ],
    members: ["Anonymous", "Member 1", "Member 2"],
    authorizers: ["Authorized Person 1", "Authorized Person 2"],
    currencies: [
      { code: "EUR", label: "Euro", symbol: "€" },
      { code: "NGN", label: "Naira", symbol: "₦" },
      { code: "USD", label: "Dollar", symbol: "$" },
      { code: "GBP", label: "Pounds", symbol: "£" },
    ],
    categories: {
      income: ["Tithe", "Offering", "Pledge", "Vow", "Special Program"],
      expense: [
        "Light bill",
        "Rent",
        "Water bill",
        "Gas bill",
        "Welfare",
        "Miscellaneous",
      ],
    },
  },
  reports: {
    recipients: ["replace-with-recipient@example.com"],
    enabled: false,
  },
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    const nextCharacter = text[index + 1];
    if (character === '"' && quoted && nextCharacter === '"') {
      value += '"';
      index++;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index++;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  if (!rows.length) return [];

  const headers = rows.shift().map((header) => header.replace(/^\ufeff/, ""));
  return rows.map((columns) =>
    Object.fromEntries(
      headers.map((header, index) => [header, columns[index] || ""]),
    ),
  );
}

async function readCsv(fileName) {
  try {
    const response = await fetch(`./data/${fileName}`);
    if (!response.ok) throw new Error(`Unable to load ${fileName}`);
    return parseCsv(await response.text());
  } catch (error) {
    console.warn(`Using built-in configuration for ${fileName}.`, error);
    return null;
  }
}

export async function loadAppConfig() {
  const [
    programRows,
    memberRows,
    authorizerRows,
    currencyRows,
    incomeRows,
    expenseRows,
    recipientRows,
    accessRows,
  ] = await Promise.all([
    readCsv("programs.csv"),
    readCsv("members.csv"),
    readCsv("authorizers.csv"),
    readCsv("currencies.csv"),
    readCsv("income-categories.csv"),
    readCsv("expense-categories.csv"),
    readCsv("report-recipients.csv"),
    readCsv("finance-access.csv"),
  ]);

  return {
    ...APP_CONFIG,
    programs: programRows?.length
      ? programRows.map((program) => ({
          id: Number(program.id),
          start: program.start,
          ...(program.end ? { end: program.end } : {}),
          title: {
            en: program.title_en,
            es: program.title_es || program.title_en,
          },
        }))
      : APP_CONFIG.programs,
    finance: {
      ...APP_CONFIG.finance,
      accessCode: accessRows?.[0]?.code || APP_CONFIG.finance.accessCode,
      accessUsers:
        accessRows
          ?.filter((access) => access.name && access.code)
          .map((access) => ({ name: access.name, code: access.code })) ||
        APP_CONFIG.finance.accessUsers,
      members:
        memberRows?.map((member) => member.name).filter(Boolean) ||
        APP_CONFIG.finance.members,
      authorizers:
        authorizerRows?.map((person) => person.name).filter(Boolean) ||
        APP_CONFIG.finance.authorizers,
      currencies: currencyRows?.length
        ? currencyRows.map((currency) => ({
            code: currency.code,
            label: currency.label,
            symbol: currency.symbol,
          }))
        : APP_CONFIG.finance.currencies,
      categories: {
        income:
          incomeRows?.map((category) => category.name).filter(Boolean) ||
          APP_CONFIG.finance.categories.income,
        expense:
          expenseRows?.map((category) => category.name).filter(Boolean) ||
          APP_CONFIG.finance.categories.expense,
      },
    },
    reports: {
      ...APP_CONFIG.reports,
      recipients:
        recipientRows?.map((recipient) => recipient.email).filter(Boolean) ||
        APP_CONFIG.reports.recipients,
    },
  };
}
