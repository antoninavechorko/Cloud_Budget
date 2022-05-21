import '../style/style.scss'

const mobileBtn = document.querySelector(".mobile-menu-btn");
const navList = document.querySelector(".header__nav-list");


document.addEventListener("click", (event) => {
    let targetEl = event.target;
    if (
        targetEl.closest(".mobile-menu-btn") ||
        targetEl.closest(".header__nav-item")
    ) {
        mobileBtn.classList.toggle("active-mobile");
        navList.classList.toggle("active-mobile");
    }
});

window.addEventListener("scroll", () => {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 0) {
        header.classList.add('header-bg');
    } else {
        header.classList.remove('header-bg');
    }
});

// video //

$('.video').parent().click(function () {
    if ($(this).children(".video").get(0).paused) {
        $(this).children(".video").get(0).play(); $(this).children(".video__button").fadeOut();
    } else {
        $(this).children(".video").get(0).pause();
        $(this).children(".video__button").fadeIn();
    }
});

//slider //

class Slider extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            currentIndex: 0
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentIndex: (this.state.currentIndex + 1) % this.props.images.length
            });
        }, 2500);
    }

    render() {
        const {
            images,
            radius = 180
        } = this.props;
        const {
            currentIndex
        } = this.state;
        const len = images.length || 0;
        const angle = 2 * Math.PI / len;
        return /*#__PURE__*/React.createElement("div", {
            className: "carousel-slider"
        }, /*#__PURE__*/React.createElement("div", {
            className: "slider__viewport",
            style: {
                transform: `translateZ(${-radius}px) rotateY(${-currentIndex * angle}rad)`
            }
        }, images.map((image, index) => {
            const indexAngle = index * angle;
            const z = Math.cos(indexAngle) * radius;
            const x = Math.sin(indexAngle) * radius;
            return /*#__PURE__*/React.createElement("div", {
                key: image,
                className: classNames('slider__image', {
                    'slider__image_active': index === currentIndex
                }),
                style: {
                    transform: `translateZ(${z}px) translateX(${x}px) rotateY(${indexAngle}rad)`
                },
                src: image
            }, image);
        })));
    }
}

class App extends React.PureComponent {
    render() {
        return /*#__PURE__*/React.createElement(Slider, {
            images: ['', '', ''],
            radius: 210
        });
    }
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));