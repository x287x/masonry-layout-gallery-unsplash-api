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
		console.log("desktop");
		masonry.destroy();
		masonry = new Masonry(container, desktopOptions);
	} else {
		console.log("mobile");
		masonry.destroy();
		masonry = new Masonry(container, mobileOptions);
	}
});

let imageObjects = [];
let loadingNextPage = false;

getPage().then((data) => {
	let nodes = [];
	for (let i = 0; i < 10; i++) {
		const img = data.shift();
		const pin = getPin(img);

		nodes.push(pin);
	}
	container.append(...nodes);
	masonry.appended(nodes);
	return { nodes, data };
});
// .then((data) => {
// 	let nodes = [];
// 	for (let i = 0; i < 10; i++) {
// 		const img = data.shift();
// 		const pin = getPin(
// 			img.urls.small,
// 			img.alt_description,
// 			img.width,
// 			img.height,
// 			img.color,
// 			img.description,
// 			img.user.profile_image.small,
// 			img.user.name,
// 			img.user.links.html
// 		);

// 		nodes.push(pin);
// 	}
// 	container.append(...nodes);
// 	if (desktopMatcher.matches) {
// 		masonry.destroy();
// 		masonry = new Masonry(container, desktopOptions);
// 	} else {
// 		masonry.destroy();
// 		masonry = new Masonry(container, mobileOptions);
// 	}
// 	return { nodes, data };
// });

// const observer = new IntersectionObserver((entries, self) => {
// 	entries.forEach((entry) => {
// 		if (entry.isIntersecting) {
// 			const img = imageObjects.shift();

// 			if (!img) {
// 				console.log("list is empty");
// 				if (!loadingNextPage) {
// 					loadingNextPage = true;
// 					getPage()
// 						.then((data) => imageObjects.push(...data))
// 						.then(() => (loadingNextPage = false));
// 				}
// 			} else {
// 				const pin = getPin(
// 					img.urls.small,
// 					img.alt_description,
// 					img.width,
// 					img.height,
// 					img.color,
// 					img.description,
// 					img.user.profile_image.small,
// 					img.user.name,
// 					img.user.links.self
// 				);
// 				container.appendChild(pin);
// 				masonry.appended(pin);
// 			}

// 			observer.unobserve(entry.target);
// 			observer.observe(entry.target);
// 		}
// 	});
// });

// observer.observe(bottom);
