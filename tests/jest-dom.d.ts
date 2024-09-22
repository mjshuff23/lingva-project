import '@testing-library/jest-dom/extend-expect';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeEnabled(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value: any): R;
    }
  }
}