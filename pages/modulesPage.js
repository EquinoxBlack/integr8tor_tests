import BasePage from '../pages/basePage';

export default class ModulesPage extends BasePage {
    constructor() {
        super();
        this.typeSelect = element(by.id('type'));
        this.moduleSelectOptionXpath = ".//*[@id='type']//*[contains(text(),'%s')]";
        this.firstModuleInSelect = element(by.xpath("//*[@id='type']//*[1]"));
        this.enabledCheckbox = element(by.xpath("//div[@id='enabled']//label[@class='custom-control-label']"));
        this.databaseField = element(by.id('databaseName'));
        this.pathField = element(by.id('path'));
        this.friendlyNameField = element(by.id('friendlyName'));
        this.fileElem = element(by.css('#icon'));
        this.submitButton = element(by.css('.float-right'));
        this.moduleByNameXpath = "//a[@href='/settings/modules'][contains(text(),'%s')]";

        this.url = 'http://localhost:8000/settings/modules';
    }

    clickSelect() {
        return this.typeSelect.click();
    }

    selectModule(module) {
        let el = this.moduleSelectOptionXpath.replace('%s', module);
        return element(by.xpath(el)).click();
    }

    clickOnFirstModuleInSelect() {
        return this.firstModuleInSelect.click();
    }

    setCheckBox(){
        return this.enabledCheckbox.click();
    }

    fillDatabaseField(database) {
        this.databaseField.clear();
        return this.databaseField.sendKeys(database);
    }

    fillPathField(path) {
        this.pathField.clear();
        return this.pathField.sendKeys(path);
    }

    fillFriendlyNameField(name) {
        this.friendlyNameField.clear();
        return this.friendlyNameField.sendKeys(name);
    }

    clickSaveButton() {
        return this.submitButton.click();
    }

    checkModuleInListByName(moduleName) {
        let el = this.moduleByNameXpath.replace('%s', moduleName);
        return element(by.xpath(el)).isPresent();
    }
}