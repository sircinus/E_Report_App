export const simulateYearChange = (
  currentYear,
  setCurrentYear,
  setYears,
  years,
) => {
  const [startYear, endYear] = currentYear.split('/').map(Number);
  const nextYear = `${startYear + 1}/${endYear + 1}`;

  setCurrentYear(nextYear);

  if (!years.includes(nextYear)) {
    setYears([...years, nextYear]);
  }
};
