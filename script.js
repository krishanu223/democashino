let notice = document.querySelector('.notice')
let sre = window.innerWidth
console.log(sre)
if (window.window.innerWidth < 1000) {
    notice.style.display = "flex"
}
let selectedCoinValue = null;
let selectedCoinImage = null;

// Add event listeners to the coins
document.querySelectorAll(".coin").forEach((coin) => {
    coin.addEventListener("click", () => {
        selectedCoinValue = parseInt(coin.dataset.value, 10);
        selectedCoinImage = coin.style.backgroundImage; // Store the selected coin's image URL
        console.log(`Selected Coin Value: ${selectedCoinValue}`);
    });
});

// Add event listeners to the divs
document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", () => {
        if (selectedCoinValue !== null && selectedCoinImage !== null) {
            if (box.style.backgroundImage === selectedCoinImage) {
                // Increase value if the selected coin image already exists in the div
                const currentValue = parseInt(box.textContent.replace('Value: ', ''), 10) || 0;
                box.textContent = ` ${currentValue + selectedCoinValue}`;
            } else {
                // Set the div with the selected coin's image and value
                box.style.backgroundImage = selectedCoinImage;
                box.textContent = ` ${selectedCoinValue}`;
            }
        } else {
            alert("Please select a coin first!");
        }
    });
});

// Row All button functionality
document.querySelectorAll(".row-button").forEach((button) => {
    button.addEventListener("click", () => {
        const rowIndex = parseInt(button.dataset.row, 10);
        const startIndex = rowIndex * 4;
        const rowDivs = document.querySelectorAll(".box");

        if (selectedCoinImage !== null) {
            for (let i = startIndex; i < startIndex + 4; i++) {
                const div = rowDivs[i];
                if (div.style.backgroundImage === selectedCoinImage) {
                    // Increase value if the selected coin image already exists in the div
                    const currentValue = parseInt(div.textContent.replace('Value: ', ''), 10) || 0;
                    div.textContent = ` ${currentValue + selectedCoinValue}`;
                } else {
                    // Set the div with the selected coin's image and value
                    div.style.backgroundImage = selectedCoinImage;
                    div.textContent = ` ${selectedCoinValue}`;
                }
            }
        } else {
            alert("Please select a coin first!");
        }
    });
});

// Column All button functionality
document.querySelectorAll(".col-button").forEach((button) => {
    button.addEventListener("click", () => {
        const colIndex = parseInt(button.dataset.col, 10);
        const colDivs = document.querySelectorAll(".box");

        if (selectedCoinImage !== null) {
            for (let i = colIndex; i < colDivs.length; i += 4) {
                const div = colDivs[i];
                if (div.style.backgroundImage === selectedCoinImage) {
                    // Increase value if the selected coin image already exists in the div
                    const currentValue = parseInt(div.textContent.replace('Value: ', ''), 10) || 0;
                    div.textContent = ` ${currentValue + selectedCoinValue}`;
                } else {
                    // Set the div with the selected coin's image and value
                    div.style.backgroundImage = selectedCoinImage;
                    div.textContent = ` ${selectedCoinValue}`;
                }
            }
        } else {
            alert("Please select a coin first!");
        }
    });
});

// Get Values button functionality


/////////////////////////////////////   Roation ///////////////////////////////////////////////
function rotateDiv() {
    document.getElementById("outerDiv").classList.toggle("rotate");
    document.getElementById("innerDiv").classList.toggle("rotate2");
}



window.onload = function() {

    setTimeout(() => {
        rotateDiv()
        setInterval(rotateDiv, 60000); // Then repeat every 1 second
    }, 60000);

    setTimeout(() => {
        timmer()
        setInterval(timmer, 20000); // Then repeat every 1 second
    });
};





///////////////////////////////////// Timmer //////////////////////////////////////////////////