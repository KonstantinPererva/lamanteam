// open dropdown block

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Slide = function () {
    function Slide(node, opt) {
        _classCallCheck(this, Slide);

        this.opt = opt || {};
        this.option = Object.assign({
            btn: '[data-button]',
            box: '[data-box-dropdown]',
            boxInner: '[data-box-inner]',
            indicator: '[data-indicator]',
            transition: 600,
            onOpen: null
        }, this.opt);
        this.node = node;
        this.btn = this.node.querySelector(this.option.btn);
        this.box = this.node.querySelector(this.option.box);
        this.boxInner = this.node.querySelector(this.option.boxInner);
        this.indicator = this.node.querySelector(this.option.indicator);
        this.indicator.style.transition = this.option.transition + 'ms';
        this.node.style.transition = this.option.transition + 'ms';
        this.box.style.transition = this.option.transition + 'ms';
        this.heightBox = null;
        this.open = false;
    }

    _createClass(Slide, [{
        key: "down",
        value: function down() {
            var _this = this;

            function getSizeBoxes(elem) {
                var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
                var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
                return {
                    width: elemWidth,
                    height: elemHeight
                };
            }

            var downBlock = new Promise(function (resolve, reject) {
                _this.box.style.opacity = '0';
                _this.heightBox = getSizeBoxes(_this.boxInner).height;
                _this.box.style.height = '0';
                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this.box.style.opacity = '1';
                    _this.box.style.height = _this.heightBox + 'px';
                    _this.indicator.style.transition = _this.option.transition + 'ms';

                    _this.indicator.classList.add('open');
                    _this.node.classList.add('open');

                    _this.open = true;
                }, 0);
            });
        }
    }, {
        key: "up",
        value: function up() {
            var _this2 = this;

            var upBlock = new Promise(function (resolve, reject) {
                _this2.box.style.height = '0';
                _this2.box.style.opacity = '0';

                _this2.indicator.classList.remove('open');
                _this2.node.classList.remove('open');

                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this2.open = false;
                }, _this2.option.transition);
            });
        }
    }]);

    return Slide;
}();

if (document.querySelectorAll('.accordion-list-item').length) {
    var slides = document.querySelectorAll('.accordion-list-item');

    [].forEach.call(slides, function (el) {
        var slide = new Slide(el, {
            transition: 300
        });

        slide.toggle = function () {
            return slide.open ? slide.up() : slide.down();
        };

        slide.btn.addEventListener('click', slide.toggle);
    });
}

/////////////////
////////////////
////////////////
////////////////
///////////////////
// Parallax

if (document.querySelectorAll('.banner-section-bg img').length) {
    var image = document.querySelectorAll('.banner-section-bg img');
    new simpleParallax(image, {
        // delay: .4,
        // transition: 'cubic-bezier(0,0,0,1)',
        orientation: 'down',
        scale: 1.3
    });
}

/////////////////
////////////////
////////////////
////////////////
///////////////////
// slider init

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.slider-specialist')) {
        var bannerSlider = new Swiper('.slider-specialist', {
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 600,
            loop: true,
            navigation: {
                prevEl: '.slider-main-prev',
                nextEl: '.slider-main-next',
            }
        });
    }

    if (document.querySelector('.slider-video')) {
        var videoSlider = new Swiper('.slider-video', {
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 600,
            loop: false,
            navigation: {
                prevEl: '#slider-video-button-prev',
                nextEl: '#slider-video-button-next',
            }
        });
    }
});

