                $(document).ready(function(){
               document.getElementById("txtinput").value = "";
               document.getElementById("txtresult").value = "";
               document.getElementById("RandomChar").value = "";
                generateNumber();
                getData();
                updateResultTable();
                });

    $(window).bind("beforeunload", function(){
        saveTime(); 
});
               


    $(window).bind("onbeforeunload", function(){
        return "Are you sure you want to close the window?";
});





                var totalAttempts ;
                var totalCorrect ;
                var totalIncorrect ;
                var hours;
                var minutes;
                var seconds;

                if(totalAttempts == undefined){
                    totalAttempts = 0;
                }
                if(totalCorrect == undefined){
                    totalCorrect = 0;
                }
                if(totalIncorrect == undefined){
                    totalIncorrect = 0;
                }
                if(hours == undefined){
                    hours = 0;
                }
                if(minutes == undefined){
                    minutes = 0;
                }
                if(seconds == undefined){
                    seconds = 0;
                }


            function Verify_number() {
                console.log(totalAttempts);
                if(document.getElementById("txtinput").value == ""){
                    document.getElementById("txtinput").required = true;
                    return;
                }else if(document.getElementById("txtinput").value == document.getElementById("RandomChar").value){
                    document.getElementById("txtresult").value = "Correct!";
                    totalCorrect = totalCorrect + 1;
                    console.log("Correct: "+totalCorrect);
                } else{
                    document.getElementById("txtresult").value = "Incorrect!";
                    totalIncorrect = totalIncorrect + 1;
                    console.log("Incorrect: "+ totalIncorrect);
                }
                totalAttempts = totalAttempts + 1;
                console.log("Attempts: "+totalAttempts);
                updateResultTable();
                generateNumber();
                document.getElementById("txtinput").value = "";
                saveData();

               }       

            function generateNumber() {
                var random = Math.floor(Math.random() * 90000) + 10000;
                document.getElementById("RandomChar").value = random;
                
            }

                function tableVisibility(flag){
                if (flag == 0){// 0 represent Show
                document.getElementById("resultTable").style.display="table";
                document.getElementById("viewResult").style.visibility="hidden";
                document.getElementById("hideResult").style.visibility="visible";
                }else if(flag == 1){// 1 represent Hide
                document.getElementById("resultTable").style.display="none";
                document.getElementById("hideResult").style.visibility="hidden";
                document.getElementById("viewResult").style.visibility="visible";
                }              
            }

            function updateResultTable(){
                document.getElementById('resultTable').rows[1].cells[1].innerHTML = totalAttempts;
                document.getElementById('resultTable').rows[2].cells[1].innerHTML = totalCorrect;
                document.getElementById('resultTable').rows[3].cells[1].innerHTML = totalIncorrect;
            }

            function saveData() {
                dataObj = { "totalAttempts":totalAttempts, "totalCorrect":totalCorrect, "totalIncorrect":totalIncorrect};
                data1JSON = JSON.stringify(dataObj);
                localStorage.setItem("dataJSON", data1JSON);
            }

            function getData() {
               text = localStorage.getItem("dataJSON");
                obj = JSON.parse(text);
                if(obj == null){
                    console.log('Got NULL');
                } else{
                    console.log('Got Data');
                   totalAttempts = obj.totalAttempts; 
                   totalCorrect = obj.totalCorrect;
                   totalIncorrect= obj.totalIncorrect;
                }
            }
            function saveTime() {
                timeObj = { "hours":hours, "minutes":minutes, "seconds":seconds};
                timeJSON = JSON.stringify(timeObj);
                localStorage.setItem("timeJSON", timeJSON);
            }

            function flushData(){                
                localStorage.removeItem("timeJSON");
                localStorage.removeItem("dataJSON");
                
            }

            function expire() {
            	document.getElementById("resultTable").style.display="table";
                document.getElementById("viewResult").style.visibility="hidden";
                document.getElementById("hideResult").style.visibility="hidden";
                document.getElementById("submitButton").style.visibility="hidden";                
            }

            function logOut() {
                flushData();
                window.location.href = "index.html";
            }



    var countDownDate = new Date().getTime() + 5400000;

    //console.log("countDownDate: " +  countDownDate);
    var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();
    //console.log("Current Time: " + now);
    //var countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML =  hours + "h "
    + minutes + "m " + seconds + "s ";


     // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
        expire();
    }
    }, 1000);
            