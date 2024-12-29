// FomoHash
// ==UserScript==
// @name        FomoHash AutoMiner
// @namespace   Violentmonkey Scripts
// @match       *://app.fomohash.com/*
// @grant       none
// @version     1.0
// @author      Ergo
// @description 28.12.2024, 11:07:40
// @icon        https://www.findmini.app/_astro/fomohash_bot_yowkzcjopw_Z1F2CYJ.webp
// @downloadURL https://github.com/draftpin/fomo-hash/raw/main/fomohash-automine.user.js
// @updateURL   https://github.com/draftpin/fomo-hash/raw/main/fomohash-automine.user.js
// @homepage    https://github.com/draftpin/fomo-hash
// ==/UserScript==

(function fomoHashAutoMine() {
	if (!window.dbg) window.dbg = console.log
	const waitMs = (ms) => new Promise((resolve) => setTimeout(() => resolve(true), ms))
	const getRandomInRange = (min, max) => max > min ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(min)

	function doMine () {
		// if (closeModal()) return
		const mineButton = document.querySelector('.main-btn button')
		if (!mineButton) return

		if (mineButton.innerText.startsWith('START')) {
			return mineButton.click()
		}
	}
	async function autoMine () {
		while(doMine() !== 'OK') await waitMs(10000)
		// autoRestart()
		// setTimeout(autoRestart, getRandomInRange(1, 5) * 60 * 1000)
	}
	autoMine()
})()