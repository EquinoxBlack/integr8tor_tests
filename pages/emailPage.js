import BasePage from '../pages/basePage';

export default class EmailPage extends BasePage {
    constructor() {
        super();
        this.typeSelect = element(by.id('type'));
        this.typeSelectOptionXpath = ".//*[@id='type']//*[contains(text(),'%s')]";
        this.serverField = element(by.id('server'));
        this.portField = element(by.id('port'));
        this.userField = element(by.id('user'));
        this.passwordField = element(by.id('password'));
        this.yesRadioButton = element(by.xpath("//*[@class='custom-control-label']//*[contains(text(),'Yes')]"));
        this.noRadioButton = element(by.xpath("//*[@class='custom-control-label']//*[contains(text(),'No')]"));
        this.submitButton = element(by.css('.float-right'));

        this.url = 'http://localhost:8000/settings/emails';
    }

    clickSelect() {
        return this.typeSelect.click();
    }

    selectType(type) {
        let el = this.typeSelectOptionXpath.replace('%s', type);
        return element(by.xpath(el)).click();
    }

    fillServerField(server) {
        this.serverField.clear();
        return this.serverField.sendKeys(server);
    }

    fillPortField(port) {
        this.portField.clear();
        return this.portField.sendKeys(port);
    }

    fillUserField(user) {
        this.userField.clear();
        return this.userField.sendKeys(user);
    }

    fillPasswordField(pass) {
        this.passwordField.clear();
        return this.passwordField.sendKeys(pass);
    }

    clickYesRadio() {
        return this.yesRadioButton.click();
    }

    clickNoRadio() {
        return this.noRadioButton.click();
    }

    clickSave() {
        return this.submitButton.click();
    }
}