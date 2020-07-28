let dataFromFile;
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let orderedData = {};


fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        dataFromFile = data.split('\n');
        fillDataObj();


    })
    .then(() => {

        // console.log(orderedData);

        for (let kay in orderedData){
            console.log(orderedData[kay]);
        }

         // console.log(orderedData["a"]["0"]["words"].map(value => dataFromFile.indexOf(value)));

    });

function finder(arr, elem) {
    if (!elem) {
        return `Empty data!`;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return renderAnswer(arr, i);
        }
    }
    return `Not Found!`;
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
    let inputValue = document.querySelector("#input").value.toString().trim();
    let output_data = document.querySelector("#output>p");
    output_data.innerHTML = finder(dataFromFile, inputValue);


};


function fillDataObj() {
    alphabet.map((value) => {
        orderedData[value] = arrDivider(divideByLetter(dataFromFile, value));
    })
};


function divideByLetter(undividedArr, letter) {
    let arr = [];
    undividedArr.filter(value => value[0].toLowerCase() === letter ?
        arr.push(value)
        : false
    );
    return arr;
};


function arrDivider(arrSortetByLetter) {
    let dividedArr = {};
    let fluentArr =[];
    let size = 1000; //размер подмассива
    for (let i = 0; i < Math.ceil(arrSortetByLetter.length / size); i++) {

        dividedArr[i] = {
            words: arrSortetByLetter.slice((i * size), (i * size) + size),
            title: arrSortetByLetter[i * size],
        };
        // fluentArr = dividedArr[i]["words"].map(value => dataFromFile.indexOf(value));
        // dividedArr[i]["indexes"] = fluentArr;
    }

    return dividedArr;
}



