// FomoHash
// ==UserScript==
// @name        FomoHash AutoMiner
// @namespace   Violentmonkey Scripts
// @match       *://app.fomohash.com/*
// @grant       none
// @version     1.1
// @author      Ergo
// @description Updated: 02.01.2025
// @icon        https://www.findmini.app/_astro/fomohash_bot_yowkzcjopw_Z1F2CYJ.webp
// @downloadURL https://github.com/draftpin/fomo-hash/raw/main/fomohash-automine.user.js
// @updateURL   https://github.com/draftpin/fomo-hash/raw/main/fomohash-automine.user.js
// @homepage    https://github.com/draftpin/fomo-hash
// ==/UserScript==

(function fomoHashAutoMine() {
	if (!window.dbg) window.dbg = console.log
	const waitMs = (ms) => new Promise((resolve) => setTimeout(() => resolve(true), ms))
	const getRandomInRange = (min, max) => max > min ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(min)

	function getEnergy() {
		const energyElem = document.querySelector('.progress .text1')
		if (!energyElem) return 
		const energy = energyElem.style?.width
		if (!energy) return
		return parseInt(energy, 10)
	}

	function isElementVisible(element, checkRealVisible = true) {
	  if (!element) {
	    return false // Если элемент отсутствует
	  }

	  const style = window.getComputedStyle(element)
	  
	  // Проверяем стиль элемента
	  const isVisible = style.display !== 'none' &&
	                    style.visibility !== 'hidden' &&
	                    style.opacity !== '0'

	  if (!isVisible) return false
	                    
	  // Проверяем, находится ли элемент в области просмотра
	  const rect = element.getBoundingClientRect()
	  const inView = rect.top >= 0 && rect.left >= 0 &&
	                 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	                 rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	  
	  if (!inView) return false
	  if (!checkRealVisible) return true

	  // Проверяем, перекрыт ли элемент другими элементами
	  const elementCenterX = rect.left + rect.width / 2
	  const elementCenterY = rect.top + rect.height / 2

	  // Получаем элемент по координатам центра элемента
	  const elementAtCenter = document.elementFromPoint(elementCenterX, elementCenterY)
	  
	  // Сравниваем, является ли найденный элемент тем же, что и проверяемый
	  return elementAtCenter === element || element.contains(elementAtCenter)
	}


	function closeModal() {
		const modals = [
			'.closeicon'
		]
		for (const modal of modals) {
			const modalEls = document.querySelectorAll(modal)
			if (modalEls.length) {
				for (const modalEl of modalEls) {
					if (isElementVisible(modalEl)) {
						dbg('Autoclose modal: ', modal)
						dbg(modalEl)
						modalEl.click()
						return true
					}
				}
			}
		}
	}

	function doMine () {
		if (closeModal()) return
		const mineButton = document.querySelector('.main-btn-start button')
		if (!mineButton) return

		const energy = getEnergy()
		if (!energy) return
		dbg('Energy:', energy)

		if (mineButton.innerText.startsWith('START')) {
			if (energy >= 99) {
				dbg('Energy is full - starting mine!')
				return mineButton.click()
			}
		} else {
			if (energy < 30) {
				dbg('Energy is less than 30% - stopping mine!')
				return mineButton.click()
			}
		}
	}
	async function autoMine () {
		while(doMine() !== 'OK') await waitMs(60000)
		// autoRestart()
		// setTimeout(autoRestart, getRandomInRange(1, 5) * 60 * 1000)
	}
	autoMine()
})()