const grid= document.querySelector(".grid")
const resultdisplay=document.querySelector(".result")
let correntShooterIndex=202
let width=15
let direction=1
let invaderId
let goingright=true
let aliensremoved=[]
let result=0

for(let i=0;i<width*width;i++){
    const square= document.createElement("div")
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))

const alianInvaders = [0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39]

function draw(){
    for(let i=0;i<alianInvaders.length;i++){
        if (!aliensremoved.includes(i)){
            squares[alianInvaders[i]].classList.add("invader")}
    }
}
draw()
squares[correntShooterIndex].classList.add("shooter")

function remove(){
    for(let i=0;i<alianInvaders.length;i++){
        squares[alianInvaders[i]].classList.remove("invader")
    }
}



function moveShooter(e){
    squares[correntShooterIndex].classList.remove("shooter")
    switch(e.key){
        case "ArrowLeft":
            if(correntShooterIndex%width!==0) correntShooterIndex -=1
            break
        case "ArrowRight":
            if(correntShooterIndex%width<width-1)correntShooterIndex+=1
            break
    }
    squares[correntShooterIndex].classList.add("shooter")

}
document.addEventListener("keydown",moveShooter)

function moveInvaders() {
    const leftedge  =alianInvaders[0]%width===0
    const rightedge= alianInvaders[alianInvaders.length-1]%width===width-1
    remove()
    if(rightedge && goingright){
        for(let i=0;i<alianInvaders.length;i++){
            alianInvaders[i]+=width+1
            direction=-1
            goingright=false
        }
    }
    if(leftedge && !goingright){
        for(let i=0;i<alianInvaders.length;i++){
            alianInvaders[i]+=width -1
            direction=1
            goingright=true
        }
    }

    for(let i=0;i<alianInvaders.length;i++){
        alianInvaders[i]+=direction
    }
    draw()

    if(squares[correntShooterIndex].classList.contains("invader")){
        resultdisplay.innerHTML="GAME OVER"
        clearInterval(invaderId)
    }

    
    if(aliensremoved.length===alianInvaders.length){
        resultdisplay.innerHTML="YOU WON!"
        clearInterval(invaderId)
    }
}
invaderId=setInterval(moveInvaders,500)

function shoot(e){
    let laserId
    let currentlaserindex=correntShooterIndex
    function movelaser(){
        squares[currentlaserindex].classList.remove("laser")
        currentlaserindex-=width    
        squares[currentlaserindex].classList.add("laser")
        if(squares[currentlaserindex].classList.contains("invader")){
            squares[currentlaserindex].classList.remove("laser")
            squares[currentlaserindex].classList.remove("invader")
            squares[currentlaserindex].classList.add("boom")
            setTimeout(() => {squares[currentlaserindex].classList.remove("boom")
                
            }, 300);
            clearInterval(laserId)

            const alienremoved=alianInvaders.indexOf(currentlaserindex)
            aliensremoved.push(alienremoved)
            result++
            resultdisplay.innerHTML=result
        }

    }
    if(e.key==="ArrowUp"){
        laserId=setInterval(movelaser,100)

    }
    
}
document.addEventListener("keydown",shoot)
