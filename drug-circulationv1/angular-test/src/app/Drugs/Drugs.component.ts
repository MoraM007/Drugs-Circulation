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
import { DrugsService } from './Drugs.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-drugs',
  templateUrl: './Drugs.component.html',
  styleUrls: ['./Drugs.component.css'],
  providers: [DrugsService]
})
export class DrugsComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  drugId = new FormControl('', Validators.required);
  Owner = new FormControl('', Validators.required);
  OwnershipType = new FormControl('', Validators.required);
  Name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  Description = new FormControl('', Validators.required);
  prescription = new FormControl('', Validators.required);
  SideEffects = new FormControl('', Validators.required);
  Expire = new FormControl('', Validators.required);

  constructor(public serviceDrugs: DrugsService, fb: FormBuilder) {
    this.myForm = fb.group({
      drugId: this.drugId,
      Owner: this.Owner,
      OwnershipType: this.OwnershipType,
      Name: this.Name,
      price: this.price,
      Description: this.Description,
      prescription: this.prescription,
      SideEffects: this.SideEffects,
      Expire: this.Expire
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDrugs.getAll()
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
      $class: 'org.dcpl.drugscirc.drugs.Drugs',
      'drugId': this.drugId.value,
      'Owner': this.Owner.value,
      'OwnershipType': this.OwnershipType.value,
      'Name': this.Name.value,
      'price': this.price.value,
      'Description': this.Description.value,
      'prescription': this.prescription.value,
      'SideEffects': this.SideEffects.value,
      'Expire': this.Expire.value
    };

    this.myForm.setValue({
      'drugId': null,
      'Owner': null,
      'OwnershipType': null,
      'Name': null,
      'price': null,
      'Description': null,
      'prescription': null,
      'SideEffects': null,
      'Expire': null
    });

    return this.serviceDrugs.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'drugId': null,
        'Owner': null,
        'OwnershipType': null,
        'Name': null,
        'price': null,
        'Description': null,
        'prescription': null,
        'SideEffects': null,
        'Expire': null
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
      $class: 'org.dcpl.drugscirc.drugs.Drugs',
      'Owner': this.Owner.value,
      'OwnershipType': this.OwnershipType.value,
      'Name': this.Name.value,
      'price': this.price.value,
      'Description': this.Description.value,
      'prescription': this.prescription.value,
      'SideEffects': this.SideEffects.value,
      'Expire': this.Expire.value
    };

    return this.serviceDrugs.updateAsset(form.get('drugId').value, this.asset)
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

    return this.serviceDrugs.deleteAsset(this.currentId)
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

    return this.serviceDrugs.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'drugId': null,
        'Owner': null,
        'OwnershipType': null,
        'Name': null,
        'price': null,
        'Description': null,
        'prescription': null,
        'SideEffects': null,
        'Expire': null
      };

      if (result.drugId) {
        formObject.drugId = result.drugId;
      } else {
        formObject.drugId = null;
      }

      if (result.Owner) {
        formObject.Owner = result.Owner;
      } else {
        formObject.Owner = null;
      }

      if (result.OwnershipType) {
        formObject.OwnershipType = result.OwnershipType;
      } else {
        formObject.OwnershipType = null;
      }

      if (result.Name) {
        formObject.Name = result.Name;
      } else {
        formObject.Name = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.Description) {
        formObject.Description = result.Description;
      } else {
        formObject.Description = null;
      }

      if (result.prescription) {
        formObject.prescription = result.prescription;
      } else {
        formObject.prescription = null;
      }

      if (result.SideEffects) {
        formObject.SideEffects = result.SideEffects;
      } else {
        formObject.SideEffects = null;
      }

      if (result.Expire) {
        formObject.Expire = result.Expire;
      } else {
        formObject.Expire = null;
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
      'drugId': null,
      'Owner': null,
      'OwnershipType': null,
      'Name': null,
      'price': null,
      'Description': null,
      'prescription': null,
      'SideEffects': null,
      'Expire': null
      });
  }

}
