import React from 'react'
import FluidGallery from 'react-fluid-gallery'
import logo from './img/logo.svg'
import './App.css';
// import { render } from '@testing-library/react';

const slides = [
    {
        image: {
            'vertical': './img/0_v.jpg',
            'horizontal': './img/0_h.jpg',
        },
        title: 'Lorem ipsum dolor sit amet (0)',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, aspernatur.'
    },
    {
        image: {
            'vertical': './img/1_v.jpg',
            'horizontal': './img/1_h.jpg',
        },
        title: 'Voluptates, reprehenderit sequi (1)',
        text: 'Voluptates, reprehenderit sequi soluta provident! Fugit, tempora.'
    },
    {
        image: {
            'vertical': './img/2_v.jpg',
            'horizontal': './img/2_h.jpg',
        },
        title: 'Lorem ipsum dolor sit amet (2)',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, aspernatur.'
    },
    {
        image: {
            'vertical': './img/3_v.jpg',
            'horizontal': './img/3_h.jpg',
        },
        title: 'Voluptates, reprehenderit sequi (3)',
        text: 'Voluptates, reprehenderit sequi soluta provident! Fugit, tempora.'
    }
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
                style={{ width: '100vw', height: '100vh' }}
                slides={[ slides[0].image[imgOrientation], slides[1].image[imgOrientation], slides[2].image[imgOrientation], slides[3].image[imgOrientation] ]}
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
        <div className={`slide-text ${props.fadeIn ? fadeIn : fadeOut}`}>
            <h2 className="slide-text-title">{props.slide.title}</h2>
            <p className="slide-text-desc">{props.slide.text}</p>
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
