
var seeker_container = document.querySelector('.seeker-container')
var progress = seeker_container.querySelector('.progress')
var audio = document.querySelector('#video')

const seeker_containerCompStyles = window.getComputedStyle(seeker_container)
const progressCompStyles = window.getComputedStyle(progress)

const seeker_containerWidth = parseFloat(seeker_containerCompStyles.getPropertyValue('width').split('px')[0])







console.log(seeker_container)
console.log(progress)



seeker_container.addEventListener('click', e => {

    const seeker_containerWidth = getSeekerContainerWidth()
    //progress.style.setProperty('width', `${e.clientX + 1}px`)
    const clientX = e.clientX - getContainerOffset()
    const percentage = setProgressClient(clientX, seeker_containerWidth)

    updateTime(percentage)

})




function getContainerOffset() {
    console.log(seeker_container.offsetLeft)
    return seeker_container.offsetLeft;
}

function getProgressWidth() {
    return parseFloat(progressCompStyles.getPropertyValue('width').split('px')[0])
}

function getSeekerContainerWidth() {
    return parseFloat(seeker_containerCompStyles.getPropertyValue('width').split('px')[0])
}

function getProgressWidthPercentage() {
    return (getProgressWidth() / getSeekerContainerWidth()) * 100
}

function setProgressWidth(percentage) {
    progress.style.setProperty('width', `${percentage}%`)
}

function setProgressClient(clientX, totalWidth) {
    const percentage = pxToPercent((clientX + 1), totalWidth)
    progress.style.setProperty('width', `${percentage}%`)
    return percentage
}




function pxToPercent(pixels, width) {
    //console.log(pixels, width)
    const percentage = (pixels / width) * 100 

    console.log(percentage)

    return percentage

}

function setProgressPercentage(percentage) {
    progress.style.setProperty('width', `${percentage}%`)
}










var mousedown = false
var mousemove = false
var progressDragging = false

//mouse down events--------------------------------------------------------
seeker_container.addEventListener('mousedown', e => {
    mousedown = true
    console.log('mousedown')
})

seeker_container.addEventListener('mousemove', e => {
    mousemove = true

    if(mousedown) {
        progressDragging = true
        const seeker_containerWidth = getSeekerContainerWidth()
        const clientX = e.clientX - getContainerOffset()
        const percentage = setProgressClient(clientX, seeker_containerWidth)
        //updateTime(percentage)
    }
    
    console.log('mousemove')
})

seeker_container.addEventListener('mouseup', e => {

    //do the stuff on mouse up

    console.log('mouseup')

    //clear mouse variables
    mousedown = false
    mousemove = false
    progressDragging = false
})
//-----------------------------------


//document events------------------------------
document.addEventListener('mouseup', e => {

    //do the stuff on mouse up

    console.log('mouseup')

    //clear mouse variables
    mousedown = false
    mousemove = false

    const percentage = getProgressWidthPercentage()
    updateTime(percentage)
    
    progressDragging = false
})

document.addEventListener('dragleave', e => {

    //do the stuff on mouse up

    console.log('mouseup')

    //clear mouse variables
    mousedown = false
    mousemove = false
    const percentage = getProgressWidthPercentage()
    updateTime(percentage)
    
    progressDragging = false
})

document.addEventListener('mousemove', e => {
    mousemove = true

    if(mousedown) {
        progressDragging = true
        //const progressWidth = getProgressWidth()
        //setProgressClient(e.clientX)
        const seeker_containerWidth = getSeekerContainerWidth()
        const clientX = e.clientX - getContainerOffset()
        setProgressClient(clientX, seeker_containerWidth)
    }
    
    console.log('mousemove')
})

//-------------------------------------------------------------------------






//touch events---------------------------------------------------------------

seeker_container.addEventListener('touchstart', e => {
    mousedown = true
    console.log('touchstart')
})

seeker_container.addEventListener('touchmove', e => {
    mousemove = true

    if(mousedown) {
        progressDragging = true
        // console.log('true')
        // setProgressClient(e.touches[0].clientX)

        const seeker_containerWidth = getSeekerContainerWidth()
        const clientX = e.touches[0].clientX - getContainerOffset()
        setProgressClient(clientX, seeker_containerWidth)
    }
    
    console.log('touchmove')
})

seeker_container.addEventListener('touchcancel', e => {

    //do the stuff on mouse up

    console.log('touchcancel')

    //clear mouse variables
    mousedown = false
    mousemove = false
    const percentage = getProgressWidthPercentage()
    updateTime(percentage)
    
    progressDragging = false
})

document.addEventListener('touchend', e => {

    //do the stuff on mouse up

    console.log('mouseup')

    //clear mouse variables
    mousedown = false
    mousemove = false
    const percentage = getProgressWidthPercentage()
    updateTime(percentage)
    
    progressDragging = false
})


