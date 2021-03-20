
export default class OauthClient {
    get name() {
        throw new Error('Method "name" not implemented!');
    }

    authorize() {
        throw new Error('Method "authorize" not implemented!');
    }

    async token( code = null ) {
        throw new Error('Method "getToken" not implemented!');
    }

    async refreshToken() {
        throw new Error('Method "refreshToken" not implemented!');
    }

    logout() {
        throw new Error('Method "logout" not implemented!');
    }
    /*constructor( ownerName ) {
        this.emitter = new EventEmitter();
        this.axios = axios.create({
            baseURL: `https://shikimal.000webhostapp.com/${ownerName}`,
        });
        this.ownerName = ownerName;
        this.onGetAuthCode = this.onGetAuthCode.bind(this);
        this.onGetTokens = this.onGetTokens.bind(this);

        window.emitter.on(`auth-${ownerName}`, this.onGetAuthCode);

        this.tokenStr = null;
        this.refreshTokenStr = null;
    }

    static ownerNameList() {
        return [
            'shikimori',
            'myanimelist'
        ];
    }

    async authorize() {
        await this.axios.get('/get-auth-url.php')
        .then( response => response.data )
        .then( json => {
            if ( json.type === 'error' ) {
                console.error('Error on get auth URL. ' + json.msg);
                return;
            }
            return decodeURIComponent(json.url);
        })
        .then( url => window.open(url,this.ownerName, 'height=670,width=1400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no'))
        .catch( error => console.error(error) );
    }

    async token() {
        if ( this.tokenStr ) {
            return this.tokenStr;
        }
        else if ( this.refreshTokenStr ) {
            return await this.refreshToken();
        }
        else {
            return null;
        }
    }

    async refreshToken() {
        await this.axios.post('/refresh-token.php', { 'refresh-token': this.refreshTokenStr })
        .then( response => response.data )
        .then( json => {
            if ( json.type === 'error' ) {
                console.error('Error on get auth URL. ' + json.msg);
                return;
            }

            this.tokenStr = json['Access Token'];
            this.refreshTokenStr = json['Refresh Token'];
        });
    }

    async onGetAuthCode( code ) {
        console.log('code: ', code)
        await this.axios.post('/get-token.php', { code })
        .then( response => response.data )
        .then( json => {
            if ( json.type === 'error' ) {
                console.error('Error on get auth URL. ' + json.msg);
                return;
            }

            this.tokenStr = json['Access Token'];
            this.refreshTokenStr = json['Refresh Token'];
            console.log('DONE!');
            console.log('JSON: ', json);
        })
        .catch( error => console.error(error) );
    }

    onGetTokens( obj ) {

    }*/
}