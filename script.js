let notice = document.querySelector('.notice');
let coins = document.querySelectorAll('.coin')
let sre = window.innerWidth;
let Bet = document.querySelector('.bet_button')
let Box = document.querySelectorAll('.bet_amount_Input')
let pn = document.querySelector('.points')
let clear = document.querySelector('.clear_button')
let Date_time = document.querySelector('.Date_time')
let Draw_time = document.querySelector('.Draw_time')
console.log(sre)
if (window.window.innerWidth < 1000) {
    notice.style.display = "flex"
}
let bqr = 5;
var y = 0;

pn.innerHTML = bqr;

clear.addEventListener("click", () => {
    Box.forEach((Box) => {
        Box.dataset.value = 0;
        Box.style.backgroundImage = "none";
        Box.innerHTML = "Play"

    })
})




Bet.addEventListener('click', () => {

        Box.forEach((Box) => {

            let x = Number(Box.innerHTML);
            y = x + y
        })
        if (y >= bqr) {
            alert("Blance are low")
            y = 0;
        } else {
            pn.innerHTML = bqr - y
            y = 0;
        }

    })
    //////////////////////////////////////   Date and time /////////////////////////////





///////////////////////////// Coin color //////////////////////////////////////////

let selectedCoinValue = null;
let selectedCoinImage = null;



// Coin selection logic
document.querySelectorAll(".coin").forEach((coin) => {
    coin.addEventListener("click", () => {
        selectedCoinValue = parseInt(coin.dataset.value, 10);
        selectedCoinImage = coin.style.backgroundImage;
        console.log(`Selected Coin: ${selectedCoinValue}`);
    });
});

// Coin image map
const coinImages = {
    1: "url('./images/chip.png')",
    2: "url('./images/chip2.png')",
    3: "url('./images/chip3.png')",
    4: "url('./images/chip5.png')",
    5: "url('./images/chip6.png')",
    6: "url('./images/chip4.png')",
    7: "url('./images/chip7.png')",
};

// Function to update a box's value & image
function updateBox(box) {
    if (selectedCoinValue !== null) {
        let currentValue = parseInt(box.dataset.value, 10) || 0;
        let newValue = Math.min(currentValue + selectedCoinValue, 500); // Cap at 5
        box.dataset.value = newValue;
        box.style.backgroundImage = coinImages[newValue];
        box.textContent = newValue;
    } else {
        alert("Please select a coin first!");
    }
}






// Click event for individual boxes
document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", () => {
        updateBox(box);
    })

});



// Row select button functionality
document.querySelectorAll(".row-button").forEach((button) => {
    button.addEventListener("click", () => {
        const rowIndex = parseInt(button.dataset.row, 10);
        const startIndex = rowIndex * 4;
        document.querySelectorAll(".box").forEach((box, index) => {
            if (index >= startIndex && index < startIndex + 4) {
                updateBox(box);
            }
        });
    });
});

// Column select button functionality
document.querySelectorAll(".col-button").forEach((button) => {
    button.addEventListener("click", () => {
        const colIndex = parseInt(button.dataset.col, 10);
        document.querySelectorAll(".box").forEach((box, index) => {
            if (index % 4 === colIndex) {
                updateBox(box);
            }
        });
    });
});



/////////////////////////////////////   Roation ///////////////////////////////////////////////
function rotateDiv() {
    document.getElementById("outerDiv").classList.toggle("rotate");
    document.getElementById("innerDiv").classList.toggle("rotate2");
}



function Updatedate() {
    let Current_time = new Date().toLocaleString();
    Date_time.innerHTML = Current_time;
}


function DrawTime() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes() + 1;

    Draw_time.innerHTML = "Draw_Time" + ":" + hour + ":" + minute

}


window.onload = function() {


    setInterval(Updatedate, 1000);
    setInterval(DrawTime, 1000);
    setTimeout(() => {
        rotateDiv()
        setInterval(rotateDiv, 60000); // Then repeat every 1 second
    }, 60000);

};





//////////////////////////////////// Timer ////////////////////////////////////


let dial = document.querySelector('.dial2');
let Time = document.querySelector('.Time_display')
let deg = 0;
let time = 60;
let second = 0;

function degupdate() {


    dial.style.backgroundImage = `conic-gradient(rgba(0,255,0,0.6) ${deg = deg + (360 / time)}deg, rgba(0,0,0,0) 0deg )`
    Time.innerHTML = second++;
    if (second == 60) {
        console.log("1 min");
        deg = 0;
        second = 0;
    }
}
setInterval(degupdate, 1000);

////////////////////////////////////////   coin event ////////////////////////////////////

coins.forEach(coin => {
    coin.addEventListener("click", () => {
        // Remove 'active' class from all buttons
        coins.forEach(c => c.classList.remove("active_coin"));
        coin.classList.add("active_coin");
    });
});



function closeWindow() {
    window.close(); // Works only if opened by `window.open()`
}