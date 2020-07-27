let dataFromFile;
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        dataFromFile = data.split('\n');
    })
    .then(()=>{

        for(let i = 0; i<alphabet.length;i++){
            // let getA = ;
            GGG(fillByLetter(alphabet[i]), alphabet[i]);
        }



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

let orderedData = {};

function fillDataObj() {
    alphabet.map((value, index) => {
        orderedData[alphabet[index]] = value;
    })
};

fillDataObj();


function fillByLetter(letter) {
    let arr = [];
    dataFromFile.filter(value => value[0].toLowerCase() === letter ?
        // arr.push(dataFromFile.indexOf(value))
        arr.push(value)
        : false
    );
    return arr;
};



function GGG(arr, letter) {
    orderedData[letter]={};
    let size = 1000; //размер подмассива
    for (let i = 0; i < Math.ceil(arr.length / size); i++) {
        orderedData[letter][i] = arr.slice((i * size), (i * size) + size);



    }

}

console.log(orderedData);
