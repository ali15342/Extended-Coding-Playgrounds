# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices.
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle.
**Lets get coding!**

## Submission Details and Deadlines

- Coding playgrounds are **individual** work
- There will be 2 serparate submissions:
  - [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  - [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
- The playgrounds will be guided through in our sessions - still there will be distance work!
- Use this base template to create your project repository.
- Each playground is linked in the corresponding course section.
- You can find the submissions at the bottom of the Moodle course.

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:

# Base Coding Playgrounds

## K.O. Criteria

- No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
- No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)

The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.

> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
>
> **This is my JS Playground commit/branch:** <LINK_TO_YOUR_COMMIT>

**Tasks:**
Fix application code and answer the questions:

- (2) Adapt the code to use `async/await` instead of the `then()`-callback hell and refactor the functions to use arrow function syntax instead of `function()`-syntax.
- (2) Add proper error handling to the code using `try/catch` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
- (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function.
- (1) Split the code into separate modules with regards to clean separation of concerns.
- (1) Eliminate all other bad coding practices you can find.
- (3) Answer the following questions and provide some examples inside the `Readme.md` file.

> **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

# Code Improvements

This document outlines the recent code improvements made to enhance readability, maintainability, and reliability according to Clean Code principles.

## 1. Use of `let` or `const` Instead of `var`

**Bad Practice:**

```JS
// Old Code: Using 'var' to declare loop variables
var speciesTables = wikitext.split("{{Species table/end}}");
var bears = [];
```

**Explanation:** Using `var` for loop variables (or any variables in a shared scope) can lead to unexpected results due to function scoping and hoisting issues, especially when dealing with asynchronous operations.

**Good Practice:**

```JS
// New Code: Using 'const' or 'let' for block scoping
const speciesTables = wikitext.split("{{Species table/end}}");
const bears = [];
```

**Explanation:** Using `const` for fixed references and `let` for loop-specific variables provides clear, block-scoped declarations. This reduces the risk of variables unintentionally leaking into other scopes, ensuring variable safety and predictability.

---

## 2. Manual Reset of Form Fields

**Bad Practice:**

```JS
// Old Code: Manually resetting each field
nameField.value = '';
commentField.value = '';
```

**Explanation:** Manually clearing each form field is inefficient, particularly in forms with multiple fields. This approach risks leaving fields uncleared if new fields are added but the reset logic isn’t updated.

**Good Practice:**

```JS
// New Code: Using form.reset()
form.reset();
```

**Explanation:** `form.reset()` provides a simple, maintainable way to reset all fields in a form, reducing the chance of errors and making the code more concise.

---

## 3. Meaningful Variable Names

**Bad Practice:**

```JS
// Old Code: Vague and generic names
var form = document.querySelector(".comment-form");
var list = document.querySelector(".comment-container");
```

**Problem:** Names like `form` and `list` are too generic, making it hard to understand the purpose of each variable.

**Good Practice:**

```JS
// New Code: Descriptive names that convey purpose
const commentForm = document.querySelector(".comment-form");
const commentList = document.querySelector(".comment-container");
```

**Explanation:** Variables should have names that clearly express their role. In this case, `commentForm` and `commentList` make the code more readable by immediately revealing the purpose of each variable.

---

## 4. Lack of Input Validation for Comment Submission

**Bad Practice:**

```JS
// Old Code: Basic input validation logic allowing empty submissions
form.onsubmit = function (e) {
  e.preventDefault();
  // proceed with adding comment without checking fields
};
```

**Problem:** The lack of validation allowed users to submit a comment without providing a name or comment, leading to empty entries in the comment section.

**Good Practice:**

```JS
// New Code: Ensuring mandatory fields are filled before submission
const handleFormSubmit = (event) => {
  event.preventDefault();
  if (isFormValid()) {
    addComment();
    resetForm();
  }
};

const isFormValid = () => {
  const nameField = document.querySelector("#name");
  const commentField = document.querySelector("#comment");

  if (isEmptyField(nameField) && isEmptyField(commentField)) {
    showError("Name and comment may not be empty!");
    return false;
  }

  if (isEmptyField(nameField)) {
    showError("Please enter your name.");
    return false;
  }
  if (isEmptyField(commentField)) {
    showError("Please enter a comment.");
    return false;
  }
  return true;
};

const isEmptyField = (field) => !field.value.trim();

const showError = (message) => {
  alert(message);
};
```

**Explanation:** The new validation logic ensures that both the `name` and `comment` fields are filled before allowing submission. Helper functions (`isFormValid`, `isEmptyField`, and `showError`) provide a structured, reusable approach to validation, making the code cleaner and preventing empty submissions.

---

## 4. Small and Focused Functions with Clear Responsibilities – `extractBears`

**Bad Practice:**

```JS
// Old Code: extractBears does too much in one function
function extractBears(wikitext) {
  var speciesTables = wikitext.split('{{Species table/end}}');
  var bears = [];

  speciesTables.forEach(function(table) {
    var rows = table.split('{{Species table/row');
    rows.forEach(function(row) {
      var nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      var binomialMatch = row.match(/\|binomial=(.*?)\n/);
      var imageMatch = row.match(/\|image=(.*?)\n/);

      if (nameMatch && binomialMatch && imageMatch) {
        var fileName = imageMatch[1].trim().replace('File:', '');

        fetchImageUrl(fileName).then(function(imageUrl) {
          var bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: "TODO extract correct range"
          };
          bears.push(bear);

          if (bears.length === rows.length) {
            var moreBearsSection = document.querySelector('.more_bears');
            bears.forEach(function(bear) {
              moreBearsSection.innerHTML += `
                  <div>
                      <h3>${bear.name} (${bear.binomial})</h3>
                      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                      <p><strong>Range:</strong> ${bear.range}</p>
                  </div>
              `;
            });
          }
        });
      }
    });
  });
}
```

**Problem:** `extractBears` both extracts data and handles rendering, creating a function with multiple responsibilities. This design makes the function harder to test and maintain.

**Good Practice:**

```JS
// New Code: Separate extraction and rendering responsibilities
// Function to extract bear data from the wikitext
export const extractBears = async (wikitext) => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];

    for (const table of speciesTables) {
      const rows = table.split('{{Species table/row');

      for (const row of rows) {
        const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
        const binomialMatch = row.match(/\|binomial=(.*?)\n/);
        const imageMatch = row.match(/\|image=(.*?)\n/);
        const rangeMatch = row.match(/\|range=([^\|]*)(?=\s*\()/);

        if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
          const fileName = imageMatch[1].trim().replace('File:', '');
          const imageUrl = await fetchImageUrl(fileName);
          var bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch[1]
          };
          bears.push(bear);
        }
      }
    }
    renderBears(bears);
  };

// Function to render the bears into the DOM
const renderBears = (bears) => {
    let moreBearsSection = document.querySelector('.more_bears');
    bears.forEach((bear) => {
        moreBearsSection.innerHTML += `
    <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
    </div>
`;
    });
};
```

**Explanation:** The `extractBears` function now only focuses on data extraction, while `renderBears` is responsible for displaying data. This separation follows the **Single Responsibility Principle**, making each function easier to test, maintain, and modify.

## 2. Dependency- and Build Management Playground (10 Pts.)

Build the application with `npm` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others).

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**

- (1) Integrate `npm` and a build management tool into your project.
- (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
- (2) Use ESLint and Prettier inside your project - rulesets can be found below.
- (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
- (1) Define the following tasks within `npm scripts`:
  - `dev`: starts the development server
  - `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  - `lint`: runs ESLint on all `.js` and `.ts` files in your projects `/src` directory
  - `lint:fix`: runs and also fixes all issues found by ESLint
  - `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  - `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
- (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
- (2) Answer the question at the end of this section inside `Readme.md` file:

**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:

```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```

**Prettier Configurations**

Apply the following ruleset for Prettier:

```.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

> **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

Switching from JavaScript to TypeScript (TS) introduces several improvements in type safety, error reduction, and maintainability. Here are some of the core advantages:

## 1. Type Safety and Error Reduction

### Interfaces and Explicit Types
TS allows defining interfaces, like `Bear` and `BearDataResponse`, which clarify the structure of the data being handled. For instance:

```typescript
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}
```

- The `Bear` interface defines the expected fields (`name`, `binomial`, `image`, `range`), ensuring consistency across the application.
- This eliminates the risk of runtime errors caused by unexpected data structures since TS will flag type mismatches at **compile time**.

### Explicit Type Annotations
In TypeScript, functions, variables, and parameters now have types explicitly defined. For example:

```typescript
function fetchImageUrl(fileName: string): Promise<string> {
  // Function logic here
}
```

- This avoids potential bugs where variables might have unintended types.
- It enhances code readability by specifying what each part of the code expects and returns.

## 2. Reduced Runtime Errors

### Compile-Time Checks
TypeScript's strict checks, such as nullability (`strictNullChecks`), prevent issues that would otherwise only be detected at runtime in JavaScript. For instance:

- If `commentWrapper` might be `null` in `setupShowHideComments`, TypeScript will issue a warning, helping avoid runtime errors in DOM manipulation functions.

## 3. Explicit Type Casting and Avoidance of Implicit `any`

### Defined Behavior for DOM Elements
In `setupShowHideComments`, DOM elements like `showHideBtn` and `commentWrapper` are typed:

```typescript
const showHideBtn = document.querySelector("button") as HTMLButtonElement;
const commentWrapper = document.querySelector(".comments") as HTMLDivElement;
```

- This gives TypeScript the ability to verify that these elements support the methods and properties being accessed.
- In JavaScript, forgetting to verify element types could lead to runtime errors.

### Removal of `any` Type
Without TS, JavaScript would implicitly treat many variables as `any`, bypassing type checking entirely. TypeScript removes this ambiguity by enforcing strict typing:

- Ensures that only expected data types are used.
- Avoids issues like misassigned values, making the code more robust and easier to maintain.

---

TypeScript's introduction of interfaces, compile-time checks, and explicit type annotations offers a more reliable, readable, and maintainable codebase, reducing bugs and runtime errors.


## 3. CI/CD Pipeline Playground (5 Pts.)

Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**

- (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in `npm scripts`:
  - `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  - `test:coverage`: runs tests like `test` but also creates a test coverage report
- (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  - Create a `development` branch inside your repository
  - (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  - (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice).
- (0.5) Reuse existing workflows or jobs whenever possible!

## 4. Accessibility Playground (5 Pts.)

You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color**

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

Using a color contrast analyzer, it was found that the contrast between text and background in various sections did not meet the Web Content Accessibility Guidelines (WCAG).

### Fixes Applied

- **Navigation Bar Background:** Changed the background color of the navigation bar and article from `#ff80ff` to `#aa80ff` to enhance contrast.
- **Header Text Color:** Adjusted the text color in the header "Welcome to our wildlife website" to `#000000` for improved readability and contrast.
- **Text Shadow:** Enhanced the text shadow for large headings for better contrast.
  ```css
  font[size='7'] {
    text-shadow: 2px 2px 10px rgb(124, 122, 122);
  }
  ```
- **Link Color:** Changed the link color for better contrast.

  ```css
  a:visited {
    color: rgb(62, 2, 97);
    background-color: transparent;
    text-decoration: none;
  }

  a:link {
    color: rgb(0, 0, 0);
    background-color: transparent;
    text-decoration: underline;
  }
  ```

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

Screen reader navigation revealed issues such as:

- Use of `<font>` tags instead of semantic headings.
- Lack of appropriate HTML5 structural elements.

### Fixes Applied

- Replaced `<font>` tags with semantic elements such as `<h1>`, `<h2>`, and `<h3>`.
- Added structural elements like `<header>`, `<nav>`, `<main>`, `<aside>`, and `<section>` for better screen reader interpretation.
- Used `aria-label` attributes to further improve navigation.

**(0.5) Audio**

The `<audio>` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

- Added an audio transcript below the `<audio>` element allowing users to read the content instead of hearing it.
  ```html
  <h3>Audio Transcript</h3>
  <p>
    This isn't really an audio fact file about bears, but it is an audio file
    that you can transcribe.
  </p>
  ```

**(1) Forms**

- The `<input>` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
- The two `<input>` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

### Fixes Applied

1. **Search Form:**

   - Added a screen-reader-only label:
     ```html
     <label for="search" class="sr-only">Search</label>
     <input type="search" id="search" name="q" placeholder="Search query" />
     ```
   - **CSS:**
     ```css
     .sr-only {
       position: absolute;
       clip: rect(0, 0, 0, 0);
       border: 0;
     }
     ```

2. **Comment Form:**
   - Correctly associated `<input>` elements with their labels:
     ```html
     <div class="comment-form">
       <div class="flex-pair">
         <label for="name">Your name:</label>
         <input
           type="text"
           name="name"
           id="name"
           placeholder="Enter your name"
         />
       </div>
       <div class="flex-pair">
         <label for="comment">Your comment:</label>
         <input
           type="text"
           name="comment"
           id="comment"
           placeholder="Enter your comment"
         />
       </div>
       <div>
         <input type="submit" value="Submit comment" />
       </div>
     </div>
     ```
     ```css
     .comment-form label {
       align-self: center;
       flex: 2;
       text-align: right;
       font-weight: bold;
     }
     ```

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

### Fixes Applied

- Added `tabindex` to make the button focusable and operable via the `Enter` key.
  ```html
  <button class="show-hide" tabindex="0">Show comments</button>
  ```

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

### Fixes Applied

- Added `scope="col"` to header cells and a `summary` attribute to describe the table’s purpose.
  ```html
  <table
    summary="A comparison of different types of bears, their coats, sizes, habitats, lifespans, and diets."
  >
    <thead>
      <tr>
        <th scope="col">Bear Type</th>
        <th scope="col">Coat</th>
        <th scope="col">Adult size</th>
        <th scope="col">Habitat</th>
        <th scope="col">Lifespan</th>
        <th scope="col">Diet</th>
      </tr>
    </thead>
  </table>
  ```

**(1) More Findings**

What other accessibility issues did you find? Explain how you did fix them.

1. **Image Alt Text:**

   - Added descriptive `alt` attributes to all images for better screen reader support.
     ```html
     <img src="media/wild-bear.jpg" alt="A wild bear in its natural habitat" />
     ```

2. **Aria-label:**

   - Added `aria-label` and `aria-labelledby` to provides accessible names for elements, allowing screen readers
     to convey its purpose to users who rely on assistive technology.

3. **Language:**
   - Added missing language: Including the `lang` attribute improves accessibility by enabling screen readers and other assistive technologies
     to correctly interpret and pronounce the content according to the specified language.
     ```html
     <!doctype html>
     <html lang="en"></html>
     ```

# Extended Coding Playgrounds

Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission.
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)

In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:

- Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  - All previous features should still work
  - The application still should use build and dependency management
- Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)

In this playground you will use a backend framework of your choice and connect it with an API to your frontend application.

**Tasks**:

- (3) Setup a backend framework of your choice
- (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
- (2) Your backend should now request the bear data from presented Wikipedia API
- (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
- (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests

## 7. Containerize your application (10 pts.)

Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:

- (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  - The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  - The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app
- (4) Create two docker-compose files to orchestrate you applications in `development` and `production` mode:
  - Define ports and dependencies
  - Define corresponding stage (development, production)
  - Use environment variables if possible
- Your application should start with the following commands:
  - Development: `docker-compose -f docker-compose.yml up --build`
  - Production: `docker-compose -f docker-compose.prod.yml up --build`
