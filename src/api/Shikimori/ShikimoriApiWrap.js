import IApiWrap from "../IApiWrap";
import ShikimoriApi from "./ShikimoriApi";

export default class ShikimoriApiWrap extends IApiWrap {
    async user() {
        return ShikimoriApi.Users.whoAmI().then(data => ({
            id: data.id,
            nickname: data.nickname,
            picSrc: data.avatar
        }));
    }
}