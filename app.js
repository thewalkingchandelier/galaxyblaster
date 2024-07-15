const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
const width = 15;
const aliensRemoved = []
let currentShooterIndex = 202
let invadersId
let isGoingRight = true
let direction = 1
let results = 0

//Create the grid
for (let i = 0; i < width*width; i++) {

    const square = document.createElement('div');
    grid.appendChild(square);
}
    
    const squares = Array.from(document.querySelectorAll('.grid div'))
   
    const aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
    console.log(squares)
    
    //Where to start the aliens
    function draw() {

        for(let i = 0; i < aliens.length; i++) {
            if (!aliensRemoved.includes(i)) {
                squares[aliens[i]].classList.add('alien');
            }
            
    
    }
  
   
}
draw()

squares[currentShooterIndex].classList.add('shooter')
function remove() {
    for (let i = 0; i < aliens.length; i++) {

        squares[aliens[i]].classList.remove('alien');
}
}

function moveShooter(e) {

    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
    case 'ArrowLeft':
        if(currentShooterIndex % width !== 0) currentShooterIndex -= 1
        break
        case 'ArrowRight':
            if(currentShooterIndex % width < 14) currentShooterIndex += 1
            break

    
} 

squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

//Move aliens
const moveInvaders = () => {

    const leftEdge = aliens[0] % width === 0
    const rightEdge = aliens[aliens.length - 1] % width === width - 1
    remove()

    if (rightEdge && isGoingRight) {
    for (let i = 0; i < aliens.length; i++) {
        aliens[i] += width + 1
        direction = -1
        isGoingRight = false
            }

        }
        if (leftEdge && !isGoingRight) {
                for (let i = 0; i < aliens.length; i++) {
                    aliens[i] += width - 1
                    direction = 1
                    isGoingRight = true
                    
        
        }
     }
        for (let i = 0; i < aliens.length; i++) {
                aliens[i] += direction
        }
        
draw()
if (squares[currentShooterIndex].classList.contains('alien')) {
    
    resultsDisplay.innerHTML = 'GAME OVER!'
    clearInterval(invadersId)
}
if (aliensRemoved.length === aliens.length) {
    resultsDisplay.innerHTML = 'YOU WIN!'
    }

}

invadersId = setInterval(moveInvaders, 500)

function shoot(e) {
    let laserId

    let currentLaserIndex = currentShooterIndex 

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if (squares[currentLaserIndex].classList.contains('alien')) {
            squares[currentLaserIndex].classList.remove('alien')
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoved = aliens.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
            
            }
    }
    switch(e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
            break

    
    }
}

document.addEventListener('keydown', shoot) 