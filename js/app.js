document.addEventListener("DOMContentLoaded", function() {
    var btnStart = document.querySelector(".start");
    var btnStop = document.querySelector(".stop");
    var btnClear = document.querySelector(".clear");
    var btnClearList = document.querySelector(".clear-list");
    var timeStart = document.querySelector(".time-start");
    var timeStop = document.querySelector(".time-stop");
    var breakTime = document.querySelector(".break-time");
    var listOfBreaks = document.querySelector(".list-of-breaks");
    var result = document.querySelector(".result");
    var defautText = document.querySelector(".default-text");
    var coffeeSteams = document.querySelector(".coffee-steams");
    var coffee= document.querySelector(".coffee");


    var currentDate = new Date();
    var textTime;
    var timer;
    var counter = 0;
    var timeOn = false;
    var timeOff = true;
    var sum = 0;


    //actual-time
    (function() {
    function leadingZero(i) {
        return (i < 10) ? "0" + i : i;
    }

    function showTextTime() {
        var textTime = leadingZero(new Date().getHours()) + ":" + leadingZero(new Date().getMinutes()) + ":" + leadingZero(new Date().getSeconds());
        document.querySelector(".actual-time").innerHTML = textTime;

        setTimeout(function() {
            showTextTime()
        }, 1000);
    }

    showTextTime();
})();

    //stopper
    function countBreakTime() {
        var minutesDozens = 0;
        var minutesUnity = 0;
        var secondsDozens = 0;
        var secondsUnity = 0;

        timer = setInterval(function() {
            secondsUnity++;
            if(secondsUnity > 9) {
                secondsUnity = 0;
                secondsDozens++;
                if(secondsDozens > 5) {
                    secondsDozens = 0;
                    minutesUnity++;
                    if(minutesUnity > 9) {
                        minutesUnity = 0;
                        minutesDozens++;
                    }
                }
            }
            breakTime.innerText = "" + minutesDozens + minutesUnity + "." + secondsDozens + secondsUnity;
        }, 1000);
    }


    btnStart.addEventListener("click", function() {
        timeOn = !timeOn;

        if(timeOn === true){
            timeStart.classList.remove("unactive");
            timeStart.innerText = new Date().getHours() + ":" + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();

            countBreakTime()
            coffeeSteams.classList.remove("unactive");
            coffee.classList.add("coffee-content-active");

        } else {
            clearInterval(timer);
            coffeeSteams.classList.add("unactive");
            coffee.classList.remove("coffee-content-active");
        }
    });

    btnStop.addEventListener("click", function() {
        timeOn = !timeOn;

        if(timeOn === false) {
            timeStop.classList.remove("unactive");
            timeStop.innerText = new Date().getHours() + ":" + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();

            clearInterval(timer);
            coffeeSteams.classList.add("unactive");
            coffee.classList.remove("coffee-content-active");
            sum += Number(breakTime.innerText);

            counter++;
            var elemOfList = document.createElement("li");
            elemOfList.innerText = "Break " + counter + " - total time: " + breakTime.innerText + " (" + timeStart.innerText + " - " + timeStop.innerText + " )";
            listOfBreaks.appendChild(elemOfList);
            result.innerHTML = "You didn't work <span>" +sum.toFixed(2) + "</span> min today !";

            if(listOfBreaks.children[0].innerText === "Your list is empty!") {
                listOfBreaks.removeChild(defautText);
            }
        }
    })

    btnClear.addEventListener("click", function() {
        clearInterval(timer);
        coffeeSteams.classList.add("unactive");
        coffee.classList.remove("coffee-content-active");
        breakTime.innerText = "00.00";
        timeStart.classList.add("unactive");
        timeStop.classList.add("unactive");
    })

    btnClearList.addEventListener("click", function() {
        var	toDelete = listOfBreaks.children;

        if(toDelete[0].inneText !== "Your list is empty!") {
            for(var i=(toDelete.length-1); i>=0; i--) {
                listOfBreaks.removeChild(toDelete[i]);
            }
            listOfBreaks.appendChild(defautText);
            result.innerText = "You work all day!";
            counter = 0;
            sum = 0;
        }
    });


});
