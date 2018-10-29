// spec.js

import EmailPage from '../pages/emailPage';
import EmailType from '../models/emailTypeModel';
import ModulesPage from '../pages/modulesPage';
import ModuleSettings from '../models/moduleSettingsModel';

const emailPage = new EmailPage();
const emailType = new EmailType();
const modulesPage = new ModulesPage();
const moduleSettings = new ModuleSettings();

var path = require('path');

describe('Integr8tor Demo App', function() {

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get('http://testing.dev.edvantis.tk');
      });

    it('should have a title Dashboard | Integr8tor', function() {
      expect(browser.getTitle()).toEqual('Dashboard | Integr8tor');
    });

    it('should navigate to Navbar->Mail Settings', function() {
        element(by.xpath("//*[@class='navbar-toggler-icon']")).click();
        element(by.xpath("//*[@class='dropdown-menu dropdown-menu-right show']//a[@href='/settings/emails']")).click();
        let text = element(by.css("h2")).getText();

        expect(text).toEqual('Emails Settings');
      });

    it('should navigate to Navbar->Modules Settings', function() {
        element(by.xpath("//*[@class='navbar-toggler-icon']")).click();
        element(by.xpath("//*[@class='dropdown-menu dropdown-menu-right show']//a[@href='/settings/modules']")).click();
        let text = element(by.css("h2")).getText();

        expect(text).toEqual('Modules Settings');
    });

    it('should upload client logo', function() {
        element(by.css('.img-fluidd')).click();

        var remote = require('/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/remote');
        browser.setFileDetector(new remote.FileDetector());

        let fileName = 'test.png';
        var fileToUpload = `/Users/rodion.savchuk/integr8tor_tests/files/${fileName}`;
        var absolutePath = path.resolve(__dirname, fileToUpload);

        var fileElem = element(by.css('input[type="file"]'));

        // Unhide file input
        browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", fileElem.getWebElement());

        fileElem.sendKeys(absolutePath);

        element(by.css('.btn-primary')).click();

        // TODO
        // will add assertion after notifications implementation
    });

    it('should save email settings', function() {
        emailPage.goto();
        emailPage.clickSelect();
        emailPage.selectType('smtp');
        emailPage.fillServerField(emailType.server);
        emailPage.fillPortField(emailType.port);
        emailPage.clickYesRadio();
        emailPage.fillUserField(emailType.user);
        emailPage.fillPasswordField(emailType.password);
        emailPage.clickSave();

        emailPage.clickSelect();
        emailPage.selectType('example');

        expect(emailPage.userField.getAttribute('value')).not.toMatch(emailType.user);

        emailPage.goto();
        emailPage.clickSelect();
        emailPage.selectType('smtp');

        expect(emailPage.serverField.getAttribute('value')).toMatch(emailType.server);
        expect(emailPage.portField.getAttribute('value')).toMatch(emailType.port);
        expect(emailPage.userField.getAttribute('value')).toMatch(emailType.user);
        expect(emailPage.passwordField.getAttribute('value')).toMatch(emailType.password);
    });

    it('should enable and save module settings', function() {
        modulesPage.goto();
        modulesPage.clickSelect();
        modulesPage.clickOnFirstModuleInSelect();
        modulesPage.setCheckBox();
        modulesPage.fillDatabaseField(moduleSettings.database);
        modulesPage.fillPathField(moduleSettings.path);
        modulesPage.fillFriendlyNameField(moduleSettings.friendlyName);
        modulesPage.clickSaveButton();
        modulesPage.goto();

        expect(modulesPage.checkModuleInListByName(moduleSettings.friendlyName)).toBeTruthy();
        expect(modulesPage.databaseField.getAttribute('value')).toMatch(moduleSettings.database);
        expect(modulesPage.pathField.getAttribute('value')).toMatch(moduleSettings.path);
        expect(modulesPage.friendlyNameField.getAttribute('value')).toMatch(moduleSettings.friendlyName);
    });

    it('should upload a module icon', function() {
        modulesPage.goto();
        modulesPage.clickSelect();
        modulesPage.clickOnFirstModuleInSelect();

        var remote = require('/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/remote');
        browser.setFileDetector(new remote.FileDetector());

        let fileName = 'test.png';
        var fileToUpload = `/Users/rodion.savchuk/integr8tor_tests/files/${fileName}`;
        var absolutePath = path.resolve(__dirname, fileToUpload);

        var fileElem = modulesPage.fileElem;

        browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", fileElem.getWebElement());

        fileElem.sendKeys(absolutePath);
        modulesPage.clickSaveButton();

        // TODO
        // will add assertion after notifications implementation
    });
  });