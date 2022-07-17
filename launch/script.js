const cards = [
    {
        name: "Blue Documentation",
        link: "https://bluedocs.glide.page",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/bluedocs.gif",
            alt: ''
        }
    },
    {
        name: "Blue Community Assessment",
        link: "https://app.bluecommunity.info/full",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/blue-articles-detail.gif",
            alt: ''
        }
    },
    {
        name: "Civic Leader Lookup",
        link: "https://bluecommunitysustainability.github.io/assessment/civic/dist/index.html",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/civic-info-lookup.gif",
            alt: ''
        }
    },
    {
        name: "Welcome Wizard",
        link: "https://twitter.com/imchriskitchens",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/welcomewizard.gif",
            alt: ''
        }
    },
    {
        name: "Stakeholder Dashboard",
        link: "https://bluecommunities.glide.page",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/stakedash.gif",
            alt: ''
        }
    },
    {
        name: "GSTC Criteria",
        link: "https://sustain.glide.page",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/sustain.png",
            alt: ''
        }
    },
    {
        name: "Best Practices",
        link: "https://app.spaceli.io/space/1S2dEuuV2JU-Yp0fZDv0fQq389SxCEdr4",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/bestpractices.png",
            alt: ''
        }
    },
    {
        name: "Blue Community Website",
        link: "https://www.bluecommunity.info/",
        image: {
            src: "https://bluecommunitysustainability.github.io/assessment/wiz/bc-website.png",
            alt: ''
        }
    },
];

const fragment = document.getElementById('card-template');

cards.forEach(({ name, link, image }) => {
  const instance = document.importNode(fragment.content, true);
  instance.querySelector('[data-name]').textContent = name;
  instance.querySelector('[data-link]').href = link;
  instance.querySelector('[data-image]').src = image.src;
  instance.querySelector('[data-image]').alt = image.alt;
  main.appendChild(instance);
});