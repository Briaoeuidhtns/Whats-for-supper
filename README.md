# What's for Supper

What's For Supper is a single page cross platform web app that simplifies the process of meal planning. It will adapt to your family's preferences, while keeping a history of recent meals to not over-suggest. The application provides a low friction way for a family to plan meals. Families are given a single recipe at a time and asked if they would like to make that suggested supper. If they would like to make the supper, the app can bring up an associated ingredients list or recipe. If they do not want to make the suggested supper, the app will suggest another recipe.

The application will adapt the suggestions provided over time according to the user's preferences. While it will try to avoid suggesting the same recipe too many times in a row, the suggestions will take into account a user’s preferences(meal ratings) in food choices to better suggest meals.

It will:

- Remove five or more minutes a day on deciding what's for dinner
- Save time for 130 million families in the US every evening
- Encourage cooking meals for dinner rather than going to restaurants

## Getting Started

Building is only supported on linux currently. Windows can probably be used, but continue at your own risk.

CI tests are run against the latest Alpine lts, but it has been verified to build on both Arch and Ubuntu

### Development Environment

We don't mandate use of a particular IDE, but if you don't have a preference we recommend using [vscode](https://code.visualstudio.com/). It provides a decent out-of-box experience for web for most.

Also not required, but to help with testing and debugging, there are a couple useful browser extensions:

- [React Developer Tools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html#how-do-i-get-the-new-devtools) _(Available for Firefox and Chrome)_

Shows React virtual dom, better error messages, misc other experience improvements.

- [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) _(Available for both Firefox and Chrome)_

Shows actions dispatched, current state, diffs between states, and time travel debugging. Also provides ad hoc dispatch of actions and generation of tests for current behavior.

### Dependencies

The only dependency that must be manually installed is [Yarn](https://yarnpkg.com/en/docs/install). </br> We are building with the latest stable release at the time of writing, `v1.21.1`. Follow the instructions for your distribution to install.

To install project dependencies, from the project directory run:

### `yarn install`

This will download all required libraries and dev tools.

If you are using an IDE with prettier or eslint support, make sure it is using the versions from the local node_modules folder, as formatting with a different version may trigger ci failures.

### Running the project

To start developing, run:

### `yarn start`

This runs a server that will watch your project for changes and automatically reload changes. The page is served from [http://localhost:3000](http://localhost:3000)

When running in this mode, devtools are injected and reported errors are flagged as debugging.

### Building a Release

To build an optimized build for deployment, run:

### `yarn build`

The finished build will be in the `build` folder. **This build is designed to be served from the root of the server.** If this is not what you want, see !19 for an example to build for some other location.

This is good for testing that the project can be built, but for production, **releases should be downloaded from Gitlab CI** instead of manually built. This ensures that the project is clean built in a consistent environment from only committed code, and that the build can be found later if needed.

After a merge to master, a build job will be triggered. When the job completes, the build should be available to download [here](https://gitlab.mcs.sdsmt.edu/7437446/senior-design/-/jobs/artifacts/master/download?job=build).

Branches for different server roots can also be used, which is needed for things like student servers. A merge request such as !19 makes it easy to deploy, as there is a button to rebase to current master, which will also trigger a build.