document.addEventListener('touchstart', e => {
    mousemove = true

    if(mousedown) {
        progressDragging = true
        const seeker_containerWidth = getSeekerContainerWidth()
        const clientX = e.touches[0].clientX - getContainerOffset()
        setProgressClient(clientX, seeker_containerWidth)
    }
    
    console.log('touchstart')
})

//---------------------------------------------------------------------



// function play() {
//     var width = 0
//     setProgressWidth(width)
    

//     var interval = setInterval(() => {
//         setProgressWidth(++width)
//         const containerWidth = getSeekerContainerWidth()
//         const progressWidth = getProgressWidth()

//         if(progressWidth >= (containerWidth / 2)) {
//             console.log('interval cleared')
//             clearInterval(interval)
//         }

//     }, 100);


// }
// setProgressWidth(0)
// //play()




var buffer = progress.querySelectorAll('.buffer')
console.log(buffer)





//audio events-------------------------
audio.addEventListener('play', e => {
    console.log('playing....')
    console.log(audio.duration)
    handleProgressBar(audio.currentTime, audio.duration)

})
audio.addEventListener('playing', e => {
    console.log('playing...')
})
audio.addEventListener('timeupdate', e => {
    console.log('timeupdatedd...')

    if(!progressDragging) handleProgressBar(audio.currentTime, audio.duration)
})
//----------



function handleProgressBar(currentValue, totalValue) {
    const percentage = (currentValue / totalValue) * 100
    console.log(percentage)
    if(!percentage) return

    setProgressWidth(percentage)
    
    //setProgressWidth()
}


function updateTime(percentage) {
    const time = calculateTimeFromPercentage(percentage, audio.duration)
    audio.currentTime = time
}

function calculateTimeFromPercentage(percentage, totalTime) {
    //50 percent of 200 formula
    //50 * 200 / 100
    const value = (percentage * totalTime) / 100
    return value
}





console.log(el_buffer)
console.log(player.getBufferedInfo().total[0])




















/* 


window.addEventListener('resize', e => {
    //console.log(e)
    //updateProgress()
    //updateBuffers()

})



function updateProgress() {
    const seeker_containerWidth = getSeekerContainerWidth()
    const progressWidth = getProgressWidth()
    
    console.log('progressWidth = ', progressWidth)

    const percentage = pxToPercent(progressWidth, seeker_containerWidth)

    setProgressPercentage(percentage);

}




function updateBuffers() {
    const bufferCompStyles = window.getComputedStyle(buffer[1])
    const pixels = (parseFloat(bufferCompStyles.getPropertyValue('width').split('px')[0]))

    console.log(buffer[1])
    console.log(pixels)

    const containerWidth = getSeekerContainerWidth()
    
    const percentage = pxToPercent(pixels, containerWidth)
    const newWidth = percentageToPixels(percentage, containerWidth)
    console.log('percentage ==-', percentage)
    console.log('newWidth ==', newWidth)

    buffer[1].style.setProperty('width', `${newWidth}px`)

}


function percentageToPixels(percentage, width) {
    return ((percentage / 100) * width)
}





*/














/* function updateProgress() {
    const seeker_containerWidth = parseFloat(seeker_containerCompStyles.getPropertyValue('width').split('px')[0])
    const progressWidth = parseFloat(progressCompStyles.getPropertyValue('width').split('px')[0])
    
    console.log('progressWidth = ', progressWidth)

    const percentage = pxToPercent(progressWidth, seeker_containerWidth)

    setProgressPercentage(percentage);

}


function pxToPercent(pixels, width) {
    //console.log(pixels, width)
    const percentage = ((width - pixels) / width) * 100

    console.log(percentage)

    return percentage
}

function setProgressPercentage(percentage) {
    progress.style.setProperty('width', `${percentage}%`)
} */



























/* 


function updateProgress() {
    const new_width_seeker_container = parseFloat(seeker_containerCompStyles.getPropertyValue('width').split('px')[0])
    const progressWidth = parseFloat(progressCompStyles.getPropertyValue('width').split('px')[0])

    console.log(new_width_seeker_container, seeker_containerWidth)

    if(new_width_seeker_container < seeker_containerWidth) {
        //window size reduced--- do the stuff
        console.log("width reduced.")

        const totalReduction = seeker_containerWidth - new_width_seeker_container
        console.log(totalReduction)

        parseInt(totalReduction)

        setProgressWidth(progressWidth - parseInt(totalReduction))
        

    }
    else {
        //window size increased--- do the stuff
        console.log("width increased.")
    }


}



function setProgressWidth(pixels) {
    progress.style.setProperty('width', `${pixels}px`)
}



*/