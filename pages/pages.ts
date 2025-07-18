const { I } = inject();

export default class Page {
    private readonly url: string;
    
    constructor(url) {
        this.url = url;
    }

    open(): void {
        I.amOnPage(this.url);
    }

    waitForOpened(): void {
        I.seeInCurrentUrl(this.url);
    }

    pause<T extends Page>(page: T) : T {
        pause()
        return page
    }
    
}