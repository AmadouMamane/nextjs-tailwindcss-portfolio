# Next.js, React & TailwindCSS Portfolio Project

A simple portfolio starter theme built with Next.js, React and Tailwind CSS. This is the Next.js version of [vuejs-tailwindcss-portfolio](https://github.com/realstoman/vuejs-tailwindcss-portfolio).

![React-TailwindCSS-Portfolio](https://user-images.githubusercontent.com/16396664/146666086-28e88beb-c2f0-431f-adfb-2396d8f64c80.png)

## Demo URL

[https://nextjs-tailwindcss-portfolio.vercel.app](https://nextjs-tailwindcss-portfolio.vercel.app)

## Other versions of this project

-   React Version: [https://github.com/realstoman/react-tailwindcss-portfolio](https://github.com/realstoman/react-tailwindcss-portfolio)
-   Vue.js Version: [https://github.com/realstoman/vuejs-tailwindcss-portfolio](https://github.com/realstoman/vuejs-tailwindcss-portfolio)
-   Nuxt.js Version: [https://github.com/realstoman/nuxtjs-tailwindcss-portfolio](https://github.com/realstoman/nuxtjs-tailwindcss-portfolio)

## Features

-   Built with [Next.js](https://nextjs.org) and [React](https://reactjs.org)
-   [Tailwind CSS v3](https://tailwindcss.com)
-   Custom Hooks
-   Framer Motion Transitions & Animations
-   Reusable Components
-   Projects filter by category
-   Projects filter by search
-   Dark Mode
-   Smooth scroll
-   Counter
-   Dynamic forms
-   Back to top button
-   Download file button
-   Simple and responsive design

### To Contribute to this project, read the [Contribution Guidlines](https://github.com/realstoman/nextjs-tailwindcss-portfolio/blob/main/CONTRIBUTING.md)

## Setup

1. Make sure you have Node JS installed. If you don't have it:

-   [Download it from nodejs.org](https://nodejs.org)
-   [Install it using NVM ](https://github.com/nvm-sh/nvm)
-   If you're on Mac, Homebrew is a good option too:

```
brew install node
```

2. Clone the repo:

```
git clone https://github.com/realstoman/nextjs-tailwindcss-portfolio.git
```

3. Open the project folder:

```
cd nextjs-tailwindcss-portfolio
```

4. Install packages and dependencies:

```
npm install
```

5. Start a local dev server at `http://localhost:3000`:

```
npm run dev
```

## Notes

-   Always run `npm install` after pulling new changes
-   I'll be constantly updating this repo as I'll be adding more sections to it, so please always check the projects section of this repo to see what tasks are under todo and in progress
-   Coming Soon [I'll be doing a screencast](https://www.youtube.com/realstoman). Soon I'll be uploading a video to my YouTube channel where I'll be going through the process of creating this portoflio
-   Illustrations from [unDraw](https://undraw.co) and [Freepik](https://freepik.com)
-   Images from [Unsplash](https://unsplash.com)
-   Feel free to use it as your own portfolio
-   Contributions are welcome

## Notebooks rendering with Quarto

1. Transform the jupyter notebook into a qmd file:

```
quarto convert isic-2024_kaggle.ipynb -o isic-2024_kaggle.qmd
```

2. Transform the qmd file to suit your layout needs, for example add this at the head of the qmd file: 

```
---
format:
  html:
    title: ''
    toc: true
    toc-title: "<strong>Table of contents</strong>"
    toc-location: right
    toc-depth: 5
    toc-expand: true 
    toc-float:
      collapsed: true
      smooth-scroll: true
      width: 300px
    theme: cosmo
    code-fold: false
    code-fold-show: true  
    page-layout: full
    number-sections: true
    code-tools: false
    code-line-numbers: false
    code-summary: "Show Code"
    code-block-bg: true
    include-in-header: styles/toc-scrollbar-hide.html
execute:
  enabled: false
---
```

3. Convert the qmd into an html file:

```
quarto render isic-2024_kaggle.qmd   
```

### License

[MIT](https://github.com/realstoman/nextjs-tailwindcss-portfolio/blob/main/LICENSE)
