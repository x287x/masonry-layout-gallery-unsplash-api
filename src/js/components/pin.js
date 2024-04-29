const pinTemplate = document.querySelector("template");

/**
 *
 * @param {Object} imgObj- Image Object returned by unsplash api
 * @param {string} img.urls.small - src
 * @param {string} img.alt_description - alt
 * @param {Number} img.width - width
 * @param {Number} img.height - height
 * @param {string} img.color - dominantColor
 * @param {string} img.description - description
 * @param {string} img.user.profile_image.small- artistImgSrc
 * @param {string} img.user.name - artistName
 * @param {string} img.user.links.html - artistUnsplashProfileLink
 * @returns {HTMLElement}
 */
export function getPin(img) {
	const pin = pinTemplate.content.firstElementChild.cloneNode(true);

	const pinImg = pin.querySelector("#pinImg");
	const pinDesc = pin.querySelector("#pinDesc");
	const artistImg = pin.querySelector("#artistImg");
	const artistNameElement = pin.querySelector("#artistName");
	const artistLink = pin.querySelector("#artistLink");

	pinImg.src = img.urls.small;
	pinImg.alt = img.alt_description ?? "";
	pinImg.width = img.width;
	pinImg.height = img.height;
	pinImg.style.color = "transparent";
	setSrcset(pinImg, pinImg.src);
	setSizes(pinImg);

	pinImg.onload = () => (pinImg.style.color = "revert");
	pinImg.onerror = () => (pinImg.style.color = "revert");

	if (img.description) {
		pinDesc.textContent = img.description;
	} else {
		// so that it doesn't take height in the dom when it's empty
		pinDesc.remove();
	}

	pinImg.parentElement.style.backgroundColor = img.color;

	artistImg.src = img.user.profile_image.small;
	artistImg.width = 32;
	artistImg.height = 32;
	artistNameElement.textContent = img.user.name;
	artistLink.href = img.user.links.html;
	artistLink.target = "_blank";

	return pin;
}

/**
 *
 * @param {HTMLImageElement}
 * @param {string} src - img.urls.small
 * @returns {string}
 */
function setSrcset(elem, src) {
	src = src.replace("&w=400", "");

	const srcset = new Map();
	for (let i = 1; i < 11; i++) {
		srcset.set(`${i * 100}w`, `${src}&w=${i * 100}`);
	}
	for (let i = 1; i < 6; i++) {
		srcset.set(`${1000 + i * 200}w`, `${src}&w=${1000 + i * 200}`);
	}

	let srcsetString = "";
	srcset.forEach((v, k) => {
		srcsetString = srcsetString.concat(v, " ", k, ", ");
	});

	elem.srcset = srcsetString;
}

/**
 *
 * @param {HTMLImageElement}
 * @returns {string}
 */

/**
 *   768px: calc(100vw - (5 * --column-gap-desktop) / 4)
 *   576px: calc(100vw - (4 * --column-gap-desktop) / 3)
 * 	 mobile: calc(100vw - (3 * --column-gap-mobile) / 2)
 */
function setSizes(elem) {
	const sizesString = `
		(min-width: 992px) 236px,
		(min-width: 768px) calc( (100vw - 80px) / 4),
		(min-width: 576px) calc( (100vw - 64px) / 3),
		calc((100vw - 24px) / 2),
	`;

	elem.sizes = sizesString;
}
