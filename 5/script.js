const input_1 = document.querySelector('.pageNumber')
const input_2 = document.querySelector('.limitNumber')
const btn = document.querySelector('button')
const errorMessage = document.querySelector('.error')
const resultHtml = document.querySelector('.dataBlock')

function createHtmlBlock() {
	let storageSaved = localStorage.getItem('img')
	storageSaved = JSON.parse(storageSaved)
	console.log(storageSaved)
	let resultImg = ''
	storageSaved.forEach(function (item) {
		const img = `
				<div class='imageData'>
					<p>${item.author}</p>
					<img src='${item.download_url}' width='500px' height='300px'>
				</div>
			`
		resultImg = resultImg + img
	})
	resultHtml.innerHTML = resultImg
}

function Analyse() {
	const numPage = Number(input_1.value)
	const numLimit = Number(input_2.value)

	if (((input_1.value == '') || (input_2.value == '')) || (isNaN(numPage) || isNaN(numLimit))) {
		return Error('не число, либо пустое поле')
	} else if ((numPage < 1 || numPage > 10) && (numLimit < 1 || numLimit > 10)) {
		return Error('Номер страницы и лимит вне диапазона от 1 до 10')
	} else if (numPage < 1 || numPage > 10) {
		return Error('Номер страницы вне диапазона от 1 до 10')
	} else if (numLimit < 1 || numLimit > 10) {
		return Error('Лимит вне диапазона от 1 до 10')
	} else {
		sendServer(`https://picsum.photos/v2/list?page=${numPage}&limit=${numLimit}`)
	}
}

function sendServer(url) {
	fetch(url)

		.then(function (response) {
			const result = response.json()
			return result
		})

		.then(function (result) {
			localStorage.setItem('img', JSON.stringify(result))
			let resultImg = ''
			result.forEach(function (item) {
				const img = `
						<div class='imageData'>
							<p>${item.author}</p>
							<img src='${item.download_url}' width='500px' height='300px'>
						</div>
					`
				resultImg = resultImg + img
			})
			resultHtml.innerHTML = resultImg
		})

		.catch(function (response) {
			if (response.status >= 400) {
				return alert(`Ошибка: ${response.status}`)
			}
		})
}


function Error(message) {
	errorMessage.innerHTML = message
	errorMessage.style.color = 'red'
}

btn.addEventListener('click', Analyse)

document.addEventListener('DOMContentLoaded', createHtmlBlock)