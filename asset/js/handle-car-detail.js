const app = {
    handleChangeImg: function() {
        
        const carsImgSelect = $$('.car__img-select')
        const carImgDisplaying = $('.car__img-displaying')

        carsImgSelect.forEach((carImg) => {
            carImg.onclick = function() {
                carImgDisplaying.src = carImg.src
            }
        })
    },
    start: function() {
        this.handleChangeImg()
    }
}

window.addEventListener('load', function() {
    app.start()
})