var a = 1;
var b = 2;
var c = 3;
let ids = [a,b,c];
let movement = "right";
let lastID = 0;
let randomNumber = 50;
let proceed = true;
let multiplesArray = [18, 37, 56, 75, 94, 113, 132, 151, 170, 189, 208, 227, 246, 265, 284, 303, 322]
let arithmeticProgression = [0, 19, 38, 57, 76, 95, 114, 133, 152, 171, 190, 209, 228, 247, 266, 285, 304, 323, 342]
let score = 0;
window.onload = function() {
    generateRandomNumber();
    
    var element = document.getElementById("new");
    for(let i = 0; i < 304 ; i++) {
        var para = document.createElement("div");
        para.className = "small_divs";
        para.id = i;
        element.appendChild(para);
        //document.getElementById(i).innerHTML = "<p>" + i + "</p>"
    }
    
    
    setIntervalFunc();

    document.addEventListener('keypress', (event) => {
        // var name = event.key;
        var code = event.code;
        //alert(code);
        if (code === "KeyS") {
            if(movement !== "up"){
                movement = "down";
            }
            
        } else if (code === 'KeyW'){
            if(movement !== "down"){
                movement = "up";
            }
        } else if (code === 'KeyD') {
            if(movement !== "left"){
                movement = "right";
            }
            
        } else if (code === 'KeyA'){
            if(movement !== "right"){
                movement = "left";
            }   
        }
      }, false);
}

function generateRandomNumber() {
    let val = Math.floor(Math.random() * 285);
    if (!ids.includes(val) && !val <= 18 && !multiplesArray.includes(val) && !arithmeticProgression.includes(val)) {
        randomNumber = val;
    }else{
        generateRandomNumber();
    }
}
function move(order) {
    for (let i=0; i < order.length; i++) {
        let id = order[i];
        if (i === (order.length - 1)){
            let firstElement = document.getElementById(id);
            var eye = document.createElement("div");
            let firstEyeId = i + "eye";
            eye.className = "eye";
            eye.id = firstEyeId;
            firstElement.appendChild(eye);
        }else{
            document.getElementById(id).innerHTML = "";
                
        }
        document.getElementById(id).style.backgroundColor = "red";
    }
}

function setIntervalFunc() {

    

        const interval = setInterval(function () {
        
                let headValue = ids[ids.length - 1];
                if (movement === "down" && headValue > 304){
                    proceed = false;
                }
                if (movement === "up" && headValue < 0){
                    proceed = false;
                }

                // let biteCheckArray = ids;
                // biteCheckArray.pop();
                // if (biteCheckArray.includes(ids[ids.length-1])){
                //     proceed = false;
                // }
                
                
                
                if (proceed){
                    if (ids[ids.length - 1] === randomNumber) {
                        let newIds = [lastID];
                        score += 7;
                        document.getElementById("score").innerHTML = score;
                        for(let i=0; i<ids.length; i++){
                            newIds.push(ids[i]);
                        }
                        ids = newIds;
                        generateRandomNumber();
                    }
                    if (!ids.includes(lastID)) {
                        document.getElementById(lastID).style.backgroundColor = "green";
                    }
                    lastID = ids[0];
                    move(ids);
                    let size = ids.length - 1;
                    let previousValue = ids[size];
                    if (movement === "down") {
                        ids[size] += 19;
                    }else if (movement === "up") {
                        ids[size] -= 19;
                    }else if (movement === "right") {
                        ids[size] += 1;
                    }else if (movement === "left") {
                        ids[size] -= 1; 
                    }
            
                    for (let i=size-1; i >= 0; i--){
                        let temp = ids[i];
                        ids[i] = previousValue;
                        previousValue = temp;
                    }
            
                    document.getElementById(randomNumber).style.backgroundColor = "yellow";

                    if (movement === "left" && arithmeticProgression.includes(ids[size] + 1)){
                        console.log("headValue",headValue);
                        proceed = false;
                    }
                    if (movement === "right" && multiplesArray.includes(ids[size] - 1)){
                        proceed = false;
                    }

                    let biteCheckArray = [];
                    for(let i=0; i < ids.length - 1; i++){
                        biteCheckArray.push(ids[i]);
                    }
                    
                    console.log("biteCheckArray", biteCheckArray);
                    console.log("ids", ids);
                    if (biteCheckArray.includes(ids[ids.length-1])){
                        proceed = false;
                    }
                }else{
                    alert("Game over. Your score: " + score + ". Click ok to try again.");
                    clearInterval(interval);
                    //reset();
                    location.reload();
                    return false;
                }
                
            
    
        },100);

    
}


function reset(){
    for(let i = 0; i<ids.length; i++){
        if (i === 0){
            document.getElementById(randomNumber).style.backgroundColor = "green";
        } 
        
        if (movement == "left") {
            document.getElementById(ids[i]+1).innerHTML = "";
            document.getElementById(ids[i]+1).style.backgroundColor = "green";     
        }else if (movement == "right"){   
            document.getElementById(ids[i] - 1).innerHTML = "";
            document.getElementById(ids[i] - 1).style.backgroundColor = "green"; 
        }else if (movement == "down"){
            
            document.getElementById(ids[i] - 19).innerHTML = "";
            document.getElementById(ids[i] - 19).style.backgroundColor = "green"; 
        }else if (movement == "up"){
            document.getElementById(ids[i] + 19).innerHTML = "";
            document.getElementById(ids[i] + 19).style.backgroundColor = "green"; 
        }
    }
    
    
    generateRandomNumber();
    ids = [a,b,c];
    movement = "right";
    lastID = 0;
    proceed = true;
    setIntervalFunc();
}
