import React from 'react';
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateValue } from './data layer/DataLayer';

function Sidebar({spotify}) {
    const [{ playlists, currentPlaylist }, dispatch ] = useStateValue();

    const setPlaylist = (id) => {
      spotify.getPlaylist(`${id}`).then((discover) => {
        console.log("playlist regular", discover)
        dispatch({
          type: 'SET_PLAYLIST',
          playlist: discover,
        })
      })
    }
    return (
        <div className="sidebar">
            <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption option="Home" Icon={HomeIcon} />
      <SidebarOption option="Search" Icon={SearchIcon}/>
      <SidebarOption option="Your Library" Icon={LibraryMusicIcon} />
      <br></br>
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption option={playlist.name} id={playlist.id} setPlaylist={setPlaylist}/>
      ))}
      
        </div>
    )
}

export default Sidebar
