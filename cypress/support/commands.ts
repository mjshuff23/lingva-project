import '@testing-library/cypress/add-commands';
import { verifyFieldValues, verifyFieldsAreEmpty } from "../helpers";

Cypress.Commands.add("verifyUrlAndValue", (selector, value, urlFragment) => {
  cy.get(selector)
    .should("have.value", value)
    .url()
    .should("include", urlFragment);
});

Cypress.Commands.add("goBackAndCheck", (sourceValue, translationValue) => {
  cy.go("back")
    .get("@query")
    .should("have.value", sourceValue)
    .get("@translation")
    .should("have.value", translationValue);
});

// Custom command to change language
Cypress.Commands.add("changeLanguage", ({ role, name, value }: ChangeLanguageParams) => {
  cy.findByRole(role, { name }).select(value);
  cy.url().should("include", `/${value}`);
});

// Custom command to check translation values
Cypress.Commands.add("checkTranslationValues", ({
  sourceValue,
  targetValue,
  queryValue,
  translationValue,
  url,
}: CheckTranslationValuesParams) => {
  verifyFieldValues(sourceValue, targetValue, queryValue, translationValue);
  cy.url().should("include", url);
});

// Custom command to check background color
Cypress.Commands.add("checkBackgroundColor", (color: string) => {
  cy.get("body").should("have.css", "background-color", color);
});

// Custom command to check if query and translation fields are empty
Cypress.Commands.add("checkIfEmpty", () => {
  verifyFieldsAreEmpty();
});

Cypress.Commands.add("playAudio", (playLabel: string, stopLabel: string) => {
  cy.findAllByRole("button", { name: playLabel })
    .should("be.enabled")
    .click({ multiple: true });
  cy.findAllByRole("button", { name: stopLabel }).should(
    "have.attr",
    "aria-label",
    stopLabel
  );
});

Cypress.Commands.add("stopAudio", (stopLabel: string, playLabel: string) => {
  cy.findAllByRole("button", { name: stopLabel })
    .should("be.enabled")
    .click({ multiple: true });
  cy.findAllByRole("button", { name: playLabel }).should(
    "have.attr",
    "aria-label",
    playLabel
  );
});