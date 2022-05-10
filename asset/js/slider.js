window.addEventListener('load', function() {

    const slider = $('.slider')
    const sliderMain = $('.slider__main')
    const sliderItem = $$('.slider__item')

    const sliderPrevBtn = $('.slider__prev-btn')
    const sliderNextBtn = $('.slider__next-btn')

    const sliderDotItem = $$('.slider__dot-item')

    let indexItem = 0 //as Item 0
    let xItem = `${indexItem}00%`
    const slideItemLength = sliderItem.length

    // Create function handling click prev or next slide
    const handleClickToggleSlide = (direction) => {
        if (direction === 1) {

            indexItem--
            if (indexItem === -slideItemLength) {
                indexItem = 0
            }
            xItem = `${indexItem}00%`

            sliderMain.style = `transform: translateX(${xItem})`
        } else {

            indexItem++
            if (indexItem === 1) {
                indexItem = -slideItemLength + 1
            }
            xItem = `${indexItem}00%`

            sliderMain.style = `transform: translateX(${xItem})`

        }
    }

    sliderPrevBtn.addEventListener('click', function() {
        handleClickToggleSlide(-1)
    })
    sliderNextBtn.addEventListener('click', function() {
        handleClickToggleSlide(1)
    })
})

