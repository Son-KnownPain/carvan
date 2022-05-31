// Get element in here
const modifyWarrantyBtn = $('.car__warranty-modify-btn')
const closeWarrantyBtn = $('.warranty__close')
const warrantyModel = $('.warranty__model')

const app = {
    isShowWarrantyModel: false,
    warrantyPackage: {
        year: 1,
        mode: "basic"
    },
    handleEvents: function() {
        const _this = this

        // Show/Hide warranty model
        modifyWarrantyBtn.onclick = function() {
            _this.isShowWarrantyModel = true
            _this.handleShowHideModel()
        }
        closeWarrantyBtn.onclick = function() {
            _this.isShowWarrantyModel = false
            _this.handleShowHideModel()
        }
        warrantyModel.onclick = function() {
            _this.isShowWarrantyModel = false
            _this.handleShowHideModel()
        }
        $('.warranty__contain').onclick = function(e) {
            e.stopPropagation()
        }



        // Set value of warranty year
        $$('input.choice-year-input').forEach(input => {
            input.onclick = function() {
                app.warrantyPackage.year = Number(input.value[0])
                app.renderWarrantyConfig()
            }
        })



        // Set warranty package
        $$('.wlc__choose-btn').forEach(chooseBtn => {
            chooseBtn.onclick = function() {
                app.warrantyPackage.mode = chooseBtn.dataset.value
                $('.wlc__section.active').classList.remove('active')
                chooseBtn.closest('.wlc__section').classList.add('active')
                app.renderWarrantyConfig()
            }
        })

    },




    renderWarrantyConfig: function() {
        if (this.warrantyPackage.year > 1) {
            $('.car__price-subtitle').textContent = `[${this.warrantyPackage.year} years, ${this.warrantyPackage.mode} package]`
        } else {
            $('.car__price-subtitle').textContent = `[${this.warrantyPackage.year} year, ${this.warrantyPackage.mode} package]`
        }
    },




    handleShowHideModel: function() {
        if (this.isShowWarrantyModel) {
            $('.warranty__model').classList.toggle('show', this.isShowWarrantyModel)
            setTimeout(() => {
                $('.warranty__contain').classList.toggle('show', this.isShowWarrantyModel)
            }, 1)
        } else {
            $('.warranty__contain').classList.toggle('show', this.isShowWarrantyModel)
            setTimeout(() => {
                $('.warranty__model').classList.toggle('show', this.isShowWarrantyModel)
            }, 300)
        }
    },




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
        this.handleEvents()
        this.renderWarrantyConfig()
    }
}

window.addEventListener('load', function() {
    app.start()
})