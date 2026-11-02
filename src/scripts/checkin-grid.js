// Hero check-in grid: 90 days, one cell per day, laid out as a calendar
// (7 rows, column-major, same convention as a contribution graph).
// Deterministic coloured runs stand in for detected patterns, not random noise,
// and not a count of anything, the copy under the grid says exactly what
// coloured means: a day symetric flagged, nothing else.
const grid = document.getElementById("checkin-grid");
if (grid) {
  const TOTAL = 90;
  // Three groups, matching the three examples in the copy below. Each group
  // is one colour throughout, so "a Wednesday pattern" reads as one recurring
  // signal, not four unrelated days that happen to share a row.
  const groups = [
    { color: "var(--mood)", days: [22, 23, 24, 25, 26] }, // a run of low weeks
    { color: "var(--anxiety)", days: [39, 46, 53, 60] }, // same weekday, four weeks running
    { color: "var(--concentration)", days: [78] }, // the day everything dropped at once
  ];
  const found = {};
  groups.forEach((group) => {
    group.days.forEach((day) => { found[day] = group.color; });
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < TOTAL; i++) {
    const d = document.createElement("span");
    d.className = "cell";
    if (found[i]) d.style.background = found[i];
    if (reduce) {
      d.style.opacity = found[i] ? "1" : ".4";
    } else {
      d.dataset.target = found[i] ? "1" : ".4";
    }
    frag.appendChild(d);
  }
  grid.appendChild(frag);

  if (!reduce) {
    const cells = grid.children;
    requestAnimationFrame(() => {
      for (let i = 0; i < cells.length; i++) {
        const el = cells[i];
        setTimeout(() => {
          el.style.opacity = el.dataset.target;
        }, i * 9);
      }
    });
  }
}
