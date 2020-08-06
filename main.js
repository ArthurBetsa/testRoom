'use strict';

let dataFromFile;
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let orderedData = {};
// let orderedDataString = {};


fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        dataFromFile = data.split('\n');
        dataFromFile.sort(/* хуй знает что сюда писать, что бы оно работало как нужно*/);
        /// Я в душе не ебу, как его правильно сортировать, что бы слова вроде ('midst) и (Y-chromosome) стали на свои места

        fillDataObj();

    })
    .then(() => {

        // letterFinder(dataFromFile, alphabet);


        console.log(orderedData);
        console.log(dataFromFile[199634]);
    });


function fillDataObj() {
    orderedData[dataFromFile[0]] = dataFromFile.slice(0, 36);

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
    let size = 1000; //размер подмассива
    for (let i = 0; i < Math.ceil(arrSortetByLetter.length / size); i++) {

        dividedArr[i] = {
            words: arrSortetByLetter.slice((i * size), (i * size) + size),
            title: arrSortetByLetter[i * size],
            indexOfTitle: dataFromFile.indexOf(arrSortetByLetter[i * size]),
        };
    }

    return dividedArr;
}

//////////// input handler
window.addEventListener("load", () => {
    document.getElementById("submit_data").addEventListener("click", onSubmit, false);
});

let onSubmit = function (event) {
    event.preventDefault();
    let inputValue = document.querySelector("#input").value.trim().toString();
    let output_data = document.querySelector("#output>p");
    output_data.innerHTML = finder(dataFromFile, inputValue);


};

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
    let result = `1: word "${arr[index]}" found in "${index}" row. Similar words: `;
    for (let j = 1; j <= 9; j++) {
        if (arr[index + j]) {
            result += `<br> ${j + 1}: word  "${arr[index + j]}" in "${index + j}"`;
        }
    }
    return result;
}


// function letterFinder(dataArr, ruleArr) {
//     let i = 0;
//     let letter = 0;
//     while (i < dataArr.length) {
//
//         if (dataArr[i][0].toLowerCase() === ruleArr[letter]) {
//             orderedDataString[letter] = {
//                 words: dataArr[i],
//                 index: i,
//             };
//             letter++;
//         }
//
//         i++;
//     }
// }

