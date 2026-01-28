# Webflow Multi-Step Form with Conditional Calendly
Form for scheduling: Step 1 collects info, submits to Webflow/Zapier on next, then shows conditional Calendly embed.
Attributes

All steps: data-form="step"
Step 1: data-step="info" (fields: first_name, last_name, phone, email, zip, meeting_location, asset_range, message)
Calendly steps: data-step="cal-sheffield", cal-sandusky, cal-independence, cal-sarasota, cal-virtual
Each Calendly step: <div class="calendly-container" style="height:600px;"></div>
Next btn on step 1: data-form="next-btn" (type="button")
No submit btn; submit handled on next.

## Fields
meeting_location select/radio values: "sheffield", "sandusky", "independence", "sarasota", "virtual"
Input IDs: first_name, last_name, phone, email, zip, asset_range, message

## Scripts
conditional-steps.js: Branches to correct Calendly step.
calendly-init.js: Submits form on next from info, inits Calendly with prefill on show.

Customize URLs in calendly-init.js. Assume Calendly custom questions for zip (a1), asset (a2), message (a3).
