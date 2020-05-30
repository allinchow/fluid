import React from 'react'
import FluidGallery from 'react-fluid-gallery'
import logo from './img/logo.svg'
import './App.css';
// import { render } from '@testing-library/react';

const slides = [
    {
        addClass: 'second right',
        image: {
            'vertical': './img/2_v.jpg',
            'horizontal': './img/2_h.jpg',
        },
        title: {__html: 'Польза и&nbsp;вкус'},
        text: {__html: 'Мы взглянули на&nbsp;воду по-новому и&nbsp;добавили&nbsp;ей вкуса.<br> Вода + сок от&nbsp;&laquo;Доброго&raquo;&nbsp;- это&nbsp;настоящая артезианская вода + натуральный свежий сок'}
    },
    {
        addClass: 'first left',
        image: {
            'vertical': './img/1_v.jpg',
            'horizontal': './img/1_h.jpg',
        },
        title: {__html: 'Встречайте новый &laquo;Добрый&raquo; вода + сок'},
        text: {__html: 'Легкий и&nbsp;вкусный способ поддержать водный баланс в&nbsp;течение дня'}
    },
    {
        addClass: 'third right',
        image: {
            'vertical': './img/0_v.jpg',
            'horizontal': './img/0_h.jpg',
        },
        title: {__html: 'Сочный&nbsp;лимон и&nbsp;мята'},
        text: {__html: 'Новый свежий вкус для&nbsp;доброго и&nbsp;продуктивного&nbsp;дня'}
    },
    // {
    //     addClass: 'fourth left',
    //     image: {
    //         'vertical': './img/0_v.jpg',
    //         'horizontal': './img/0_h.jpg',
    //     },
    //     title: {__html: 'Нежная клубника и&nbsp;базилик'},
    //     text: {__html: 'Нежный вкус для дня, полного открытий'}
    // },
];

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Content />
            </div>
        );
    }
}
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            fadeIn: true,
        };
    }
    render() {
        return (
            <div className="content">
                {this.renderGallery()}
                {this.renderSlideText()}
            </div>
        );
    }
    renderSlideText() {
        return (
            <SlideText
                slide={slides[this.state.id]}
                fadeIn={this.state.fadeIn}
            />
        );
    }
    renderGallery() {
        const clientW = window.innerWidth;
        const clientH = window.innerHeight;
        let imgOrientation = null;
        if (clientH > clientW) {
            imgOrientation = 'vertical';
        } else {
            imgOrientation = 'horizontal';
        }
        return(
            <FluidGallery
                className="gallery"
                style={{ width: '100vw', height: '100vh', backgroundSize: 'contain' }}
                slides={[ slides[0].image[imgOrientation], slides[1].image[imgOrientation], slides[2].image[imgOrientation] ]}
                startAt={0}
                onChange={(index) => {
                    this.setState({
                        fadeIn: false
                    });
                    setTimeout(() => {
                        this.setState({
                            id: index,
                            fadeIn: true
                        });
                    }, 300)
                }}
            />
        );
    }

}
function SlideText(props) {
    const fadeIn = 'text-animated-rl visible';
    const fadeOut = 'text-animated-rl-end hidden';
    return (
        <div className={`slide-text ${props.slide.addClass} ${props.fadeIn ? fadeIn : fadeOut}`}>
            <h2 className="slide-text-title" dangerouslySetInnerHTML={props.slide.title} />
            <p className="slide-text-desc" dangerouslySetInnerHTML={props.slide.text} />
        </div>
    );
}

function Header() {
    return (
        <header>
            <Logo />
            <Menu />
        </header>
    );
}
function Logo() {
    return (
        <a className="logo" href={'https://www.dobry.ru/'}>
            <img className="logo-img" src={logo} alt="Добрый"/>
        </a>
    )
}
function Menu() {
    return (
        <button className="menu-btn">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
    )
}
export default App;
