import './App.css';
import React, { useEffect, useState } from "react";
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './player/Player';
import { useStateValue } from './data layer/DataLayer';


const spotify = new SpotifyWebApi();
function App() {

  const [{ user, token }, dispatch] = useStateValue();


  // run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    
    window.location.hash = "";

    const _token = hash.access_token;
  
    

    if(_token) {
      // setToken(_token);
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        console.log('user', user);
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log("playlists ", playlists)
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        })
      });

      spotify.getPlaylist('37i9dQZEVXcHkkCvYd1MPC').then((discover) => {
        console.log("playlist discover", discover)
        dispatch({
          type: 'SET_PLAYLIST',
          playlist: discover,
        })
      })

      spotify.getMyDevices().then((res) => {
        console.log("my devices ", res);
        for(var i = 0; i < res.devices.length; i++){
          console.log("device loop", res.devices[i])
          if(res.devices[i].name === "Web Player (Chrome)"){
            dispatch({
              type:'SET_DEVICE',
              device: res.devices[i],
            })
          }
        }
      });
    }

    console.log("Token -> ", token);
    // return () => {
    //   cleanup
    // }
  }, [token, dispatch]) // input is it will run the first time app loads but if the variable changes then function will run again

  console.log("User outside", user);
  console.log("token outside", token);
  return (
    <div className="App">
      {
        token ? (<Player spotify={spotify} />) : (<Login />)
      }
      {/* <Login/> */}
    </div>
  );
}

export default App;
