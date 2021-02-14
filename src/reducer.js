export const initialState = {
    user: null,
  playlists: [],
  spotify: null,
  //discover_weekly: null,
  top_artists: null,
  playing: false,
  item: null,
  shuffle: false,
 token: null,
 repeat: "",
 currentPlaylist: null,
 device: null,
};

const reducer = (state, action) => { // action is action, data
    console.log(action);
    // Action -> type , [payload]
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            }
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            }
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing,
            }
        case 'SET_ITEM':
            return {
                ...state,
                item: action.item,
            }
        case 'SET_TOP_ARTISTS':
            return {
                ...state,
                top_artists: action.top_artists,
            }
        case 'SET_SPOTIFY': {
            return {
                ...state,
                spotify: action.spotify,
            }
        }
        case 'SET_SHUFFLE': {
            return {
                ...state, 
                shuffle: action.shuffle,
            }
        }
        case 'SET_REPEAT': {
            return {
                ...state, 
                repeat: action.repeat,
            }
        }
        case 'SET_PLAYLIST': {
            return {
                ...state,
                currentPlaylist: action.playlist
            }
        }
        case 'SET_DEVICE': {
            return {
                ...state,
                device: action.device,
            }
        }
        default:
            return state;
    }
};

export default reducer;

