function getChange(num){
    let changeBox = document.getElementById("change_box");
    let change = 0;
    if(num >= 10){
        change = 10;
    } else if(num >= 5){
        change = 5;
    } else if(num >= 2){
        change = 2;
    } else if(num >= 1){
        change = 1;
    }
    if(change > 0){
        console.log(change);
        let img = document.createElement("img");
        img.src = `img/${change}rub.png`;
        img.width = 100;
        img.style.position = "absolute";
        img.style.left = Math.round(Math.random() * (changeBox.clientWidth - img.width)) + "px";
        img.style.top = Math.round(Math.random() * (changeBox.clientHeight - img.width)) + "px";
        img.onclick = function(){
            this.parentNode.removeChild(this);
        };
        changeBox.appendChild(img);
        getChange(num - change);
    }
}


function getChange2(num){
    let change = 0;
    do{
        if(num >= 10){
            change = 10;
        } else if(num >= 5){
            change = 5;
        } else if(num >= 2){
            change = 2;
        } else if(num >= 1){
            change = 1;
        }
        if(change > 0){
            console.log(change);
             num = num - change;
        }
    } while(num);
}
let d = document;
let moneyField = d.getElementById("moneyField");
let display = d.getElementById("display");
let bill_acc = d.getElementById("bill_acc");
let display_info = d.getElementById("display_info");
let display_balance = d.getElementById("display_balance");
let getChangeBtn = d.getElementById("get_change_btn");
getChangeBtn.addEventListener("click",function(){
    if(+moneyField.value){
        getChange(+moneyField.value);
        let audio = new Audio("audio/coins.mp3");
        audio.play();
        moneyField.value = 0;
        display_balance.innerHTML = "<i class='fas fa-money-bill'></i>Баланс : " + moneyField.value;
    }
},false);

function getCoffee(coffeName,price){
    let money = +moneyField.value;
    if(money >= price){
        let audio = new Audio("audio/coffee.mp3");
        //display_info.innerText = `Кофе ${coffeName} готов.`;
        let block_screen = document.getElementById("block_screen");
        block_screen.hidden = false;
        let coffee_progress = document.getElementById("coffee_progress");
        coffee_progress.hidden = false;
        display_info.innerText = `Кофе ${coffeName} готовится.`;
        let coffee_cup = document.getElementById("coffee_cup");
        coffee_cup.hidden = true;
        audio.play();
        let timerId = setInterval(function(){
            let progress_bar = document.querySelector("#coffee_progress .progress-bar");
            if(parseInt(progress_bar.style.width) >= 110){
                clearInterval(timerId);
                block_screen.hidden = true;
                coffee_progress.hidden = true;
                progress_bar.style.width = "0%";
                display_info.innerText = `Кофе ${coffeName} готов.`;
                audio.pause();
                coffee_cup.hidden = false;
            } else {
                progress_bar.style.width = parseInt(progress_bar.style.width) + 10 + "%";
            }
        },300);
        let change = money - price;
        moneyField.value = change;
    } else {
        display_info.innerText = "Недостаточно средств.";
    }
    display_balance.innerHTML = "<i class='fas fa-money-bill'></i>Баланс : " + moneyField.value;
}

let banknotes = document.querySelectorAll("[src$='rub.jpg']");
for(let i = 0;i < banknotes.length;i++){
    let banknote = banknotes[i];
    banknote.ondragstart = () => {return false;};

    
    banknote.onmousedown = function(e){
        let offX = e.offsetX,offY = e.offsetY;
        banknote.style.zIndex = 2;
        banknote.style.transform = "rotate(90deg)";
        function moveAt(e){
            let banknote_rect = banknote.getBoundingClientRect();
            let bill_acc_rect = bill_acc.getBoundingClientRect();
            if(banknote_rect.top > bill_acc_rect.top && banknote_rect.top < bill_acc_rect.bottom - bill_acc_rect.height / 2 && banknote_rect.left > bill_acc_rect.left && banknote_rect.left < bill_acc_rect.right){
                //banknote.hidden = true;
                banknote.accept = true;
                banknote.className = "accept";
            } else {
                //banknote.hidden = false;
                banknote.accept = false;
                banknote.className = "";
            }
            banknote.style.position = "absolute";
            banknote.style.left = e.clientX - banknote.clientWidth / 2 + "px";
            banknote.style.top = e.clientY - banknote.clientHeight / 2 + "px";
            /*
            banknote.style.left = e.clientX - offX + "px";
            banknote.style.top = e.clientY - offY + "px";
            */
        }
        banknote.moveAt = moveAt;
        document.addEventListener('mousemove',moveAt,false);
    };
    banknote.onmouseup = function(){
        banknote.style.zIndex = 1;
        document.removeEventListener('mousemove',banknote.moveAt,false);
        banknote.style.left = 0;
        banknote.style.top = 0;
        banknote.style.position = "static";
        banknote.style.transform = "none";
        if(banknote.accept){
            moneyField.value = +moneyField.value + +banknote.dataset.value;
            let display_balance = document.getElementById("display_balance");
            display_balance.innerHTML = "<i class='fas fa-money-bill'></i>Баланс : " + moneyField.value;
        }
        banknote.className = "";
    };
}
        