/////////////////
////////////////
////////////////
////////////////
///////////////////
// play video

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function PlayVideo(node) {
    var self = this;

    self.node = node;
    self.btn = self.node.querySelector('.video-card-button');
    self.prevideo = self.node.querySelector('.video-card-img');
    self.videoBox = self.node.querySelector('.video-card-iframe');
    self.player = null;

    self.createIframe = function () {
        new Promise(function (resolve, reject) {
            self.videoBox.style.display = 'block';
            self.iframe = document.createElement('div');
            self.iframe.setAttribute('id', 'player-' + self.videoBox.dataset.id);
            self.videoBox.append(self.iframe);

            resolve();
        }).then(function () {
            self.player = new YT.Player('player-' + self.videoBox.dataset.id, {
                videoId: self.videoBox.dataset.src,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    };

    function onPlayerStateChange(event) {
        function pause() {
            if (event.data === 1) {
                setTimeout(function () {
                    event.target.pauseVideo();
                }, 10)
            }
        }

        document.getElementById('slider-video-button-prev').addEventListener('click', pause);

        document.getElementById('slider-video-button-next').addEventListener('click', pause);
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerPlay() {
        self.player.playVideo();
    }

    function onPlayerPause() {
        self.player.pauseVideo();
    }

    self.removeIframe = function () {
        self.videoBox.innerHTML = "";
        self.videoBox.style.display = 'none';
    };

    self.btn.addEventListener('click', function () {
        self.createIframe()
    });

    return {
        play: onPlayerPlay,
        pause: onPlayerPause,
        remove: self.removeIframe,
        open: self.createIframe
    }
}

function initVideo() {
    var video = document.querySelectorAll('.video-card');

    for (let i = 0; i < video.length; i++) {
        video[i].video = new PlayVideo(video[i]);
        video[i].remove = video[i].video.remove;
        video[i].pause = video[i].video.pause;
        video[i].play = video[i].video.play;
    }
}

if (document.querySelectorAll('.video-card').length) {
    initVideo();
}

/////////////////
////////////////
////////////////
////////////////
///////////////////

function Resizer(node, divisor) {
    var self = this;
    self.node = document.querySelector(node);
    self.divisor = self.node.querySelector(divisor);
    self.drag = self.divisor.querySelector('.draggable');

    self.drag.addEventListener('mousedown', function (e) {
        self.resize(e)
    });

    self.resize = function (ev) {
        var _s = this;
        _s.event = ev;
        _s.nodeWidth = self.node.getBoundingClientRect().width;
        _s.startWidth = self.divisor.getBoundingClientRect().width;

        _s.move = function (e) {
            var moveX = (e.pageX - _s.event.pageX);
            moveX *= -1;

            _s.currentWidth = _s.startWidth + moveX;

            self.divisor.style.width = _s.currentWidth + 'px';

            if (_s.currentWidth >= _s.nodeWidth) {
                self.divisor.style.width = _s.nodeWidth + 'px';
            }

            if (_s.currentWidth <= 0) {
                self.divisor.style.width = '0';
            }
        }

        document.addEventListener('mousemove', _s.move);

        document.addEventListener('mouseup', function () {
            this.removeEventListener('mousemove', _s.move);
            self.drag.removeEventListener('mousedown', function (e) {
                self.resize(e)
            });
        });
    };

    self.resizeTouch = function (evt) {
        var _s = this;
        _s.nodeWidth = self.node.getBoundingClientRect().width;
        _s.startWidth = self.divisor.getBoundingClientRect().width;

        _s.startTouchX = evt.changedTouches[0].pageX;

        _s.moveTouch = function (ev) {
            var moveX = (ev.changedTouches[0].pageX - self.startTouchX);
            moveX *= -1;

            _s.currentWidth = _s.startWidth + moveX;

            self.divisor.style.width = _s.currentWidth + 'px';

            if (_s.currentWidth >= _s.nodeWidth) {
                self.divisor.style.width = _s.nodeWidth + 'px';
            }

            if (_s.currentWidth <= 0) {
                self.divisor.style.width = '0';
            }
        }

        document.addEventListener('touchmove', _s.moveTouch);

        document.addEventListener('touchend', function () {
            this.removeEventListener('touchmove', _s.moveTouch);
            self.drag.removeEventListener('touchstart', function (e) {
                self.resizeTouch(e)
            });
        });
    };

    self.drag.addEventListener('touchstart', function (e) {
        self.resizeTouch(e)
    });
}

new Resizer('#resultRecall_1', '.divisorAfter');
new Resizer('#resultRecall_2', '.divisorAfter');

/////////////////
////////////////
////////////////
////////////////
///////////////////
//open - close modal

function СontrolModal(node) {
    var self = this;
    self.node = node;
    self.modal = document.querySelector('.modal.appointment-modal');
    self.modalContent = self.modal.querySelector('.modal.appointment-modal > .content');
    self.bntClose = self.modal.querySelector('.button-preset-cancel');
    self.widthScroll = function () {
        let div = document.createElement('div');
        div.style.opacity = '0';
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        document.body.append(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();

        return scrollWidth;
    };


    self.open = function () {
        self.modal.style.transition = '600ms';
        self.modalContent.style.transition = '600ms';
        document.documentElement.style.width = document.body.getBoundingClientRect().width - self.widthScroll();
        document.documentElement.style.overflow = 'hidden';
        self.modal.style.display = 'block';
        setTimeout(function () {
            self.modal.style.opacity = '1';
            self.modalContent.style.opacity = '1';
            self.modalContent.style.transform = 'scale(1)';
        }, 10)
    };

    self.close = function () {
        document.documentElement.style.width = "auto";
        document.documentElement.style.overflow = 'visible';
        self.modal.style.opacity = '0';
        self.modalContent.style.opacity = '0';
        self.modalContent.style.transform = 'scale(1.1)';
        setTimeout(function () {
            self.modal.style.display = 'none';
            self.modal.style.transition = '0';
            self.modalContent.style.transition = '0';
        }, 300)
    };

    self.node.addEventListener('click', self.open);
    self.bntClose.addEventListener('click', self.close);
}

/////////////////
////////////////
////////////////
////////////////
///////////////////

function _instanceof2(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck2(instance, Constructor) { if (!_instanceof2(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties2(Constructor.prototype, protoProps); if (staticProps) _defineProperties2(Constructor, staticProps); return Constructor; }

var Animate = /*#__PURE__*/function () {
    function Animate(node, animationName, opt) {
        _classCallCheck2(this, Animate);

        this.node = document.getElementsByClassName(node)[0] || node;
        this.animationName = animationName;
        this.opt = opt || {};
        this.option = Object.assign({
            transition: 300,
            delay: 0,
            cubicBezier: 'cubic-bezier(.29,.16,.19,.82)',
            positionStart: 250
        }, this.opt);
        var _this$option = this.option,
            transition = _this$option.transition,
            delay = _this$option.delay,
            cubicBezier = _this$option.cubicBezier,
            positionStart = _this$option.positionStart;
        this.transition = transition + 'ms';
        this.delay = delay + 'ms';
        this.cubicBezier = cubicBezier;
        this.positionStart = positionStart;
        this.top = null;
        this.initAnimateEl = this.initAnimateEl.bind(this);
        this.startAnimateEl = this.startAnimateEl.bind(this);
    }

    _createClass2(Animate, [{
        key: "initAnimateEl",
        value: function initAnimateEl() {
            this.node.classList.add(this.animationName);
            this.node.style.transition = this.transition + ' ' + this.cubicBezier + ' ' + this.delay;
        }
    }, {
        key: "startAnimateEl",
        value: function startAnimateEl() {
            if (!this.node.classList.contains(this.animationName)) {
                return;
            }

            this.top = this.node.getBoundingClientRect().top;

            if (this.top + this.positionStart <= window.innerHeight) {
                this.node.classList.remove(this.animationName);
            }
        }
    }]);

    return Animate;
}();

window.addEventListener('load', function () {
    if (document.getElementsByClassName('open-modal').length) {
        var openModalButtons = document.getElementsByClassName('open-modal');

        for (var i = 0; i < openModalButtons.length; i++) {
            new СontrolModal(openModalButtons[i]);
        }
    }

    if (document.getElementsByClassName('open-modal-recall').length) {
        document.querySelector('.open-modal-recall').addEventListener('click', function () {
            document.querySelector('.button.recall').click();
        });
    }


    if (window.innerWidth >= 768) {
        var advantageCard = document.querySelectorAll('.when-needed .advantage-card');
        var delayAdvantageCard = 0;

        for (let i = 0; i < advantageCard.length; i++) {

            if (i % 3 || i === 1) {
                delayAdvantageCard += 300;
            } else {
                delayAdvantageCard = 0
            }

            advantageCard[i].animEl = new Animate(advantageCard[i],'in-Left-Up', {
                transition: 500,
                delay: delayAdvantageCard,
                cubicBezier: 'cubic-bezier(.4,1.63,.87,1.21)'
            });

            advantageCard[i].animEl.initAnimateEl();
            advantageCard[i].animEl.startAnimateEl();
        }

        var advantageCardSmall = document.querySelectorAll('.advantage-card_small');
        var delayAdvantageCardSmall = 0;

        for (let i = 0; i < advantageCardSmall.length; i++) {

            if (i % 3 || i === 1) {
                delayAdvantageCardSmall += 300;
            } else {
                delayAdvantageCardSmall = 0
            }

            advantageCardSmall[i].animEl = new Animate(advantageCardSmall[i],'fade', {
                transition: 500,
                delay: delayAdvantageCardSmall,
                cubicBezier: 'cubic-bezier(.4,1.63,.87,1.21)'
            });

            advantageCardSmall[i].animEl.initAnimateEl();
            advantageCardSmall[i].animEl.startAnimateEl();
        }

        var listBoxItem = document.querySelectorAll('.list-box__item');
        var delayListBoxItem = 0;

        for (let i = 0; i < listBoxItem.length; i++) {

            if (i % 2 || i === 1) {
                delayListBoxItem += 400;
            } else {
                delayListBoxItem = 0
            }

            listBoxItem[i].animEl = new Animate(listBoxItem[i],'in-Left-Up', {
                transition: 600,
                delay: delayListBoxItem,
                cubicBezier: 'cubic-bezier(.4,1.63,.87,1.21)'
            });

            listBoxItem[i].animEl.initAnimateEl();
            listBoxItem[i].animEl.startAnimateEl();
        }

        var specialistCard = new Animate('specialist-card-box','in-Right-Up', {
            transition: 600,
            delay: 0,
        });

        specialistCard.initAnimateEl();
        specialistCard.startAnimateEl();

        window.addEventListener('scroll', function () {
            for (let i = 0; i < advantageCard.length; i++) {
                advantageCard[i].animEl.startAnimateEl();
            }

            for (let i = 0; i < advantageCardSmall.length; i++) {
                advantageCardSmall[i].animEl.startAnimateEl();
            }

            for (let i = 0; i < listBoxItem.length; i++) {
                listBoxItem[i].animEl.startAnimateEl();
            }

            specialistCard.startAnimateEl();
        })
    }
})