// spec.js
var path = require('path');

describe('Integr8tor Demo App', function() {

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get('http://127.0.0.1:8000');
      });

    it('should have a title', function() {  
      expect(browser.getTitle()).toEqual('Vue SPA Demo');
    });

    it('should open Navbar->Mail Settings', function() {
        element(by.xpath("//*[@class='navbar-toggler-icon']")).click();
        element(by.xpath("//*[@class='dropdown-menu dropdown-menu-right show']//a[@href='/settings/emails']")).click();
        let text = element(by.css("h2")).getText();

        expect(text).toEqual('Email Settings');
      });

    it('should open Navbar->Modules Settings', function() {
        element(by.xpath("//*[@class='navbar-toggler-icon']")).click();
        element(by.xpath("//*[@class='dropdown-menu dropdown-menu-right show']//a[@href='/settings/modules']")).click();
        let text = element(by.css("h2")).getText();

        expect(text).toEqual('Module Settings');
    });

    it('should upload a file', function() {
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
  });