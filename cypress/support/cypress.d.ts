/// <reference types="@testing-library/cypress" />
declare namespace Cypress {
  interface Chainable {
    verifyUrlAndValue(selector: string, value: string, urlFragment: string): Chainable<void>;
    goBackAndCheck(sourceValue: string, translationValue: string): Chainable<void>;
    changeLanguage(params: ChangeLanguageParams): Chainable<Element>;
    checkTranslationValues(params: CheckTranslationValuesParams): Chainable<Element>;
    checkBackgroundColor(color: string): Chainable<Element>;
    checkIfEmpty(): Chainable<Element>;
    playAudio(playLabel: string, stopLabel: string): Chainable<void>;
    stopAudio(stopLabel: string, playLabel: string): Chainable<void>;
  }
}

interface ChangeLanguageParams {
    role: string;
    name: string | RegExp;
    value: string;
}

interface CheckTranslationValuesParams {
    sourceValue: string;
    targetValue: string;
    queryValue: string;
    translationValue: string;
    url: string;
}
