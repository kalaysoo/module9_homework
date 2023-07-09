function useRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function(){
        if(xhr.status !=200) {
            console.log('Status ', xhr.status)
        }else {
            const result = JSON.parse(xhr.response)
            if(callback) {
                callback(result)
            }
        }
    }
    xhr.onerror = function() {
        console.log('Error! Status ', xhr.status)
    }
    xhr.send();
}

const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn-request');
const inputValue = document.querySelector('.input-value')


function displayResult(apiData) {
    let cards= '';
    apiData.forEach(item => {
        const cardBlock = `
        <div class="result">
            <img src="${item.download_url}"<div style="width:30%">
        </div>
        `
        cards += cardBlock;
    })
    resultNode.innerHTML = cards;
}
btnNode.addEventListener('click', () => {
    const value = +document.querySelector('.input-value').value
    let inputValue = document.querySelector('.result');
    inputValue.textContent = '';
    if(value >= 11) {
        inputValue.textContent = 'число вне диапазона от 1 до 10';
        return;
    }
    useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult)
})