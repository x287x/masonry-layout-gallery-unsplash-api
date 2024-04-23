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
	// pinImg.srcset = getSrcset(src);
	// pinImg.sizes = getSizes();

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
 * @param {string} src
 * @returns {string}
 */
function getSrcset(src) {
	// return srcset;
}

/**
 *
 * @returns {string}
 */
function getSizes() {
	// return sizes;
}
