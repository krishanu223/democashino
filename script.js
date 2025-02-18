let notice = document.querySelector('.notice');

let coins = document.querySelectorAll('.coin');
let sre = window.innerWidth;
let Bet = document.querySelector('.bet_button');
let Box = document.querySelectorAll('.bet_amount_Input');
let Blance = document.querySelector('.Blance');
let pprt = document.querySelector('.playing_table')

let clear = document.querySelector('.clear_button');
let Date_time = document.querySelector('.Date_time');
let Draw_time = document.querySelector('.Draw_time');
let repeat = document.querySelector('.repeat_button');
let card_image1 = document.querySelectorAll('.td2');
let circle = document.querySelectorAll('.circle');
let print = document.querySelector('.print');
let close_p = document.querySelector('#cross_p');
let cross_select = document.querySelector('#close_select');
//let redrebon = document.querySelector('.card_rebon');
//let greenrebon = document.querySelector('.card_rebon2')
const apiUrl_time = 'http://103.162.120.115/api/time.aspx?gameid=M01&requestkey=123456'; // 
let Time_data;
let leftTime;



let bqr = 5000;

print.addEventListener("click", () => {
    getPrinters()
    cross_select.style.display = "block"

})
cross_p.addEventListener("click", () => {
    cross_select.style.display = "none"
})


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


