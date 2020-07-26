let foundData;
let inputValue;
let dataFromFile;


fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        dataFromFile = data.split('\n');
    });


function isContains(arr, elem) {
    let result;
    if (!elem) {
        return "No data in input";
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            result = `word "${elem}" found in "${i}" row. `;
            for (let j = 0; j < 9; j++) {
                if (arr[i + j + 1]) {
                    result += `Similar words: <br> \n ${j + 2}: "${arr[i + j + 1]}" in "${i + j + 1}"`;
                }
            }
            return result;
        }
    }
}


window.addEventListener("load", () => {
    document.getElementById("submit_data").addEventListener("click", onSubmit, false);

});

let onSubmit = function (event) {
    event.preventDefault();
    inputValue = document.querySelector("#input").value.toString().trim();
    let output_data = document.querySelector("#output>p");
    output_data.innerHTML = isContains(dataFromFile, inputValue);

};