import "./scss/main.scss";
import { getPin } from "./js/components/pin";
import { getPage } from "./js/unsplash-api";
import Masonry from "masonry-layout";

const container = document.querySelector(".masonry-container");
const bottom = document.querySelector("#bottom");
const desktopMatcher = matchMedia("(min-width: 992px)");

const desktopOptions = {
	itemSelector: ".grid-item",
	columnWidth: 236,
	gutter: 16,
	fitWidth: true,
	transitionDuration: 0,
};

const mobileOptions = {
	itemSelector: ".grid-item",
	columnWidth: ".grid-sizer",
	gutter: ".gutter-sizer",
	percentPosition: true,
	transitionDuration: "0",
};

let masonry;

if (desktopMatcher.matches) {
	masonry = new Masonry(container, desktopOptions);
} else {
	masonry = new Masonry(container, mobileOptions);
}

desktopMatcher.addEventListener("change", (e) => {
	if (e.matches) {
		masonry.destroy();
		masonry = new Masonry(container, desktopOptions);
	} else {
		masonry.destroy();
		masonry = new Masonry(container, mobileOptions);
	}
});

let imageObjects = [];
let loadingNextPage = false;

const observer = new IntersectionObserver(
	(entries, self) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = imageObjects.shift();

				if (!img && !loadingNextPage) {
					console.log("loading next page");
					loadingNextPage = true;
					getPage()
						.then((data) => {
							imageObjects.push(...data);
							loadingNextPage = false;
						})
						.catch((error) => {
							console.warn(error.message);
						});
				} else if (img) {
					const pin = getPin(img);
					console.log(imageObjects.length);
					container.append(pin);
					masonry.appended(pin);
				}

				self.unobserve(entry.target);
				self.observe(entry.target);
			}
		});
	},
	{
		rootMargin: "0px 0px 1000px 0px",
	}
);

observer.observe(bottom);
