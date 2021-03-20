
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
}