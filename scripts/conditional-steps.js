(() => {
  const getLocation = (form) => {
    const selected = form.querySelector('input[name="meeting_location"]:checked') || form.querySelector('select[name="meeting_location"]');
    return selected ? selected.value : null;
  };
  const disableStep = (step) => {
    step.querySelectorAll("input, select, textarea").forEach(el => {
      if (!el.dataset.wasRequired) el.dataset.wasRequired = el.required ? "1" : "0";
      el.required = false;
    });
    step.dataset.skip = "true";
  };
  const enableStep = (step) => {
    step.querySelectorAll("input, select, textarea").forEach(el => {
      el.required = el.dataset.wasRequired === "1";
    });
    delete step.dataset.skip;
  };
  const applyBranch = (form) => {
    const loc = getLocation(form);
    if (!loc) return;
    const steps = [...form.querySelectorAll('[data-form="step"]')];
    steps.forEach(step => {
      const id = step.getAttribute("data-step");
      if (id?.startsWith("cal-")) {
        id === `cal-${loc}` ? enableStep(step) : disableStep(step);
      } else {
        enableStep(step);
      }
    });
  };
  const getCurrentStep = (form) => {
    return [...form.querySelectorAll('[data-form="step"]')].find(step => getComputedStyle(step).display !== "none");
  };
  const skipIfNeeded = (form, direction) => {
    const current = getCurrentStep(form);
    if (!current || current.dataset.skip !== "true") return;
    const btn = current.querySelector(direction === "back" ? '[data-form="back-btn"]' : '[data-form="next-btn"]');
    if (btn) btn.click();
  };
  document.addEventListener("change", (e) => {
    if (e.target.name === "meeting_location") {
      const form = e.target.closest("form");
      applyBranch(form);
    }
  });
  document.addEventListener("click", (e) => {
    const next = e.target.closest('[data-form="next-btn"]');
    const back = e.target.closest('[data-form="back-btn"]');
    if (!next && !back) return;
    const form = e.target.closest("form");
    if (!form) return;
    applyBranch(form);
    setTimeout(() => {
      skipIfNeeded(form, back ? "back" : "next");
    }, 0);
  });
})();
