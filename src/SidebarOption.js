import React from 'react';
import "./SidebarOption.css";

function SidebarOption({ option, Icon, id, setPlaylist}) {
    return (
        <div className="sidebarOption" onClick={() => setPlaylist(id)}>
            {Icon && <Icon className="sidebarOption_icon" />}
            {Icon ? <h4>{option}</h4> : <p>{option}</p>}
        </div>
    )
}

export default SidebarOption
