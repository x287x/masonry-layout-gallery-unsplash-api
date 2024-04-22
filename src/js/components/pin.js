const pinTemplate = document.querySelector("template");

/**
 *
 * @param {string} src
 * @param {string} srcset
 * @param {string} sizes
 * @param {string} alt
 * @param {Number} width
 * @param {Number} height
 * @param {string} loading
 * @param {string} dominantColor
 * @param {string} description
 * @param {string} artistImgSrc
 * @param {string} artistImgLoading
 * @param {string} artistName
 * @param {string} artistHref
 * @returns {HTMLElement}
 */
export function setUpPin(
	src,
	alt,
	width,
	height,
	loading,
	dominantColor,
	description,
	artistImgSrc,
	artistImgLoading,
	artistName,
	artistHref
) {
	const pin = pinTemplate.content.cloneNode(true);

	const pinImg = pin.querySelector("#pinImg");
	const pinDesc = pin.querySelector("#pinDesc");
	const artistImg = pin.querySelector("#artistImg");
	const artistName = pin.querySelector("#artistName");
	const artistLink = pin.querySelector("#artistLink");

	pinImg.src = src;
	pinImg.alt = alt ?? "";
	pinImg.width = width;
	pinImg.height = height;
	pinImg.loading = loading;
	pinImg.style.color = "transparent";
	pinImg.srcset = getSrcset(src);
	pinImg.sizes = getSizes();

	pinImg.onload = () => (pinImg.style.color = "revert");
	pinImg.onerror = () => (pinImg.style.color = "revert");

	if (imgObj.description) {
		pinDesc.textContent = description;
	} else {
		// so that it doesn't take height in the dom when it's empty
		pinDesc.remove();
	}

	pinImg.parentElement.style.backgroundColor = dominantColor;

	artistImg.src = artistImgSrc;
	artistImg.loading = artistImgLoading;
	artistName.textContent = artistName;
	artistLink.href = artistHref;

	return pin;
}

/**
 *
 * @param {string} src
 * @returns {string}
 */
function getSrcset(src) {
	return srcset;
}

/**
 *
 * @returns {string}
 */
function getSizes() {
	return sizes;
}
