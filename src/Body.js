import React from 'react';
import "./Body.css";
import Header from './Header'; 
import {useStateValue } from "./data layer/DataLayer";
import { Favorite, MoreHoriz, PlayCircleFilled } from '@material-ui/icons';
import SongRow from "./SongRow";

function Body({spotify}) {

    const [{ currentPlaylist, device }, dispatch] = useStateValue();

    const playPlaylist = (id, device) => {
        console.log("play playlist device", device)
        spotify.play({ context_uri: `spotify:playlist:${id}`, device_id: device?.id}).then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
                dispatch({
                    type: 'SET_ITEM',
                    item: r.item,
                });
                dispatch({
                    type: 'SET_PLAYING',
                    playing: true,
                });
            });
        });
    };

    const playSong = (id) => {
        console.log("track id: ", id)
        spotify
          .play({
            uris: [`spotify:track:${id}`],
            device_id: device?.id
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };
    return (
        <div className="body">
            <Header spotify={spotify} />
            <div className="body_info">
                <img src={currentPlaylist?.images[0].url} alt=""></img>
                <div className="body_infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{currentPlaylist?.name}</h2>
                    <p>{currentPlaylist?.description}</p>
                </div>
            </div>

            <div className="body_songs">
                <div className="body_icons">
                    <PlayCircleFilled className="body_shuffle" onClick={() => playPlaylist(currentPlaylist?.id, device)}/>
                    <Favorite fontSize="large" />
                    <MoreHoriz />
                </div>

                {currentPlaylist?.tracks.items.map(item => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}

            </div>
        </div>
    )
}

export default Body
