# OvaAware

OvaAware is a Next.js application that provides an ovarian cancer risk assessment based on user-entered information. It integrates Genkit flows to compute personalized risk scores and guides users towards appropriate next steps.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the Next.js development server**
   ```bash
   npm run dev
   ```
3. **Run the Genkit flow server**
   ```bash
   npm run genkit:dev
   ```

## Project Structure

- `src/app` – Next.js pages and layouts.
- `src/components` – UI and shared React components.
- `src/ai/flows` – Genkit flow definitions, including the main risk assessment flow.
- `docs` – Additional project documentation such as [`docs/blueprint.md`](docs/blueprint.md) containing style guidelines.

For an overview of the primary page, check `src/app/page.tsx`.