function coincheck2(box) {
    if (box.innerHTML != "Play") {
        let cost = selectedCoinValue;
        let valu = Number(box.innerHTML);
        console.log(box.innerHTML)
        console.log("value", valu);
        console.log("c", cost)
        if (valu <= cost) {
            bqr += valu;
        } else {
            bqr += cost;
        }

        Blance.innerHTML = "Blance :  " + bqr;
    }


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

function updateBox2(box) {
    if (selectedCoinValue !== null) {
        let currentValue = parseInt(box.dataset.value, 10) || 0;
        let newValue = Math.min(currentValue - selectedCoinValue, 10000); // Cap at 5
        if (newValue > 0) {
            box.dataset.value = newValue;
            box.style.backgroundImage = coinImages[newValue];
            box.textContent = newValue;
        } else {
            box.dataset.value = 0;
            box.style.backgroundImage = "none";
            box.textContent = "Play";
        }

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

let bethistory = [];
/////////////////////////////////////   Roation ///////////////////////////////////////////////
function rotateDiv(res1, res2) {
    let RotatedVal = 0;
    let RotatedVal2 = 0;
    let result = res1;
    let result2 = res2;
    bethistory.push({ result, result2 })

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

    document.getElementById("outerDiv").style.transition = "3s";
    document.getElementById("innerDiv").style.transition = "3s"
    document.getElementById("outerDiv").style.transform = `rotate(${RotatedVal}deg)`;
    document.getElementById("innerDiv").style.transform = `rotate(${RotatedVal2}deg)`;

    setTimeout(() => {
        selection_byid(res1, res2)
    }, 4000);

}

function startWheel() {
    document.getElementById("outerDiv").style.transform = `rotate(${0}deg)`;
    document.getElementById("innerDiv").style.transform = `rotate(${0}deg)`;
    document.getElementById("outerDiv").style.transition = "0s";
    document.getElementById("innerDiv").style.transition = "0s"

    setTimeout(() => {

        rotateDiv(getRandomCard(), getRandomCard2())
    }, 1000)


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


}

window.onload = function () {

    document.querySelectorAll(".box").forEach((box) => {
        box.addEventListener("contextmenu", (e) => {
            coincheck2(box);
            updateBox2(box);
            e.preventDefault();
        })

    });

    setInterval(fetchData, 1000);
    setInterval(() => {
        degupdate(leftTime);
    }, 1000);


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
let DrawTi = null;

function fetchData() {
    fetch(apiUrl_time)
        .then(response => response.json())
        .then(data => {
            let time = data[0];
            Time_data = time;
            DrawTi = time.NEXTDRAW;
            let dateTime = time.NEXTDRAW;
            let extractedDate = dateTime.match(/^\d{2}-[A-Za-z]{3}-\d{2}/)[0];
            Date_time.innerHTML = extractedDate + " " + time.TARMINALTIME;
            let extractedTime = dateTime.match(/\d{1,2}:\d{2}:\d{2} [APM]{2}/)[0];
            Draw_time.innerHTML = "Draw_Time" + ":" + extractedTime;
            const timeToSec = (t) => t.split(":").reduce((a, v) => a * 60 + +v, 0);
            let cleanTime = extractedTime.split(" ")[0];
            let cleanTime2 = time.TARMINALTIME.split(" ")[0];
            let diffInSeconds = Number(timeToSec(`${cleanTime}`)) - Number(timeToSec(`${cleanTime2}`));

            if (diffInSeconds > 0) {
                leftTime = diffInSeconds
            }
            //  console.log("defsec", diffInSeconds)
            if (diffInSeconds == 10 || diffInSeconds == 11) {
                let rebn = document.querySelectorAll('.card_rebon');
                rebn.forEach((ele) => {
                    console.log("i am red block")
                    ele.style.display = "block"
                })
                let rebn2 = document.querySelectorAll('.card_rebon2');
                rebn2.forEach((ele) => {
                    console.log("i am blue block")
                    ele.style.display = "none"
                })
            }
            if (diffInSeconds <= 10) {
                stopBlinking();
                circle.forEach((circle) => {
                    circle.innerHTML = " "
                })
                let blinkingCard = document.querySelector(".card.blink");
                if (blinkingCard) {

                    blinkingCard.classList.remove("blink");
                }
                Box.forEach((Box) => {
                    Box.dataset.value = 0;
                    Box.style.backgroundImage = "none";
                    Box.innerHTML = "";
                })
            } else if (diffInSeconds > 295) {
                winner_bet()
            } else if (diffInSeconds > 287) {
                Box.forEach((Box) => {
                    Box.innerHTML = "Play";
                })
                circle.forEach((circle) => {
                    circle.innerHTML = `<span>Play</span>`
                })
                Round_history = [];
                console.log("i am bug of code")

            }
            if (diffInSeconds == 1) {
                startWheel();
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Date_time.innerHTML = "--:---:----" + "--:--:--";
            Draw_time.innerHTML = "Draw_Time" + ":" + "--:--:--"
        });
}

// Set an interval to call fetchData every 100 milliseconds


///////////////////////////////////////   Time To rotated while  ///////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////  Selected item /////////////////////////////////////////
let item = [];
let Current_bet = [];
let terminal = "15263458";
let Total_Point = 0;
let Round_history = [];

function selected_house() {

    for (let i = 0; i < 12; i++) {
        if (Box[i].innerHTML != "Play") {
            let j = Box[i].dataset;
            Total_Point += Number(Box[i].innerHTML)
            console.log(Total_Point)
            if (j.index == 0) {
                item.push(["JH    ", j.value]);
            } else if (j.index == 1) {
                item.push(["JS    ", j.value]);
            } else if (j.index == 2) {
                item.push(["JD    ", j.value]);
            } else if (j.index == 3) {
                item.push(["JC    ", j.value]);
            } else if (j.index == 4) {
                item.push(["QH    ", j.value]);
            } else if (j.index == 5) {
                item.push(["QS    ", j.value]);
            } else if (j.index == 6) {
                item.push(["QD    ", j.value]);
            } else if (j.index == 7) {
                item.push(["QC    ", j.value]);
            } else if (j.index == 8) {
                item.push(["KH    ", j.value]);
            } else if (j.index == 9) {
                item.push(["KS    ", j.value]);
            } else if (j.index == 10) {
                item.push(["KD    ", j.value]);
            } else if (j.index == 11) {
                item.push(["KC    ", j.value]);
            }
        }
    }
}

function generateOrderID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterPart = letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)];

    const numberPart = Math.floor(100000 + Math.random() * 900000).toString().slice(0, 4);

    return letterPart + numberPart;
}

function generateGameID() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % 1000000).toString().padStart(6, "0");
}

function getCurrentTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function betRecipe(gameName, terminal, gameID, ticketID, drawTime, ticketTime, totalPoint, items) {
    let gameRecord = {
        gameName: gameName,
        terminal: terminal,
        gameID: gameID,
        ticketID: ticketID,
        drawTime: drawTime,
        ticketTime: ticketTime,
        totalPoint: totalPoint,
        items: items.map(([card, point]) => ({ card, point })) // Convert item array to objects
    };
    Current_bet.push(gameRecord);
    Round_history.push(gameRecord)
}

