export function buildTrendData(txns) {
  const monthly = {};

  txns.forEach(t => {
    const month = t.date.slice(0, 7);

    if (!monthly[month]) {
      monthly[month] = {
        label: month,
        income: 0,
        expense: 0
      };
    }

    if (t.type === "income") {
      monthly[month].income += t.amount;
    } else {
      monthly[month].expense += t.amount;
    }
  });

  return Object.values(monthly);
}

export function buildCategoryData(txns) {
  const map = {};

  txns.forEach(t => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return Object.keys(map).map(key => ({
    name: key,
    value: map[key]
  }));
}