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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PharmaService } from './Pharma.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-pharma',
  templateUrl: './Pharma.component.html',
  styleUrls: ['./Pharma.component.css'],
  providers: [PharmaService]
})
export class PharmaComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  PharmaID = new FormControl('', Validators.required);
  route = new FormControl('', Validators.required);
  Name = new FormControl('', Validators.required);
  drugs = new FormControl('', Validators.required);

  constructor(public servicePharma: PharmaService, fb: FormBuilder) {
    this.myForm = fb.group({
      PharmaID: this.PharmaID,
      route: this.route,
      Name: this.Name,
      drugs: this.drugs
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePharma.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.dcpl.drugscirc.phrms.Pharma',
      'PharmaID': this.PharmaID.value,
      'route': this.route.value,
      'Name': this.Name.value,
      'drugs': this.drugs.value
    };

    this.myForm.setValue({
      'PharmaID': null,
      'route': null,
      'Name': null,
      'drugs': null
    });

    return this.servicePharma.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'PharmaID': null,
        'route': null,
        'Name': null,
        'drugs': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.dcpl.drugscirc.phrms.Pharma',
      'route': this.route.value,
      'Name': this.Name.value,
      'drugs': this.drugs.value
    };

    return this.servicePharma.updateAsset(form.get('PharmaID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePharma.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePharma.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'PharmaID': null,
        'route': null,
        'Name': null,
        'drugs': null
      };

      if (result.PharmaID) {
        formObject.PharmaID = result.PharmaID;
      } else {
        formObject.PharmaID = null;
      }

      if (result.route) {
        formObject.route = result.route;
      } else {
        formObject.route = null;
      }

      if (result.Name) {
        formObject.Name = result.Name;
      } else {
        formObject.Name = null;
      }

      if (result.drugs) {
        formObject.drugs = result.drugs;
      } else {
        formObject.drugs = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'PharmaID': null,
      'route': null,
      'Name': null,
      'drugs': null
      });
  }

}