// ✅ Print to Thermal Printer


// ✅ Save as PDF (If No Printer Found)
function saveAsPDF() {
    let content = `
        <html><head><title>Game Records</title></head><body>
        <h2>Game Records</h2>`;

    Current_bet.forEach(record => {
        content += `
            <p><strong>Game Name:</strong> ${record.gameName}</p>
            <p><strong>Terminal:</strong> ${record.terminal}</p>
            <p><strong>Game ID:</strong> ${record.gameID}</p>
            <p><strong>Ticket ID:</strong> ${record.ticketID}</p>
            <p><strong>Draw Time:</strong> ${record.drawTime}</p>
            <p><strong>Ticket Time:</strong> ${record.ticketTime}</p>
            <p><strong>Total Point:</strong> ${record.totalPoint}</p>
            <h3>Items:</h3><ul>`;

        record.items.forEach(item => {
            content += `<li>${item.card} - ${item.point}</li>`;
        });

        content += `</ul><hr>`;
    });

    content += `</body></html>`;

    let pdfWindow = window.open('', '', 'width=800,height=600');
    pdfWindow.document.write(content);
    pdfWindow.document.close();
    pdfWindow.print(); // Opens Save as PDF dialog
}


Bet.addEventListener('click', () => {
    selected_house();
    betRecipe("JETTO JOKER", terminal, generateGameID(), generateOrderID(), DrawTi, getCurrentTime(), Total_Point, item)
    printDirect()
    Box.forEach((Box) => {
        Box.dataset.value = 0;
        Box.style.backgroundImage = "none";
        Box.innerHTML = "Play"

    })
    Current_bet = [];
    item = [];
    Total_Point = 0;
})



function getPrinters() {
    JSPM.JSPrintManager.autoFindPrinters = true;
    JSPM.JSPrintManager.start();
    console.log("call printdirect")
    JSPM.JSPrintManager.WS.onStatusChanged = function () {
        if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
            JSPM.JSPrintManager.getPrinters().then(function (printers) {
                let printerSelect = document.getElementById("printerSelect");
                printerSelect.innerHTML = "";
                printers.forEach(function (printer) {
                    let option = document.createElement("option");
                    option.text = printer;
                    printerSelect.add(option);
                });
            });
        }
    };
}



function printDirect() {
    if (JSPM.JSPrintManager.websocket_status != JSPM.WSStatus.Open) {
        alert("JSPrintManager is not connected!");

        return;
    }

    let selectedPrinter = document.getElementById("printerSelect").value;
    if (!selectedPrinter) {
        alert("No printer selected!");
        return;
    }

    let printJob = new JSPM.ClientPrintJob();
    printJob.clientPrinter = new JSPM.InstalledPrinter(selectedPrinter);

    let esc = '\x1B'; // ESC/POS commands for thermal printers
    let data = esc + "@\n";
    Current_bet.forEach(record => {
        data += "\x1B\x45\x01"; // Bold Text ON
        data += `Game Name: ${record.gameName}\n`;
        data += "\x1B\x45\x00"; // Bold Text OFF
        data += `Terminal: ${record.terminal}\n`;
        data += `Game ID: ${record.gameID}\n`;
        data += `Ticket ID: ${record.ticketID}\n`;
        data += `Draw Time: ${record.drawTime}\n`;
        data += `Ticket Time: ${record.ticketTime}\n`;
        data += `Total Point: ${record.totalPoint}\n`;
        data += "-----------------------------\n";
        data += "Items:\n";

        record.items.forEach(item => {
            data += `${item.card} - ${item.point}\n`;
        });

        data += "-----------------------------\n";
    });
    data += esc + "d\x03"; // Feed 3 lines
    data += esc + "m"; // Cut paper

    printJob.printerCommands = data;
    printJob.sendToClient();
}

////////////////////////////    Cheacking   winnner  /////////////////////////////////////

function winner_bet() {
    let lastGame = bethistory.at(-1);
    //   console.log(lastGame);
    Round_history.forEach(element => {
        //   console.log(element.items)
    });
}

let dy = document.querySelectorAll('.box');
for (let i = 0; i < 12; i++) {
    dy[i].addEventListener("contextmanu", (e) => {
        console.log("clickme box");
        e.preventDefault();
    })

}