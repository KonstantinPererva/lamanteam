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

function Tab(node, changeBg) {
    var self = this;
    self.changeBg = changeBg || null;

    if (!node) {return}
    self.node = document.querySelector(node) || null;

    if (self.node.querySelectorAll('[data-button-tab]').length) {
        self.btnSwitchList = [].slice.call(self.node.querySelectorAll('[data-button-tab]'));
        self.tab = [].slice.call(self.node.querySelectorAll('[data-content-tab]'));

        self.btnSwitchList.forEach(function (btn, ind) {
            btn.addEventListener('click', function () {

                if (ind === 1) {
                    this.parentElement.classList.add('right');
                    this.parentElement.classList.remove('disabled');

                    if (self.changeBg) {
                        self.node.classList.add('change');
                    }
                } else if (ind === 2) {
                    this.parentElement.classList.add('disabled');
                } else {
                    this.parentElement.classList.remove('right');
                    this.parentElement.classList.remove('disabled');

                    if (self.changeBg) {
                        self.node.classList.remove('change');
                    }
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

    _s.change = function() {
        for (var i = 0; i < _s.listPopup.length; i++) {
            if (_s.listPopup[i].classList.contains('open')) {
                _s.close(_s.listPopup[i]);

                setTimeout(_s.open, _s.transition);
            } else {
                _s.open();
            }
        }
    }

    _s.open = function () {
        _s.popup.style.display = 'block';

        setTimeout(function () {
            _s.popup.classList.add('open');
        },0)
    }

    _s.close = function (popup) {
        popup.classList.remove('open');

        setTimeout(function () {
            popup.style.display = 'none';
        },_s.transition);
    }

    _s.closeCurrentPopup = function () {
        _s.popup.classList.remove('open');

        setTimeout(function () {
            _s.popup.style.display = 'none';
        },_s.transition);
    }

    _s.init = function () {
        for (var i = 0; i < _s.btnClose.length; i++ ) {
            _s.btnClose[i].addEventListener('click', function () {
                _s.close(_s.popup);
            })
        }
    }

    return {
        change: _s.change,
        open: _s.open,
        init: _s.init,
        close: _s.closeCurrentPopup
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

if (document.querySelectorAll('.section-4').length) {
    new Tab('.section-4');
}

if (document.querySelectorAll('[data-popup]').length) {
    var listBtnOpenPopup = document.querySelectorAll('[data-open-popup]');

    for (let i = 0; i < listBtnOpenPopup.length; i++) {
        let popup = listBtnOpenPopup[i].dataset.openPopup;

        listBtnOpenPopup[i].popup = new PagePopup(popup);

        listBtnOpenPopup[i].popup.init();
    }

    for (var i = 0; i < listBtnOpenPopup.length; i++) {
        listBtnOpenPopup[i].addEventListener('click', function () {
            this.popup.change();
        })
    }
}