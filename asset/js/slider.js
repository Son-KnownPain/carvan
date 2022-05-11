window.addEventListener('load', function() {

    // Get elements
    const slider = $('.slider')
    const sliderMain = $('.slider__main')
    const sliderItem = $$('.slider__item')

    const sliderPrevBtn = $('.slider__prev-btn')
    const sliderNextBtn = $('.slider__next-btn')

    let sliderDotsItem = $$('.slider__dot-item')

    // Create default value of slide
    let indexItem = 0 //as Item 0
    let xItem = `${indexItem}00%`
    const slideItemLength = sliderItem.length

    // -----------------------------------------------------------

    // Create function handling click prev, next slide or dot item
    const handleClickToggleSlide = (direction) => {
        // Next
        if (direction === 1) {

            indexItem--
            if (indexItem === -slideItemLength) {
                indexItem = -0
            }
            xItem = `${indexItem}00%`

            sliderMain.style = `transform: translateX(${xItem})`
        // Prev
        } else if (direction === -1)  {

            indexItem++
            if (indexItem === 1) {
                indexItem = -slideItemLength + 1
            }
            xItem = `${indexItem}00%`

            sliderMain.style = `transform: translateX(${xItem})`
        // Dot item
        } else if (typeof direction == 'object') {
            
            indexItem = -direction.indexDotItem

            xItem = '-' + direction.xDotItem

            sliderMain.style = `transform: translateX(${xItem})`
        }

        // Handle dot item in UI
        Array(sliderDotsItem)[0].forEach((dotItem) => {
            if (dotItem.matches('.active') && -dotItem.dataset.index != indexItem) {
                dotItem.classList.remove('active')
            } else if (-dotItem.dataset.index == indexItem) {
                dotItem.classList.add('active')
            }
        })
    }

    // -----------------------------------------------------------
    // Handle click prev btn
    sliderPrevBtn.addEventListener('click', function() {
        handleClickToggleSlide(-1)
    })

    // Handle click next btn
    sliderNextBtn.addEventListener('click', function() {
        handleClickToggleSlide(1)
    })

    // Handle click dot item
    Array(sliderDotsItem)[0].forEach((dotItem) => {
        dotItem.addEventListener('click', function() {

            handleClickToggleSlide({
                xDotItem: `${dotItem.dataset.index}00%`,
                indexDotItem: Number.parseInt(dotItem.dataset.index)
            })

        })
    })

    // -----------------------------------------------------------
    setInterval(() => {
        sliderNextBtn.click()
    }, 5000)
})

