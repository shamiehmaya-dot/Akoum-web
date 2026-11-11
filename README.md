# AKOUM Tutoring Center

AKOUM is a website for a tutoring center. It helps students explore tutoring services and tutors, and includes a demo admin dashboard for previewing how the center could manage its activity.

## What the project includes

- **Home:** introduction to the center, tutoring highlights, and links to explore the site.
- **About:** the center's story, mission, values, and team.
- **Services:** tutoring options, subjects, and frequently asked questions.
- **Tutors:** searchable tutor profiles with subject filters and sample booking interactions.
- **Contact:** contact information and an enquiry form.
- **Admin demo:** overview plus sample tutor, student, booking, message, and attendance tables.

> **Demo limitation:** This is currently a frontend-only project. The admin sign-in accepts any username and password and stores a demo flag for the current browser session. It does not authenticate or authorize real users, and the dashboard's sample data is not saved. Do not use real or sensitive information. A production admin area needs a backend and real authentication.

## Built with

- React
- React Router
- Vite
- Oxlint

## Run locally

Install [Node.js](https://nodejs.org/) and then, from the project directory, run:

```sh
npm install
npm run dev
```

Vite prints a local URL in the terminal; open it in your browser.

## Useful commands

```sh
npm run dev      # Start the local development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Project structure

```text
src/
  App.jsx             Routes and demo sign-in state
  compents/           Shared layout and sidebar components
  Page/               Website pages and admin dashboard
    Admin.jsx
    Admin.css
    tutors.js         Sample tutor data
public/               Static images and icons
```

## Working on the project together

Both collaborators should work from the same Git repository and install dependencies locally with `npm install`. Keep `package-lock.json` committed so both environments use consistent dependency versions; do not commit `node_modules/` or local secrets.

To keep changes easy to review:

1. Agree on a task and the files each person will change.
2. Create a separate branch for each task (for example, `feature/admin-attendance`).
3. Before starting and before sharing changes, pull the latest updates from the shared branch.
4. Commit related changes with clear messages, then open a pull request or review the changes together before merging.
5. If you both need to edit the same file, coordinate first and pull/review the other person's changes before resolving conflicts.

Before merging a feature, run `npm run lint` and `npm run build`.
