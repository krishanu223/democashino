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
const apiUrl_time = 'http://103.162.120.115/api/time.aspx?gameid=M01&requestkey=123456'; // 
let Time_data;
let leftTime;
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
        selection_byid(res1, res2)
    }, 4000);
    console.log(RotatedVal2);
    console.log(RotatedVal)
}

function startWheel() {
    document.getElementById("outerDiv").style.transform = `rotate(${0}deg)`;
    document.getElementById("innerDiv").style.transform = `rotate(${0}deg)`;
    document.getElementById("outerDiv").style.transition = "0s";
    document.getElementById("innerDiv").style.transition = "0s"
    setTimeout(() => {
        rotateDiv(getRandomCard(), getRandomCard2())
    }, 10)


}



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
    console.log(Time_data);

}





window.onload = function() {

    setInterval(fetchData, 1000);

    setInterval(() => {
        degupdate(leftTime)
    }, 1000);
    setInterval(() => {
        startWheelatTime(leftTime)
    }, 1000)

};





//////////////////////////////////// Timer ////////////////////////////////////


let dial = document.querySelector('.dial2');
let Time = document.querySelector('.Time_display')
let deg = 0;
let Tieflag = false;
let mainTime = 300;


function degupdate(Time10) {
    deg = (mainTime - Time10) * 1.22;
    dial.style.backgroundImage = `conic-gradient(rgba(0,255,0,0.6) ${deg}deg, rgba(0,0,0,0) 0deg )`
    Time.innerHTML = Time10;
    if ((300 - Time10) == 300) {
        console.log("5 min");
        deg = 0;

    }

}



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
        stopBlinking();
        let card_rebon = check_cardres.querySelector(".card_rebon");
        let card_rebon2 = check_cardres.querySelector(".card_rebon2")
        card_rebon.style.display = "block";
        card_rebon2.style.display = "none"

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

function convertToDate(timeStr) {
    let today = new Date(); // Get today's date
    let [time, modifier] = timeStr.split(" "); // Split time & AM/PM
    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, seconds);
}

/////////////////////////////////////   featching Datetime  ///////////////////////////////

function fetchData() {
    fetch(apiUrl_time)
        .then(response => response.json())
        .then(data => {

            let time = data[0];
            Time_data = time;

            let dateTime = time.NEXTDRAW;
            let extractedDate = dateTime.match(/^\d{2}-[A-Za-z]{3}-\d{2}/)[0];
            Date_time.innerHTML = extractedDate + " " + time.TARMINALTIME;
            let extractedTime = dateTime.match(/\d{1,2}:\d{2}:\d{2} [APM]{2}/)[0];
            Draw_time.innerHTML = "Draw_Time" + ":" + extractedTime;
            let diffInSeconds = Math.abs((convertToDate(extractedTime) - convertToDate(time.TARMINALTIME)) / 1000);
            leftTime = diffInSeconds


        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Date_time.innerHTML = "--:---:----" + "--:--:--";
            Draw_time.innerHTML = "Draw_Time" + ":" + "--:--:--"
        });
}

// Set an interval to call fetchData every 100 milliseconds


///////////////////////////////////////   Time To rotated while  ///////////////////////////


function startWheelatTime(lefttime) {

    if (lefttime == 0) {
        startWheel()
    }


}