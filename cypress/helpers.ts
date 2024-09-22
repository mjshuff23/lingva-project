import { encodeUrlQuery } from './utils';

// Helper to construct a full URL fragment for verification
export const constructUrlFragment = (language: string, query: string): string => {
    return `/${language}/en/${encodeUrlQuery(query)}`;
};

// Helper to verify if form fields are empty
export const verifyFieldsAreEmpty = (): void => {
    cy.get("@translation").should("be.empty");
    cy.get("@query").should("be.empty");
};

// Helper to check specific field values
export const verifyFieldValues = (
    sourceValue: string,
    targetValue: string,
    queryValue: string,
    translationValue: string
): void => {
    cy.get("@source").should("exist").then($el => {
        if ($el.length) cy.get("@source").should("have.value", sourceValue);
    });
    cy.get("@target").should("exist").then($el => {
        if ($el.length) cy.get("@target").should("have.value", targetValue);
    });
    cy.get("@query").should("exist").then($el => {
        if ($el.length) cy.get("@query").should("have.value", queryValue);
    });
    cy.get("@translation").should("exist").then($el => {
        if ($el.length) cy.get("@translation").should("have.value", translationValue);
    });
};