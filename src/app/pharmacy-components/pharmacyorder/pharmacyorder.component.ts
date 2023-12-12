import { Component, OnInit, ViewEncapsulation, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {PharmacyService } from "../../services/pharmacy.service"
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Meta, Title} from '@angular/platform-browser';


@Component({
  selector: 'app-pharmacyorder',
  templateUrl: './pharmacyorder.component.html',
  styleUrls: ['./pharmacyorder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PharmacyorderComponent implements OnInit {
  form: FormGroup;
  @Input() branchList;
  // branchAddress = false;
  // markers = [];
  // image;
  // content;
  wrongNumber = false;
  passwordIncorrect = false;
  checkUser = false;
  checkUserReg = false;
  // delivery = [ 'Pick up', 'Home Delivery'];
  // payment = ['Cash'];
  // modalRef: BsModalRef;
  // branchDetail = [];
  // defaultPharmacy = false;
  loginGif = false;
  loginGifBranch = false;
  defaultPromoNull = true;
  defaultPromoCode;
  defaultPromoValue;
  // defaultOfferNull = false;
  // defaultOfferCode;
  // defaultOfferValue;
  thumb_url = [];
  filesToUpload: Array<File> = [];
  anotherPromo;
  selectedOption ;
  selectedDeliveryOption;
  selectedPaymentOption = '1';
  delivery_flag ;
  payment_flag = '1';
  deliveryTypeText;
  paymentTypeText = 'Cash';
  pharmacyNameText;
  branchNameText;
  branch_id;
  email_exist = false;
  number_exist = false;
  showBranch = false;
  showPoints = false;
  checked_default;
  imagePath = environment.baseUrl;
  userInfo: any = [];
  pharmacies = [];
  pharmacyBranches: any = [];
  dropDownBranches: any = [];
  sehatPolicy = false;
  addresses = [];
  other_address = false ;
  loginUser = false;
  provinces = [];
  cities = [];
  cityId;
  provinceId;
  addressId;
  addressName;
  showDefaultAddress = false;
  pharmacyIndex;
  defaultPharmacy = false;
  defaultPharmacyBranchId;
  notUndefined = true;

  constructor(
    // private modalService: BsModalService,
    private pharmacyService: PharmacyService,
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastsManager,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Order Medicines Online - Most reliable online pharmacies & medical stores ');

    this.meta.addTags([
      {
        name: 'keywords',
        content: 'order medicine online, buy medicine online, online medical store, online chemists, Online Pharmacy, buy original medicine,  medicine delivery service, medicine delivery, online medical store'
      },
      {
        name: 'description',
        content: 'Buy medicines online and get it delivered at your doorsteps from chemists and medical stores. Hayaat.pk is the most reliable source to order medicines online in Pakistan. Buy medications, prescription drugs & healthcare products from the best online pharmacies in Pakistan.'
      },
    ]);
  }

  ngOnInit() {
    this.createForm();
    this.getOrderData();
  }

  getOrderData() {
    this.pharmacyService.getPharmacyOrderData().subscribe(
      (data) => {
        this.pharmacies = data['data']['pharmacies'];
        if (data['data']['promocode'] !== null) {
          this.defaultPromoCode = data['data']['promocode']['code'];
          if (data['data']['promocode']['promocodePercentages'][0] !== undefined) {
            this.defaultPromoValue = data['data']['promocode']['promocodePercentages'];
            this.notUndefined = false;
          } else {
            this.notUndefined = true;
          }
          this.defaultPromoNull = false;
        } else {
           this.defaultPromoNull = true;
        }
        if (data['data']['is_logged_in'] === true) {
          if(data['data']['previous_address'].length !== 0) {
            this.addresses = data['data']['previous_address'];
          } else {
            this.showDefaultAddress = true;
          }
          this.userInfo = data['data']['user'];
          this.loginUser = true;
        }else {
          this.loginUser = false;
          this.other_address = true;
          this.getProvince();
        }
        if (data['data']['previous_order']) {
          this.userInfo.id = data['data']['previous_order']['address_info']['id'];
          this.addressDropDownId(data['data']['previous_order']['address_info']['id']);
          this.payment_flag = data['data']['previous_order']['cash_payment'];
          this.selectedPaymentOption = data['data']['previous_order']['cash_payment'];
          if (data['data']['previous_order']['home_delivery'] == 1) {
            this.delivery_flag = '1';
            this.selectedDeliveryOption = data['data']['previous_order']['home_delivery'];
            this.showBranch = false;
            this.showPoints = true;
            this.deliveryTypeText = 'Home Delivery';
            this.branchNameText = '';
            this.branch_id = data['data']['previous_order']['branch_id'];
          } else if (data['data']['previous_order']['home_delivery'] == 0 && data['data']['default'] === null) {
            this.pharmacyService.pharmacyId = this.pharmacies[0]['id'];
            this.selectedOption = this.pharmacies[0]['id'];
            this.pharmacyBranchesList().then(() => {
              this.branch_id = this.pharmacyBranches[0]['id'];
            });
            this.selectedDeliveryOption = '0';
            this.delivery_flag = '0';
            this.showBranch = true;
            this.showPoints = false;
            this.deliveryTypeText = 'Pick up';
            this.branch_id = this.pharmacyBranches[0]['id'];
          } else {
            this.showBranch = true;
            this.showPoints = false;
            this.deliveryTypeText = 'Pick up';
            this.delivery_flag = '0';
          }
        }
        if (data['data']['default']) {
          this.defaultPharmacy = true;
          this.selectedOption = data['data']['default']['pharmacy_id'];
          this.pharmacyService.pharmacyId = data['data']['default']['pharmacy_id'];
          this.branch_id = data['data']['default']['branch_id'];
          this.defaultPharmacyBranchId = data['data']['default']['branch_id'];
          this.pharmacyBranchesList();
          if (this.showBranch === true) {
            this.selectedDeliveryOption = '0';
          }
          if (this.selectedOption == 5) {
            this.sehatPolicy = true;
          }
          const pharmacyName = this.pharmacies.find(x => x.id === data['data']['default']['pharmacy_id']);
          this.pharmacyNameText = pharmacyName.name;
          this.checked_default = true;
        }
        // else {
        //   this.branch_id = '';
        //   this.branchNameText = '';
        //   this.pharmacyService.pharmacyId = '';
        // }
      }
    );
  }
  activatePharmacyOption(i, id) {
    this.defaultPharmacy = false;
    this.pharmacyIndex = i;
    this.selectedOption = id;
    this.pharmacyService.pharmacyId = id;
    const pharmacyName = this.pharmacies.find(x => x.id === id);
    this.pharmacyNameText = pharmacyName.name;
    if (this.selectedDeliveryOption == '1') {
      this.branch_id = this.pharmacies[i]['main_id'];
    }
    if (this.selectedOption == 5) {
      this.sehatPolicy = true;
      this.pharmacyBranches = [];
      if (this.pharmacyBranches.length == 0) {
        this.pharmacyBranchesList();
      }
    } else {
      this.sehatPolicy = false;
      this.pharmacyBranches = [];
      if (this.pharmacyBranches.length == 0) {
        this.pharmacyBranchesList();
      }
    }
  }
  pharmacyBranchesList() {
    const promise = new Promise((resolve, reject) => {
      this.loginGifBranch = true;
      this.pharmacyService.pharmacyBranches().subscribe(
        (data) => {
          if (data['success'] === true) {
            this.loginGifBranch = false;
            this.dropDownBranches.push({id: '0', name: 'All'});
            data['data']['branches'].forEach((value) => {
              this.dropDownBranches.push(value);
            });
            this.pharmacyBranches = data['data']['branches'];
            resolve();
          }
        }
      );
    });
    return promise;
  }
  activateDeliveryOption(value) {
    if (this.selectedOption === undefined) {
      this.pharmacyError('Please select pharmacy first');
    } else {
      this.selectedDeliveryOption = value;
      this.delivery_flag = value;
      if (value === '0') {
        if (this.pharmacyBranches.length === 0) {
          this.pharmacyBranchesList();
        }
        this.showBranch = true;
        this.showPoints = false;
        this.deliveryTypeText = 'Pick up';
        this.branch_id = '';
      } else {
        this.showBranch = false;
        this.showPoints = true;
        this.deliveryTypeText = 'Home Delivery';
        this.branchNameText = '';
        if (this.defaultPharmacy === false) {
          this.branch_id = this.pharmacies[this.pharmacyIndex]['main_id'];
        } else {
          this.branch_id = this.defaultPharmacyBranchId;
        }
      }
    }
  }
  activatePaymentOption(value) {
    this.selectedPaymentOption = value;
    this.payment_flag = value;
    if (value === '1') {
      this.paymentTypeText = 'Cash';
    }
  }
  activateBranch(value) {
    this.branch_id = value;
    const branchName = this.dropDownBranches.find(x => x.id === value);
    this.branchNameText = branchName.name;
  }
  mainForm() {
    this.checkUser = false;
    this.checkUserReg = false;
  }
  dropDownId(id) {
    if (id === '0') {
      this.pharmacyBranches = [];
      this.dropDownBranches.forEach((value) => {
        this.pharmacyBranches.push(value);
      });
      this.pharmacyBranches.splice(0, 1);
    } else {
      this.pharmacyBranches = [];
      this.branch_id = id;
      const branchName = this.dropDownBranches.find(x => x.id === id);
      this.branchNameText = branchName.name;
      this.pharmacyBranches.push(this.dropDownBranches.find(x => x.id === id));
    }
  }
  addressDropDownId(id) {
    if (id == 0) {
      this.other_address = true;
      this.getProvince();
      this.addressId = '';
    } else {
      this.addressId = id;
      const addressObj = this.addresses.find(x => x.id === id );
      this.addressName = addressObj.address;
      this.other_address = false;
    }
  }
  getProvince() {
    this.pharmacyService.getProvinces().subscribe(
      (data) => {
        if(data['success'] = true) {
          this.provinces = data['data'];
        }
      }
    );
  }
  getProvinceId (id) {
    this.provinceId = id;
    this.pharmacyService.getCity(id).subscribe(
      (data) => {
        if(data['success'] = true) {
          this.cities = data['data']['cities'];
        }
      }
    );
  }
  getCityId(id) {
    this.cityId = id;
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required],
      defaultBranch: ['', Validators],
      terms: ['', Validators.required],
      coupon: ['', Validators],
      province: ['', Validators],
      city: ['', Validators],
      address_text: ['', Validators],
      avatar: null
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.filesToUpload = <Array<File>>event.target.files;
      this.form.get('avatar').setValue(this.filesToUpload);
      this.readUrl(event);
    }
  }
  readUrl(event: any) {
    this.thumb_url = [];
      for (let x = 0; x <= this.filesToUpload.length; x++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.thumb_url.push(e.target.result);
        };
        reader.readAsDataURL(event.target.files[x]);
      }
  }
  sendOrder(formData) {
    this.loginGif = true;
    if (formData.defaultBranch === true) {
      formData.defaultBranch = '1';
    } else if (formData.defaultBranch === false) {
      formData.defaultBranch = '0';
    }
    if (this.cookieService.check('token')) {
      if (this.delivery_flag === '' || this.branch_id === '' || this.selectedOption === undefined) {
        this.pharmacyError('Pleas select Pharmacy');
        this.loginGif = false;
      } else {
        if (this.delivery_flag === '0' && this.branch_id === '') {
          this.pharmacyError('Please select Branch');
          this.loginGif = false;
        } else {
          if (formData.avatar == null) {
            this.pharmacyError('Please Upload Prescription');
            this.loginGif = false;
          } else {
            const input = new FormData();
            if (formData.avatar !== null) {
              const files: Array<File> = this.filesToUpload;
              for (let x = 0; x <= files.length; x++) {
                input.append('prescription[]', files[x]);
              }
            }
            if (this.other_address == true && formData.address == '') {
              if (this.cityId == '' || this.cityId == undefined || this.provinceId == '' || this.provinceId == undefined || formData.address_text == '') {
                this.pharmacyError('Province, City and Address fields is required');
              } else {
                input.append('city_id', this.cityId);
                input.append('province_id', this.provinceId);
                input.append('address', formData.address_text);
                input.append('address_id', '');
              }
            } else {
              input.append('address_id', this.addressId);
              if (this.showDefaultAddress === true) {
                if (formData.address == null || formData.address == '') {
                  this.pharmacyError('Address Field Required');
                  this.loginGif = false;
                } else {
                  input.append('address', formData.address);
                }
              } else {
                input.append('address', this.addressName);
              }
            }

            input.append('mobile', formData.phone);
            input.append('is_default', formData.defaultBranch);
            if (formData.coupon === undefined || formData.coupon === '') {
            } else {
              input.append('promocode', formData.coupon);
            }
            input.append('cash_payment', this.payment_flag);
            input.append('is_home_delivery', this.delivery_flag);
            input.append('pharmacy_id', this.branch_id);
            const options = input;
            this.pharmacyService.submitOrder(options).subscribe(
              (orderResponseData: any[]) => {
                if (orderResponseData['success'] === true) {
                  this.pharmacySuccess(orderResponseData['message']);
                  this.loginGif = false;
                  this.router.navigate(['/user-profile']);
                  setTimeout(() => {
                    location.reload();
                  }, 200);
                }
              },
              (err) => {
                if (err instanceof HttpErrorResponse) {
                  this.loginGif = false;
                  if (err.status === 422) {
                    for (let x = 0; x <= err.error.promocode.length; x++) {
                      if (err.error.promocode[x] !== undefined) {
                        this.pharmacyError(err.error.promocode[x]);
                      }
                    }
                  } else {
                    this.pharmacyError(err.error.message);
                  }
                }
              }
            );
          }
        }
      }
    } else {
      if (formData.name === undefined || formData.email === undefined || formData.address === undefined || formData.phone === undefined) {
        this.pharmacyError('Please Fill Required Fields');
        this.loginGif = false;
      } else {
        if (formData.avatar == null) {
          this.pharmacyError('Please Upload Prescription');
        } else {
          if (this.delivery_flag === undefined) {
            this.pharmacyError('Please Select Pharmacy');
            this.loginGif = false;
          }
          if (this.cityId == '' || this.cityId == undefined || this.provinceId == '' || this.provinceId == undefined || formData.address_text == '') {
            this.pharmacyError('Province, City and Address fields is required');
            this.loginGif = false;
          }else {
            const params = 'username=' + formData.email + '&mobile=' + formData.phone;
            this.pharmacyService.checkUser(params).subscribe(
              (data: any[]) => {
                if (data['success'] === true) {
                  if (data['data']['email'] !== '') {
                    this.email_exist = true;
                  } else if (data['data']['mobile'] !== '') {
                    this.number_exist = true;
                  }
                  this.checkUser = true;
                  this.loginGif = false;
                } else if (data['success'] === false) {
                  this.checkUserReg = true;
                  this.loginGif = false;
                }
              },
              (err) => {
                if (err instanceof HttpErrorResponse) {
                  this.pharmacyError(err.error.message);
                  this.loginGif = false;
                }
              }
            );
          }
        }
      }
    }
  }
  sendPassword(formData) {
    this.loginGif = true;
    let params;
    if (this.email_exist) {
       params = 'username=' + formData.email + '&password=' + formData.password;
       this.email_exist = false;
    }
    if (this.number_exist) {
       params = 'username=' + formData.phone + '&password=' + formData.password;
       this.number_exist = false;
    }
    this.pharmacyService.checkPasswordLogin(params).subscribe(
      (data: any[]) => {
        if (data['access_token'] !== '') {
          this.cookieService.set('token', 'Bearer ' + data['access_token'], data['expires_in']);
          if (formData.defaultBranch === true) {
            formData.defaultBranch = '1';
          } else if (formData.defaultBranch === false) {
            formData.defaultBranch = '0';
          }
          const input = new FormData();
          if (formData.avatar !== null) {
            const files: Array<File> = this.filesToUpload;
            for ( let x = 0; x <= files.length; x++) {
              input.append('prescription[]', files[x]);
            }
          }
          if (this.other_address == true) {
            if (this.cityId == '' || this.cityId == undefined || this.provinceId == '' || this.provinceId == undefined || formData.address_text == '') {
              this.pharmacyError('Province, City and Address fields is required');
            } else {
              input.append('city_id', this.cityId);
              input.append('province_id', this.provinceId);
              input.append('address', formData.address_text);
              input.append('address_id', '');
            }
          } else {
            input.append('address_id', this.addressId);
            if (this.showDefaultAddress === true) {
              input.append('address', formData.address);
            } else {
              input.append('address', this.addressName);
            }
          }
          input.append('mobile', formData.phone);
          input.append('pharmacy_id', this.branch_id);
          input.append('is_default', formData.defaultBranch);
          if (formData.coupon === undefined || formData.coupon === '') {
          }else {
            input.append('promocode', formData.coupon);
          }
          input.append('cash_payment', this.payment_flag);
          input.append('is_home_delivery', this.delivery_flag);
            const options = input;

          this.pharmacyService.submitOrder(options).subscribe(
            (orderResponseData: any[]) => {
              if (orderResponseData['success'] === true) {
                this.pharmacySuccess(orderResponseData['message']);
                this.loginGif = false;
                this.router.navigate(['/user-profile']);
                setTimeout(() => {
                  location.reload();
                }, 200);
              }
            },
            (err) => {
              if (err instanceof HttpErrorResponse) {
                this.loginGif = false;
                if (err.status === 422) {
                  for (let x = 0; x <= err.error.promocode.length; x++) {
                    if (err.error.promocode[x] !== undefined) {
                      this.pharmacyError(err.error.promocode[x]);
                    }
                  }
                } else {
                  this.pharmacyError(err.error.message);
                }
              }
            }
          );
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.pharmacyError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  signUpUser(formData) {
    this.loginGif = true;
    if (formData.terms === true) {
      formData.terms = '1';
    } else {
      formData.terms = '0';
    }
    if (formData.defaultBranch === true) {
      formData.defaultBranch = '1';
    } else if (formData.defaultBranch === false) {
      formData.defaultBranch = '0';
    }
    const params = 'name=' + formData.name + '&email=' + formData.email + '&password=' + formData.password + '&mobile=' + formData.phone +
      '&is_doner=0' + '&fcm_id=' + '&role=1' + '&city_id=1' + '&terms_and_conditions=' + formData.terms;
    this.userService.signUp(params).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          const loginParms = 'username=' + formData.email + '&password=' + formData.password;
          this.pharmacyService.checkPasswordLogin(loginParms).subscribe(
            (userLogin: any[]) => {
              if (userLogin['access_token'] === '') {
                this.passwordIncorrect = true;
              } else {
                this.cookieService.set('token', 'Bearer ' + userLogin['access_token'], userLogin['expires_in']);
                const input = new FormData();
                if (formData.avatar !== null) {
                  const files: Array<File> = this.filesToUpload;
                  for ( let x = 0; x <= files.length; x++) {
                    input.append('prescription[]', files[x]);
                  }
                }
                if (this.other_address == true) {
                  if (this.cityId == '' || this.cityId == undefined || this.provinceId == '' || this.provinceId == undefined || formData.address_text == '') {
                    this.pharmacyError('Province, City and Address fields is required');
                  } else {
                    input.append('city_id', this.cityId);
                    input.append('province_id', this.provinceId);
                    input.append('address', formData.address_text);
                    input.append('address_id', '');
                  }
                } else {
                  input.append('address_id', this.addressId);
                  if (this.showDefaultAddress === true) {
                    input.append('address', formData.address);
                  } else {
                    input.append('address', this.addressName);
                  }
                }
                input.append('mobile', formData.phone);
                input.append('pharmacy_id', this.branch_id);
                input.append('is_default', formData.defaultBranch);
                if (formData.coupon === undefined || formData.coupon === '') {
                }else {
                  input.append('promocode', formData.coupon);
                }
                input.append('cash_payment', this.payment_flag);
                input.append('is_home_delivery', this.delivery_flag);
                const options = input;
                this.pharmacyService.submitOrder(options).subscribe(
                  (orderResponseData: any[]) => {
                    if (orderResponseData['success'] === true) {
                      this.pharmacySuccess(orderResponseData['message']);
                      this.loginGif = false;
                      this.router.navigate(['/user-profile']);
                      setTimeout(() => {
                        location.reload();
                      }, 200);
                    }
                  },
                  (err) => {
                    if (err instanceof HttpErrorResponse) {
                      this.loginGif = false;
                      if (err.status === 422) {
                        for (let x = 0; x <= err.error.promocode.length; x++) {
                          if (err.error.promocode[x] !== undefined) {
                            this.pharmacyError(err.error.promocode[x]);
                          }
                        }
                      } else {
                        this.pharmacyError(err.error.message);
                      }
                    }
                  }
                );
              }
            }
          );
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.pharmacyError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  // checkUserFalse() {
  //   this.checkUser = false;
  // }
  // checkUserRegFalse() {
  //   this.checkUserReg = false;
  // }
  // getPharmaciesList() {
  //   // this.modalRef.hide();
  //   this.router.navigate(['/pharmacy']);
  // }

  // keyPress(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;
  //
  //   const inputChar = String.fromCharCode(event.charCode);
  //   console.log(inputChar);
  //   if (event.keyCode !== 8 && !pattern.test(inputChar)) {
  //     console.log(event);
  //     event.preventDefault();
  //     this.wrongNumber = true;
  //     // this.pharmacyError('Number is not valid');
  //   }
  // }
  pharmacySuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  pharmacyError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
