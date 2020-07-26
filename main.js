let foundData;
let inputValue;
let dataFromFile;


fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        dataFromFile = data.split('\n');
    });

function finder(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return renderAnswer(arr, i);
        }
    }
    return `Not Found`;
}

function renderAnswer(arr, index) {
    result = `1: word "${arr[index]}" found in "${index}" row. Similar words: `;
    for (let j = 1; j < 9; j++) {
        if (arr[index + j]) {
            result += `<br> ${j + 1}: word  "${arr[index + j]}" in "${index + j}"`;
        }
    }
    return result;
}

window.addEventListener("load", () => {
    document.getElementById("submit_data").addEventListener("click", onSubmit, false);

});

let onSubmit = function (event) {
    event.preventDefault();
    inputValue = document.querySelector("#input").value.toString().trim();
    let output_data = document.querySelector("#output>p");
    output_data.innerHTML = finder(dataFromFile, inputValue);
};