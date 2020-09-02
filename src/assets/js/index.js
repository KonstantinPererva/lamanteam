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