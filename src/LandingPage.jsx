import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css'
const LandingPage = () => {
    return (
        <div className="relative">
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
                <source src="video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="overlay flex flex-col items-center justify-center text-center px-4">
                <div className="text-white mb-40 flex flex-col justify-center">
                    <h1 className="text-6xl font-bold">HARSH JOSHI</h1>
                    <h1 className="text-4xl font-light mt-10">3D ARTIST</h1>
                </div>
                <div className="mb-4 flex flex-row items-center justify-between w-full">
                    {/* Use Link instead of anchor tag */}
                    <Link to="/artwork" className="btn inline-block text-white text-center uppercase tracking-wider px-4 py-2 transition-all duration-300 ease-in-out hover:text-yellow-300 rounded-xl mx-2">
                        <span className="relative z-10">MY ARTWORK</span>
                    </Link>
                    <Link to="/youtube" className="btn inline-block text-white text-center uppercase tracking-wider px-4 py-2 transition-all duration-300 ease-in-out hover:text-yellow-300 rounded-xl mx-2">
                        <span className="relative z-10">YOUTUBE CHANNEL</span>
                    </Link>
                    <Link to="/freelance" className="btn inline-block text-white text-center uppercase tracking-wider px-4 py-2 transition-all duration-300 ease-in-out hover:text-yellow-300 rounded-xl mx-2">
                        <span className="relative z-10">FREELANCE WORK</span>
                    </Link>
                </div>
            </div>

            <div className="bg-black text-white py-20 px-4">
                <div className="text-center">
                    <h2 className="text-3xl mb-4">ABOUT</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat officiis rem laborum, incidunt ad alias deserunt quasi excepturi cumque illum?</p>
                </div>
                <div className="flex items-center justify-center gap-10 w-full mt-10">
                    <a href="./page1.html" className="mx-4">
                        <img src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png" alt="Logo 1" className="h-10" />
                    </a>
                    <a href="./page2.html" className="mx-4">
                        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png" alt="Logo 2" className="h-10" />
                    </a>
                    <a href="https://www.artstation.com/harshrjoshi" className="mx-4">
                       
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
