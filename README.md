# React Site with Menu and useContext

This is a simple one-page React site created with Vite that has Typescript and Sass installed, and with React Router and a CLI that enables you to easily create pages. It also has useContext implemented with an example of loading both static and API data in useContext and using these state variables on two separate pages.

![grafik](https://starters.tanguay.eu/images/starters/blankViteDarkMenuUsecontext.png)

## features

- built with **Vite**
- **React Router** menu
- dark layout
- TypeScript
- one **Sass** file (`index.css` is deleted)
- **CLI** to easily create pages (`npm run cp Info` creates info page)
- this site has **React Router 404 bug fixes** implemented for both Netlify (`public/_redirects` file) and Vercel (`vercel.json` file)
- *good for any React project since state management such as useContext is useful in any site beyond the simplest demo sites*

## install

- go to your projects directory
  - e.g. `cd ~/projects`
- in your projects directory, create your new site e.g. **site001** by cloning this project 
  - `git clone git@github.com:edwardtanguay/blank-vite-dark-menu-usecontext.git site001`
- open your newly created site in VSCode
  - `code site001`
- inside VSCode, open the VSCode terminal
  - **CTRL-`**
- delete the connection to this repository by deleting the Git repository
  - `rm -rf .git`
- create a new local Git repository
  - `git init -b main`
- install node_modules
  - `npm i`
- start your site and click given link to view website
  - `npm run dev`

## more starters, templates and frameworks

https://starters.tanguay.eu
