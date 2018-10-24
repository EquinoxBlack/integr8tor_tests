export default class BasePage {
    constructor() {
        /**
         * wrap this.timeout. (ms) in t-shirt sizes
         */
        this.timeout = {
            'xs': 420,
            's' : 1000,
            'm' : 2000,
            'l' : 5000,
            'xl': 9000,
            'xxl': 15000
        };

        /**
         * get an element's width
         * extends protractor's ElementFinder
         * @return {int} - the width of the element
         */
        protractor.ElementFinder.prototype.getWidth = function() {
            return this.getSize().then(size => {
                return size.width;
            });
        };
    }

    /**
     * navigate to a page via it's `url` var
     * and verify/wait via loaded()
     */
    goto() {
        browser.get(this.url, this.timeout.xl);
    }

    compareCurrentUrl(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    inDom(locator) {
        return protractor.ExpectedConditions.presenceOf(locator);
    }

    notInDom(locator) {
        return protractor.ExpectedConditions.stalenessOf(locator);
    }
}