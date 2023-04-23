import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getDownloadURL } from '@firebase/storage';
import { Gin } from 'src/app/models/Gin';
import { GinService } from 'src/app/services/gin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-gin',
  templateUrl: './gin.component.html',
  styleUrls: ['./gin.component.css']
})
export class GinComponent implements OnInit {

  addGinForm = new FormGroup({
    ginName: new FormControl('', [
      Validators.required,
    ]),
    brand: new FormControl('', [
      Validators.required,
    ]),
    variant: new FormControl('', [
      Validators.required,
    ]),
    country: new FormControl('', [
      Validators.required,
    ]),
    vol: new FormControl(0, [
      Validators.required,
    ]),
    price: new FormControl(0, [
      Validators.required,
    ]),
    cl: new FormControl(0, [
      Validators.required,
    ]),
  });
  file: File | undefined;

  constructor(private ginService: GinService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
  }

  submit(): void {
    if (this.file == undefined) {
      return;
    }
    this.storageService.updateImg(this.file).then(storageRef => {
      getDownloadURL(storageRef).then(url => {
        if (!this.addGinForm.value.ginName || !this.addGinForm.value.brand ||
          !this.addGinForm.value.variant || !this.addGinForm.value.country ||
          !this.addGinForm.value.price || !this.addGinForm.value.vol || !this.addGinForm.value.price || !this.addGinForm.value.cl) {
          return;
        }
        const gin: Gin = {
          name: this.addGinForm.value.ginName,
          brand: this.addGinForm.value.brand,
          avgPoints: 0,
          country: this.addGinForm.value.country,
          valueLiterPoint: 0,
          valuePerLiter: 0,
          variant: this.addGinForm.value.variant,
          vol: this.addGinForm.value.vol,
          votes: 0,
          price: this.addGinForm.value.price,
          img: url,
          cl: this.addGinForm.value.cl
        };
        this.addGinForm.reset();
        this.ginService.addGin(gin);
      });
    }).catch(err => {
      // Error while uploading img
      return;
    });
  }
}