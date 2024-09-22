/// <reference types="cypress" />

beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
});

it("switches page on inputs change & goes back correctly", () => {
    // Create aliases for all relevant elements
    cy.findByRole("textbox", { name: /translation query/i }).as("query");
    cy.findByRole("textbox", { name: /translation result/i }).as("translation");
    cy.findByRole("combobox", { name: /source language/i }).as("source");
    cy.findByRole("combobox", { name: /target language/i }).as("target");

    // query change
    cy.get("@query").type("palabra");
    cy.findByRole("button", { name: /translate/i }).click();
    cy.get("@translation").should("have.value", "word");
    cy.url().should("include", "/auto/en/palabra");

    cy.findByRole("button", { name: /switch auto/i }).click();

    // source change
    cy.get("@source").select("es");
    cy.url().should("include", "/es/en/palabra");

    // target change
    cy.get("@target").select("ca");
    cy.get("@translation").should("have.value", "paraula");
    cy.url().should("include", "/es/ca/palabra");

    // lang switch
    cy.findByRole("button", { name: /switch languages/i }).click();
    cy.checkTranslationValues({
        sourceValue: "ca",
        targetValue: "es",
        queryValue: "paraula",
        translationValue: "palabra",
        url: "/ca/es/paraula",
    });

    
    // Add debug point before the failing step
    cy.debug();

    // history back
    cy.goBackAndCheck("es", "paraula");
    cy.goBackAndCheck("es", "word");
    cy.goBackAndCheck("auto", "word");
    cy.go("back").checkIfEmpty();
});

it("switches first loaded page and back and forth on language change", () => {
    const query = "Texto aleatorio";
    cy.visit(`/auto/en/${query}`);

    cy.findByRole("button", { name: /switch auto/i }).click();

    cy.findByRole("textbox", { name: /translation query/i })
        .as("query")
        .should("have.value", query);

    cy.changeLanguage({
        role: "combobox",
        name: /source language/i,
        value: "eo",
    });
    cy.url().should("include", `/eo/en/${encodeURIComponent(query)}`);

    cy.findByRole("combobox", { name: /source language/i })
        .as("source")
        .select("auto");
    cy.url().should("include", `/auto/en/${encodeURIComponent(query)}`);

    cy.findByRole("link", { name: /logo/i }).click();
    cy.url().should("not.include", "/auto/en");
    cy.checkIfEmpty();
});

it("language switching button is disabled on 'auto', but enables when other", () => {
    cy.findByRole("button", { name: /switch auto/i }).click();

    cy.findByRole("button", { name: /switch languages/i })
        .as("btnSwitch")
        .should("be.disabled");

    cy.changeLanguage({
        role: "combobox",
        name: /source language/i,
        value: "eo",
    });

    cy.get("@btnSwitch").should("be.enabled").click();
    cy.checkTranslationValues({
        sourceValue: "en",
        targetValue: "eo",
        queryValue: "",
        translationValue: "",
        url: "/en/eo",
    });

    cy.get("body").type("{ctrl}{shift}s");
    cy.checkTranslationValues({
        sourceValue: "eo",
        targetValue: "en",
        queryValue: "",
        translationValue: "",
        url: "/eo/en",
    });

    cy.get("body").type("{ctrl}{shift}f");
    cy.checkTranslationValues({
        sourceValue: "en",
        targetValue: "eo",
        queryValue: "",
        translationValue: "",
        url: "/en/eo",
    });
});

it("loads & plays audio correctly", () => {
    const query =
        "No hi havia a València dos amants com nosaltres,\ncar d'amants com nosaltres en són parits ben pocs.";
    cy.visit(`/ca/en/${encodeURIComponent(query)}`);

    const playLabel = "Play audio";
    const stopLabel = "Stop audio";

    cy.playAudio(playLabel, stopLabel);
    cy.stopAudio(stopLabel, playLabel);
    cy.playAudio(playLabel, stopLabel);
});

// it("skips to main & toggles color mode", () => {
//     cy.findByRole("link", { name: /skip to content/i }).click({ force: true });

//     // Separate the URL check
//     cy.url().should("include", "#main");

//     cy.checkBackgroundColor("rgb(255, 255, 255)");

//     cy.findByRole("button", { name: /toggle color mode/i })
//         .as("toggler")
//         .click();
//     cy.checkBackgroundColor("rgb(0, 0, 0)");

//     cy.get("@toggler").click();
//     cy.checkBackgroundColor("rgb(255, 255, 255)");

//     cy.get("body").type("{ctrl}{shift}l");
//     cy.checkBackgroundColor("rgb(0, 0, 0)");

//     cy.get("body").type("{ctrl}{shift}l");
//     cy.checkBackgroundColor("rgb(255, 255, 255)");
// });
