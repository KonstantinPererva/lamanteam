function Tab(node, changeBg) {
    var self = this;
    self.changeBg = changeBg || null;

    if (!node) {return}
    self.node = document.querySelector(node);

    if (self.node.querySelectorAll('[data-button-tab]').length) {
        self.btnSwitchList = [].slice.call(self.node.querySelectorAll('[data-button-tab]'));
        self.tab = [].slice.call(self.node.querySelectorAll('[data-content-tab]'));

        self.btnSwitchList.forEach(function (btn, ind) {
            btn.addEventListener('click', function () {
                if (window.innerWidth >= 768) {
                    let wowTab = new WOW({
                        boxClass:     'wow-tab',      // default
                        animateClass: 'animated',     // default
                        offset:       0,              // default
                        mobile:       true,           // default
                        live:         true            // default
                    }).init();
                }

                var name = this.dataset.buttonTab;

                self.tab.forEach(function (tab) {
                    tab.classList.remove('active');
                });

                self.btnSwitchList.forEach(function (btn) {
                    btn.classList.remove('active');
                });

                self.node.querySelector('[data-content-tab="' + name + '"]').classList.add('active');

                this.classList.add('active');
            });
        })
    }
}

function PagePopup(popup) {
    var _s = this;
    _s.popup = document.querySelector('[data-popup="' + popup + '"]');
    _s.btnClose = _s.popup.querySelectorAll('[data-close-popup]');
    _s.listPopup = document.querySelectorAll('[data-popup]');
    _s.transition = 300;

    _s.open = function () {
        _s.popup.style.display = 'block';
        document.documentElement.style.width = document.body.clientWidth + 'px';
        document.documentElement.style.overflow = 'hidden';

        setTimeout(function () {
            _s.popup.classList.add('open');
        },0)
    }

    _s.close = function () {
        _s.popup.classList.remove('open');

        setTimeout(function () {
            _s.popup.style.display = 'none';

            document.documentElement.style.width = 'auto';
            document.documentElement.style.overflow = 'visible';
        },_s.transition);
    }

    _s.init = function () {
        for (var i = 0; i < _s.btnClose.length; i++ ) {
            _s.btnClose[i].addEventListener('click', function () {
                _s.close();
            })
        }
    }

    return {
        open: _s.open,
        init: _s.init
    }
}

function openPopup(popup) {
    var p = new PagePopup(popup);
    p.change();
}

function closePopup(popup) {
    var p = new PagePopup(popup);
    p.close();
}

window.addEventListener('load', function () {
    if (document.querySelectorAll('.section-4').length) {
        new Tab('.section-4');
    }

    if (document.querySelectorAll('[data-popup]').length) {
        var listBtnOpenPopup = document.querySelectorAll('[data-open-popup]');

        for (let i = 0; i < listBtnOpenPopup.length; i++) {
            let popup = listBtnOpenPopup[i].dataset.openPopup;

            if (!popup) { continue }

            listBtnOpenPopup[i].popup = new PagePopup(popup);

            listBtnOpenPopup[i].popup.init();

            listBtnOpenPopup[i].addEventListener('click', function () {
                this.popup.open();
            })
        }
    }

    if (window.innerWidth >= 768) {
        new WOW().init();
    }

    // $("input[name=phone]").mask("+38 (099) 999-99-99");

    function initMainSlider() {
        var sliderMain;
        var initialSlide = 0;
        var delay = 4000;

        sliderMain = new Swiper('.banner-slider', {
            speed: 1000,
            slidesPerView: 1,
            initialSlide: initialSlide,
            effect: "fade",
            autoplay: {
                delay: delay,
                paused: false,
                disableOnInteraction: false
            },
            // navigation: {
            //     prevEl: '.navigation-button-prev',
            //     nextEl: '.navigation-button-next'
            // },
            runCallbacksOnInit: false,
            on: {
                init: function()
                {
                    initElementsAnimation(this);
                    animateElShow(this.slides[this.params.initialSlide]);

                    var btnPrev = document.querySelector('.navigation-button-prev');
                    var btnNext = document.querySelector('.navigation-button-next');
                    var slider = this;

                    btnPrev.addEventListener('click', function () {
                        goToPrev(slider);
                    })

                    btnNext.addEventListener('click', function () {
                        goToNext(slider);
                    })


                },
                slideChange: function ()
                {
                    activeSlide(this, this.slides, this.activeIndex, this.previousIndex);
                }
            }
        });

        function goToNext(slider)
        {
            var s = this;
            s.slider = slider;
            s.nextSlider = s.slider.activeIndex + 1;

            if (s.slider.activeIndex === s.slider.slides.length - 1)
            {
                s.slider.slideTo(0);
            } else {
                s.slider.slideTo(s.nextSlider);
            }
        }

        function goToPrev(slider)
        {
            var s = this;
            s.slider = slider;
            s.prevSlider = s.slider.activeIndex - 1;

            if (s.slider.activeIndex === 0)
            {
                s.slider.slideTo(s.slider.slides.length - 1);
            } else {
                s.slider.slideTo(s.prevSlider);
            }
        }

        function initElementsAnimation(slider)
        {
            var self = this;
            self.slider = slider;

            for(let i = 0; i < self.slider.slides.length; i++)
            {
                self.slider.slides[i].elements = [].slice.call(self.slider.slides[i].querySelectorAll('.animation'),0);

                for(let j = 0; j < self.slider.slides[i].elements.length; j++)
                {
                    self.slider.slides[i].elements[j].style.animationDuration = self.slider.params.speed / 3 + "ms";
                    self.slider.slides[i].elements[j].classAnimIn = self.slider.slides[i].elements[j].dataset.animatedIn;
                    self.slider.slides[i].elements[j].classAnimOut = self.slider.slides[i].elements[j].dataset.animatedOut;
                }
            }
        }

        function animateElShow(slide)
        {
            var self = this;
            self.slide = slide;

            for(let i = 0; i < self.slide.elements.length; i++)
            {
                self.slide.elements[i].classList.remove(self.slide.elements[i].classAnimOut);
                self.slide.elements[i].classList.add('animated');
                self.slide.elements[i].classList.add(self.slide.elements[i].classAnimIn);
            }
        }

        function animateElHide(slide)
        {
            var self = this;
            self.slide = slide;

            for(let i = 0; i < self.slide.elements.length; i++)
            {
                self.slide.elements[i].classList.remove(self.slide.elements[i].classAnimIn);
                self.slide.elements[i].classList.add('animated');
                self.slide.elements[i].classList.add(self.slide.elements[i].classAnimOut);
            }
        }

        function activeSlide(slider,slides,ind,prev)
        {
            var self = this;
            self.ind = ind;
            self.prev = prev;
            self.slider = slider;
            self.slides = slides;

            if(self.prev !== undefined)
            {
                animateElHide(self.slides[self.prev]);
            }

            setTimeout(function () {
                animateElShow(self.slides[self.ind]);
            },self.slider.params.speed / 3);
        }
    }

    if (document.querySelector('.banner-slider'))
    {
        initMainSlider()
    }
})

