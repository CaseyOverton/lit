# Fanime Web App

This is a simple web application that displays a list of anime using custom Web Components built with [Lit](https://lit.dev/). The project is deployed using [GitHub Pages](https://pages.github.com/).

## 🌐 Live Demo

[View it on GitHub Pages](https://caseyoverton.github.io/lit/)

## 🚀 Features

- Custom `my-header` component to display header name
- Custom `anime-list` component to display anime titles using reusable components including media-card, and modal.
- Each media card is scrollable, and clickable. Clicking a media card will bring a modal popup displaying anime description.
- Built using native Web Components and Lit
- Site is optimal for web AND mobile use.

## 🛠️ Technologies Used

- [Lit](https://lit.dev/)
- HTML & CSS via Lit
- JavaScript (ES Modules)
- GitHub Pages for deployment
- Prettier for formatting
- Creation of background image for website with ChatGPT!
- Vite for application creation and running on local host.

## 🧾 Usage

To run locally:

1. Clone the repository:

   `git clone https://github.com/caseyoverton/lit.git`

2. cd lit

3. npm run dev

## Development Process

### Initialization:

I started with initializing the project using Vite and Lit. Using command npm run dev, we get a local host website that runs the application. I initially added a couple of branches, such as header and api functionality branches. This is how I would approach a feature on a professional project. While I deleted the branches upon completion, it was helpful and interesting pushing my branches, and pulling them in the main branch. I also made a point to delete commits as there were quite a lot. I wanted the repo to be pretty clean in the end.

### Basics

Once initial set up was complete, I started working on the basics, with the header. I was able to get a header displaying pretty easy, so I then dug into the api/lit docs to get a list of API data displaying. This took a few tries, but I decided on the async await method and continued to move forward.

### Reusable Components/Styling

Once I got the list displaying inside the anime-list.js file, I wanted to make my first reusable component. This also took some looking into as I needed to figure out how to get data between the api and the media cards! I looked into the docs and also asked ChatGPT how it would combine the files. With all this info I was able to get the media cards displaying! At this point I could not help myself on getting the styling started!! I used Flex to get the cards centered and displaying with a wrap. Flex is one of my go to styling methods as it works well in all screen styles. I put a slight opacity on each media card, so the user can see some stars from the background image. I actually got the background image from a query on ChatGPT. I wanted an anime inspired moon-like picture in the night time (so there was a darker dynamic which goes well with light colored media cards!).

### Modal/Scroll

From the beginning I wanted each media card to have a click function that adds a modal display when clicked, showcasing the data a larger. I first started with each card having the scroll ability which was just one line of CSS, so easy enough. The modal however took a little longer to get working. Modal documentation is all over the web so I was able to get a modal template displaying when an onclick function was made. I was assisted by ChatGPT on this. I asked how it would go about making a modal function and it gave me a template to which I added and perfected. If this project has taught me anything, it is that ChatCPT is NOT just for solving bugs but also creating beginning steps to get something up and running.

### Additions

I was determined to get pagination working. I have never implimented it before but I did some slight digging and figured out how to get it working. Display 10 items per page, and add in buttons at the bottom of the page to determine which page the user is on. Some things I wanted to add was the "Previous" button being disabled if on first page, as well as the active button having a styling that makes the user aware of which page they are currently on. This has all been informative and fun to learn through the ways of Lit!

### Mobile Styling

I couldnt leave the app without mobile styling. I noticed that the media cards were too small and tough to read in mobile, so I did a couple of media queries within the CSS to change the font-size and height/width properties so they are more readable in mobile. This was a quick addition that made a world of difference.

### Unit Testing/Main Issue

My last wish for this project was to complete unit testing for each component. I have never done this from scratch (and with Vitest/Lit) so this initiative took a while, and in the end did not come out the way I had hoped. I had an **issue** where the tests were only passing when the import at the top of component files were using 'lit'. My issue with using that import is that github pages would not deploy properly unless using the import `{ html, css, LitElement } from 'https://unpkg.com/lit@latest?module';`. Where github pages could not read the lit import, vitest test could not read the https import. I spent a while trouble shooting this trying everything from path changes to github page changes. I did not want to spend any longer on this so I decided to leave the tests in the directory but acknowledge they are not working.

## The Future of Fanime

**Media Card Filters**
I would love to add filtering for anime media cards including A-Z, Z-A, and a search bar for user to search titles!

**TypeScript**
I did not have time to transform JS to TypeScript. I think this is vital as it helps with debugging and problem solving when something has gone wrong.

**Organizing Reusable Variables!**
I would like to create a file that holds reusable variables such as any CSS colors used, and mobile/tablet and desktop sizing, for example, "@media (max-width: 420px)" for dynamic styling etc.
