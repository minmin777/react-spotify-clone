export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://react-spotify-clone-8858c.web.app/";

const clientId = "023990a6af3e42eb814a3a3937991376";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
];

export const getTokenFromUrl = () => {
    return window.location.hash.substring(1).split('&').reduce((initial, item) => {
        let parts = item.split('='); 
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial; 
    }, {}); // pulling token
    
}
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`