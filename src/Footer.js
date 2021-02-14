import React, { useEffect } from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import {useStateValue } from "./data layer/DataLayer";

function Footer({ spotify }) {
    const [{ item, playing, shuffle, repeat, device }, dispatch] = useStateValue();

    useEffect(() => {
        
        spotify.getMyCurrentPlaybackState().then((r) => {
            console.log("current playback state", r);
            dispatch({
                type: 'SET_PLAYING',
                playing: r.is_playing,
            });
            dispatch({
                type: 'SET_ITEM',
                item: r.item,
            });
            dispatch({
                type: 'SET_SHUFFLE',
                shuffle: r.shuffle_state,
            });
            dispatch({
                type: 'SET_REPEAT',
                repeat: r.repeat_state,
            })
        });
    }, [spotify, dispatch]);

    const handlePlayPause = () => {
        if (playing){
            spotify.pause({device_id: device?.id});
            dispatch({
                type: 'SET_PLAYING',
                playing: false,
            });
        }else{
            spotify.play({device_id: device?.id});
            dispatch({
                type: 'SET_PLAYING',
                playing: true,
            });
        }
    };

    const handleShuffle = () => {
        if (shuffle) {
            spotify.setShuffle(false, {device_id: device?.id});
            dispatch({
                type: 'SET_SHUFFLE',
                shuffle: false,
            });
        }else {
            spotify.setShuffle(true, { device_id: device?.id });
            dispatch({
                type: 'SET_SHUFFLE',
                shuffle: true,
            });
        }
    }

    const handleRepeat = () => {
        // {String} state A string set to 'track', 'context' or 'off'.
        if (repeat === "off"){
            spotify.setRepeat("context", { device_id: device?.id });
            dispatch({
                type: 'SET_REPEAT',
                repeat: "context",
            });
        }else{
            spotify.setRepeat("off", { device_id: device?.id });
            dispatch({
                type: 'SET_REPEAT',
                repeat: "off",
            });
        }
    }

    const skipNext = () => {
        spotify.skipToNext({device_id: device?.id });
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: 'SET_ITEM',
                item: r.item,
            });
            dispatch({
                type: 'SET_PLAYING',
                item: true,
            });
        });
    }

    const skipPrevious = () => {
        spotify.skipToPrevious({ device_id: device?.id });
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: 'SET_ITEM',
                item: r.item,
            });
            dispatch({
                type: 'SET_PLAYING',
                item: true,
            });
        });
    }
    return (
        <div className="footer">
            <div className="footer_left">
                
                {item ? <div className="footer_songInfo">
                <img className="footer_albumLogo" src={item?.album.images[0].url} alt={item?.name} />
                    <h4>{item?.name}</h4>
                    <p>{item?.artists.map((artist) => artist.name).join(", ")}</p>
                </div> : <div className="footer_songInfo">
                <img className="footer_albumLogo" src="" alt="" />
                    <h4>No song is playing</h4>
                    <p>...</p>
                </div>}
                
            </div>

            <div className="footer_center">
                <ShuffleIcon  onClick={handleShuffle} style={shuffle ? {color: "#1ed15e"} : {color: "white"}}/>
                <SkipPreviousIcon  onClick={skipPrevious} className="footer_icon"/>
                {playing ? <PauseCircleOutlineIcon fontSize="large" className="footer_icon" onClick={handlePlayPause} /> : <PlayCircleOutlineIcon fontSize="large" className="footer_icon" onClick={handlePlayPause}/>}
                <SkipNextIcon  onClick={skipNext} className="footer_icon"/>
                <RepeatIcon onClick={handleRepeat} style={repeat === "off" ? {color: "white"} : {color: "#1ed15e"}}/>
            </div>

            <div className="footer_right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
