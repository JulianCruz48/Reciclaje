import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
import { NavParams } from '@ionic/angular';
import { UserProvider} from "../../../providers/users/users";
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  public id;
  public id_user;
  public size;
  public lat;
  public lng;
  public name;
  public materials=[];
  constructor(public globalProv:GlobalProvider, private navParams: NavParams,private usersProv: UserProvider, public router:Router) { }

  ngOnInit() {
    this.id =this.navParams.data.id; 
    this.lat =this.navParams.data.lat; 
    this.lng =this.navParams.data.lng; 
    console.log(this.lat);
    this.getMaterialsByid();
    this.globalProv.getStorage("user").then(res => {
      this.id_user = res.id;   
    })
  }

  close(){
    this.globalProv.closeModal();
  }

  getMaterialsByid(){
    this.globalProv.showLoader();    
    this.usersProv.setCallObservable('get', 'getmaterials/'+this.id, null).subscribe(
        (res) => {
          // Si respuesta true
          if(res.success) {
            this.size=res.data[0].size;  
            this.name = res.data[0].name+" "+ res.data[0].lastname;  
            for (var i = 0; i < res.data.length; i++) {    
                this.materials.push({ 
                    id : Number(res.data[i].id), 
                    material : res.data[i].material,
                  }) 
            }  
            this.globalProv.hideLoader();
          }else{
            this.globalProv.hideLoader();
            this.globalProv.presentToast(res.message);
          }
        }
    )
  }

  accept(){
    let request = {
      id_user: this.id_user,
      id_recycling: this.id
    }
    this.globalProv.showLoader();
    this.usersProv.setCallPromise('post', request, 'acceptrecycling', null).then(res => {  
      this.globalProv.hideLoader();     
      if(!res.success) {
        this.globalProv.presentToast(res.message);
      }else if(res.success) {
        this.globalProv.presentToast("Aceptado Correctamente");
        this.globalProv.closeModal();
        this.globalProv.presentToast("Verifica tus datos");
        this.router.navigateByUrl('/welcome/data');
      }
    }); 
    
  }

}
