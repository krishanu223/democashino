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
function timmer() {




    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;

    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };

    const TIME_LIMIT = 60;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;
    console.log(remainingPathColor)
    document.getElementById("app_timmer").innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
    </div>
    `;

    startTimer();

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1
            console.log("Time passed", timePassed)
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const {
            alert,
            warning,
            info
        } = COLOR_CODES;
        console.log(timeLeft, alert.threshold)
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }
}