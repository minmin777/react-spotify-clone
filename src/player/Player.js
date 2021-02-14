import React from 'react';
import Sidebar from "../Sidebar";
import "./Player.css";
import Body from "../Body";
import Footer from '../Footer';

function Player({ spotify }) {
    return (
        <div className="player">
            <div className= "player_body">
                <Sidebar spotify={spotify}/>
                <Body spotify={spotify} />
                {/* Sidebar */}
            {/* Body */}
            </div>
            
            {/* Footer */}
            <Footer spotify={spotify} />
        </div>
    )
}

export default Player
