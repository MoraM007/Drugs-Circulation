/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-test', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-test', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-test');
    })
  });

  it('network-name should be hlf-course-api@1.0.0',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('hlf-course-api@1.0.0.bna');
    });
  });

  it('navbar-brand should be angular-test',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-test');
    });
  });

  
    it('Drugs component should be loadable',() => {
      page.navigateTo('/Drugs');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Drugs');
      });
    });

    it('Drugs table should have 10 columns',() => {
      page.navigateTo('/Drugs');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Pharma component should be loadable',() => {
      page.navigateTo('/Pharma');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Pharma');
      });
    });

    it('Pharma table should have 5 columns',() => {
      page.navigateTo('/Pharma');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('DCPLNetworkAdmin component should be loadable',() => {
      page.navigateTo('/DCPLNetworkAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DCPLNetworkAdmin');
      });
    });

    it('DCPLNetworkAdmin table should have 3 columns',() => {
      page.navigateTo('/DCPLNetworkAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('DCPLPersonnel component should be loadable',() => {
      page.navigateTo('/DCPLPersonnel');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DCPLPersonnel');
      });
    });

    it('DCPLPersonnel table should have 4 columns',() => {
      page.navigateTo('/DCPLPersonnel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('B2BPartner component should be loadable',() => {
      page.navigateTo('/B2BPartner');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('B2BPartner');
      });
    });

    it('B2BPartner table should have 3 columns',() => {
      page.navigateTo('/B2BPartner');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreatePharma component should be loadable',() => {
      page.navigateTo('/CreatePharma');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreatePharma');
      });
    });
  

});