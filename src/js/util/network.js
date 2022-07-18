
var networkManager = null;
export default class NetworkManager {
    static getInstance() {
        if( networkManager == null ) {
            networkManager = new NetworkManager();
        }
        return networkManager;
    }
}