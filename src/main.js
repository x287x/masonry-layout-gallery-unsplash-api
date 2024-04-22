import "./scss/main.scss";
import Masonry from "masonry-layout";

const container = document.querySelector(".masonry-container");
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
