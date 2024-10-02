const initialState = {
    tabIndex: 0,
    unreadAlert: false,
    unreadOffer: false,
    alerts: [],
    newAlert: null,
};

export function MyReducer(state = initialState, action) {
    // console.log('MyReducer Payload: ' + JSON.stringify(action.payload));
    switch (action.type) {
        case 'setTabIndex':
            return {
                ...state,
                tabIndex: action.payload
            };
        case 'setNewAlert':
            return {
                ...state,
                newAlert: action.payload
            };
        case 'setUnreadOffer':
            return {
                ...state,
                unreadOffer: action.payload
            };
        case 'setUnreadAlert':
            return {
                ...state,
                unreadAlert: action.payload
            };
        case 'setAlerts':
            return {
                ...state,
                alerts: action.payload
            };

        default:
            return state;
    }
}