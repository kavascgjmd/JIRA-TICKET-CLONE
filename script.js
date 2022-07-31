let addbtn = document.querySelector(".add-btn");
let modcont = document.querySelector(".modl-cont");
let addFlag = false;
let pbar = document.querySelector(".p-bar");
let maincont  = document.querySelector(".main-cont");
let text = document.querySelector(".modl-cont > textarea");
let colors = ["lightpink" , "lightgreen", "lightblue", "black"];
let nowcolor = colors[colors.length-1];
let pcolorarr = document.querySelectorAll(".priority-color");
let barcolor = document.querySelectorAll(".color");
let ticketsArr = [];
let ticketsArr2= [];

function maketicket( uniqueNO, text){
    let nticket = document.createElement("div");
    nticket.setAttribute("class", "ticket");
    nticket.innerHTML = `
    <div class="p-bar ${nowcolor}"></div>
    <div class="t-sno">${uniqueNO}</div>
    <div class="ticket-textarea">${text}</div>
    <div class = "ticketlock"><i class="fa-solid fa-lock"></i>
    </div>

    `
    
    maincont.appendChild(nticket);
    ticketsArr.push({nowcolor, uniqueNO , text});
    localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
    let ticketlock = nticket.querySelector(".ticketlock > i");
    let textedi = nticket.querySelector(".ticket-textarea");
  
      handlelock(ticketlock , textedi, uniqueNO);
      handlebar(nticket , uniqueNO);
    nowcolor = colors[colors.length-1];
}

if(localStorage.getItem("jira_tickets")){
    ticketsArr2 = JSON.parse(localStorage.getItem("jira_tickets"));
    for(let i = 0; i<ticketsArr2.length; i++){
        
        nowcolor = ticketsArr2[i].nowcolor;
        maketicket(ticketsArr2[i].uniqueNO, ticketsArr2[i].text);
    }
    
}
for(let i = 0; i<pcolorarr.length; i++){
    pcolorarr[i].addEventListener("click", function(){
        for(let j = 0; j<pcolorarr.length; j++){
            pcolorarr[j].classList.remove("border");
        }
        pcolorarr[i].classList.add("border");
     
        nowcolor = colors[i];
    
    })
}
addbtn.addEventListener("click",function(e){
     addFlag = !addFlag;
     if(addFlag){
      removebtn.style.backgroundColor = "darkslategrey";
      modcont.style.display = "flex";
     }
     else{
        modcont.style.display = "none";
     }
})
modcont.addEventListener("keydown", function(e){
    if(e.key == "Shift"){
    let uniqueNO = "#sample ticket";
    let value = text.value;
    maketicket(shortid(),value);
    modcont.style.display = "none";
    addFlag = false;
    text.value = "";
    removebtn.style.backgroundColor = "darkslategrey";
 
    
}

})


function handlelock(ticketlock, textedi , uniqueNO){
let lockflag = false;
ticketlock.addEventListener("click", function(e){
    let ticketid = getticketid(uniqueNO);
 lockflag = !lockflag;
 if(lockflag){
  ticketlock.setAttribute("class" , "fa-solid fa-lock-open");
  textedi.setAttribute("contenteditable", "true");
 }
 else{
 ticketlock.setAttribute("class", "fa-solid fa-lock");
 textedi.setAttribute("contenteditable", "false");

 }
 ticketsArr[ticketid].text = textedi.innerText;
 
 localStorage.setItem("jira_tickets" , JSON.stringify(ticketsArr));
})
}

let removebtn = document.querySelector(".remove-btn");
removebtn.addEventListener("click", function(){
    removebtn.style.backgroundColor = "black";
    let ticket = document.querySelectorAll(".ticket");

    for(let i = 0; i<ticket.length; i++){
        ticket[i].addEventListener("click", function(){
            ticket[i].remove();
            ticketsArr.splice(i, 1);
            localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
        })
    }
})

function handlebar(ticket , uniqueNO){
    let pbaredi = ticket.querySelector(".p-bar");
    pbaredi.addEventListener("click", function(){
        
        let ticketid = getticketid(uniqueNO);
        let i = 0;
        for(i ; i<colors.length; i++){
            if(pbaredi.classList.contains(colors[i])){
                pbaredi.classList.remove(colors[i]);
                if(i === colors.length-1){
                 pbaredi.classList.add(colors[0]);
                 ticketsArr[ticketid].nowcolor = colors[0];
                 localStorage.setItem("jira_tickets" , JSON.stringify(ticketsArr));
                 break;
                }
                else {
                 pbaredi.classList.add(colors[i+1]);
                 ticketsArr[ticketid].nowcolor = colors[i+1];
                 localStorage.setItem("jira_tickets" , JSON.stringify(ticketsArr));
                 break;
                }
            }
        }
        
   
    })
}

function getticketid(uniqueNO){
     for(let i = 0; i<ticketsArr.length; i++){
        
        if(ticketsArr[i].uniqueNO == uniqueNO){
          
            return i;
        }
     }
}

for(let i = 0; i<barcolor.length; i++){
    barcolor[i].addEventListener("dblclick", function(){
        let ticketall = document.querySelectorAll(".ticket");
     
        for(let j = 0 ; j<ticketall.length; j++){
            ticketall[j].style.display = "block";
        }
    })
    }

for(let i = 0; i<barcolor.length; i++){

    barcolor[i].addEventListener("click" , function(){
        let ticketall = document.querySelectorAll(".ticket");
       
        for(let j = 0; j<ticketall.length; j++){
          
           let chaku =  ticketall[j].querySelector(".p-bar");
            if(chaku.classList.contains(colors[i])){

              ticketall[j].style.display = "block";
            }
            else{
              ticketall[j].style.display = "none";
            }
        }
    })
    
}

