"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const subNum = document.querySelector(".homework_btn"),
    resultNode = document.querySelector(".result");


  const useRequest = async (width, height) => {
    fetch("https://picsum.photos/200/300");
    let fetchUrl = await fetch(`https://picsum.photos/${width}/${height}`);
    let jsonRes = await fetchUrl.blob();
    return await jsonRes;
  };

  subNum.addEventListener("click", async () => {
    const value = document.querySelectorAll("input");
    let cardBlock;
    if (
      typeof +value[0].value == "number" &&
      value[0].value <= 300 &&
      value[0].value >= 100 &&
      typeof +value[1].value == "number" &&
      value[1].value <= 300 &&
      value[1].value >= 100
    ) {
      const requestResult = await useRequest(value[0].value, value[1].value);
      console.log(requestResult);

      cardBlock = `
      <div class = 'card'>
        <img src = '${URL.createObjectURL(requestResult)}'class = 'card-image'/>
      </div>
      `;
    } else {
      cardBlock = `
        <div class = 'card'>
      <p> одно из чисел вне диапазона от 100 до 300<p/>
        </div>`;
    }
    resultNode.innerHTML = cardBlock;
  });
});