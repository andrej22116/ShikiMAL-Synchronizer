import { action, autorun, makeObservable, observable } from "mobx";

//export default buildPopupWindow;

export default class OauthWindow {
    constructor ( name, url ) {
        const windowOption = 
            "height=670,width=1400,toolbar=no," +
            "menubar=no,scrollbars=no,resizable=no," +
            "location=no,directories=no,status=no";
        this.window = window.open(url,name, windowOption);

        this.isClosed = false;
        makeObservable(this, {
            isClosed: observable,
            setClosed: action
        });

        this.intervalId = setInterval(() => {
            if ( this.window.closed ) {
                clearInterval(this.intervalId);
                this.setClosed();
            }
        }, 1000);

        autorun(
            () => {
                console.log(`Is closed: ${this.isClosed}`);
            }
        )
    }

    setClosed() {
        this.isClosed = true;
    }
};