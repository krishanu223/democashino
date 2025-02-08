let notice = document.querySelector('.notice');
let coins = document.querySelectorAll('.coin');
let sre = window.innerWidth;
let Bet = document.querySelector('.bet_button');
let Box = document.querySelectorAll('.bet_amount_Input');
let Blance = document.querySelector('.Blance');
let clear = document.querySelector('.clear_button');
let Date_time = document.querySelector('.Date_time');
let Draw_time = document.querySelector('.Draw_time');
let repeat = document.querySelector('.repeat_button');
let card_image1 = document.querySelectorAll('.td2');
//let redrebon = document.querySelector('.card_rebon');
//let greenrebon = document.querySelector('.card_rebon2')


console.log(sre)
if (window.window.innerWidth < 1000) {
    notice.style.display = "flex"
}
let bqr = 5000;
//let blinkInterval = null;


//let style = window.getComputedStyle(redrebon);
//let display = style.getPropertyValue("display");

//blinkInterval = setInterval(() => {
//    if (display == "block") {
//        redrebon.style.display = "none"
//        greenrebon.style.display = "block"
//    } else {
//        redrebon.style.display = "block"
//        greenrebon.style.display = "none"
//    }
//}, 1000); // Switch every 1 second








//card_image.forEach((card) => {
//    setTimeout(() => {
//        card.classList.add("blink");
//    }, 1000);


//})


///////////////////////////////////////   lighting //////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////


Blance.innerHTML = "Blance :  " + bqr;

clear.addEventListener("click", () => {
    Box.forEach((Box) => {
        Box.dataset.value = 0;
        Box.style.backgroundImage = "none";
        Box.innerHTML = "Play"

    })
})

let yav = 0;

let after_value = 0;







//////////////////////////////////////   Date and time /////////////////////////////





///////////////////////////// Coin color //////////////////////////////////////////

let selectedCoinValue = null;
let selectedCoinImage = null;





// Coin selection logic
document.querySelectorAll(".coin ").forEach((coin) => {
    coin.addEventListener("click", () => {
        selectedCoinValue = parseInt(coin.dataset.value, 10);
        selectedCoinImage = coin.style.backgroundImage;
        console.log(`Selected Coin: ${selectedCoinValue}`);

    });
});


///////////////////////////////   blance deducted ///////////////////////////////


function coincheck() {
    let cost = selectedCoinValue;
    if (cost > bqr) {
        alert("Not enough balance!");
        return;
    }
    bqr -= cost;
    Blance.innerHTML = "Blance :  " + bqr;




}


// Coin image map
const coinImages = {
    1: "url('./images/chip.png')",
    2: "url('./images/chip2.png')",
    5: "url('./images/chip3.png')",
    10: "url('./images/chip5.png')",
    50: "url('./images/chip6.png')",
    100: "url('./images/chip4.png')",
    500: "url('./images/chip7.png')",
    1000: "url('./images/chip4.png')",
};

// Function to update a box's value & image
function updateBox(box) {
    if (selectedCoinValue !== null) {
        let currentValue = parseInt(box.dataset.value, 10) || 0;
        let newValue = Math.min(currentValue + selectedCoinValue, 10000); // Cap at 5
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
        coincheck();
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
function rotateDiv(res1, res2) {
    let RotatedVal = 0;
    let RotatedVal2 = 0;
    let result = res1;
    let result2 = res2;
    console.log(res1, res2)
    if (result == "q") {
        RotatedVal = 1500
    } else if (result == "k") {
        RotatedVal = 1530
    } else if (result == "j") {
        RotatedVal = 1560
    }
    if (result2 == "d") {
        RotatedVal2 = -1500
    } else if (result2 == "c") {
        RotatedVal2 = -1530
    } else if (result2 == "h") {
        RotatedVal2 = -1560
    } else if (result2 == "s") {
        RotatedVal2 = -1590
    }
    console.log(RotatedVal2);
    console.log(RotatedVal)
    document.getElementById("outerDiv").style.transition = "3s";
    document.getElementById("innerDiv").style.transition = "3s"
    document.getElementById("outerDiv").style.transform = `rotate(${RotatedVal}deg)`;
    document.getElementById("innerDiv").style.transform = `rotate(${RotatedVal2}deg)`;
    setTimeout(() => {
        document.getElementById("outerDiv").style.transition = "0s";
        document.getElementById("innerDiv").style.transition = "0s"
        document.getElementById("outerDiv").style.transform = `rotate(${0}deg)`;
        document.getElementById("innerDiv").style.transform = `rotate(${0}deg)`;
        selection_byid(res1, res2)
    }, 7000);
    console.log(RotatedVal2);
    console.log(RotatedVal)
}

repeat.addEventListener("click", () => {
    rotateDiv(getRandomCard(), getRandomCard2())

})
/////////////////////////////////  random card selction //////////////////////////
function getRandomCard() {
    const cards = ["k", "j", "q"];
    return cards[Math.floor(Math.random() * cards.length)];
}

function getRandomCard2() {
    const cards = ["d", "h", "s", "c"];
    return cards[Math.floor(Math.random() * cards.length)];
}
////////////////////////////////////////////////////////////////////////////////
function Updatedate() {
    let Current_time = new Date().toLocaleString();
    Date_time.innerHTML = Current_time;
}


function DrawTime() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes() + 1;

    Draw_time.innerHTML = "Draw_Time" + ":" + hour + ":" + minute

}



window.onload = function () {
    setInterval(Updatedate, 1000);
    setInterval(DrawTime, 1000);
    setTimeout(() => {

        // Then repeat every 1 second
    }, 5000);






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

//////////////////////////////////    Wheel rotation  ///////////////////////////////////
let check_cardres;
let intervalId = null;

function selection_byid(resid, resid2) {


    console.log(check_cardres)
    //////////////////////////////////////   reset all div   /////////////////////////
    if (check_cardres) {
        let card_image = check_cardres.querySelector('.card');
        card_image.classList.remove('blink')
        stopBlinking()

    }



    let card_result = document.getElementById(`${resid + resid2}`);
    check_cardres = card_result;
    let card_image = card_result.querySelector('.card');
    card_image.classList.add("blink");
    let card_rebon = card_result.querySelector('.card_rebon');
    let card_rebon2 = card_result.querySelector('.card_rebon2');
    blinking_rebon(card_rebon, card_rebon2)
}


function blinking_rebon(redrebon, greenrebon) {
    setTimeout(() => {

        let isGreen = false; // A flag to alternate between green and red

        intervalId = setInterval(() => {
            if (isGreen) {
                redrebon.style.display = "none"
                greenrebon.style.display = "block";

            } else {
                redrebon.style.display = "block"
                greenrebon.style.display = "none"
            };

            isGreen = !isGreen;
        }, 500);
    }, 500);
}



// Function to stop blinking
function stopBlinking() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null; // Reset interval ID
    }
}