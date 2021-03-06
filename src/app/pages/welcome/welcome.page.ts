import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
import { UserProvider } from "../../../providers/users/users";
import {DescriptionPage} from '../description/description.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public rol;
  public recyclings=[];
  constructor(private globalProv:GlobalProvider, private usersProv: UserProvider, public router:Router) { }

  ngOnInit() {

   
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.recyclings=[];
    setTimeout(() => {
      this.globalProv.getStorage("user").then(res => {
        this.rol = res.rols_id;   
      })
      if(this.rol != 1){
        this.getRecyclings();
      }
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter(){
    console.log("oninit");
    this.recyclings=[];
    setTimeout(() => {
      this.globalProv.getStorage("user").then(res => {
        this.rol = res.rols_id;   
      })
      if(this.rol != 1){
        this.getRecyclings();
      }
    }, 2000);
  }




  getRecyclings() {
    this.globalProv.showLoader();    
        this.usersProv.setCallObservable('get', 'getrecycling', null).subscribe(
            (res) => {
              // Si respuesta true
              if(res.success) {
                for (var i = 0; i < res.data.length; i++) {           
                    this.recyclings.push({ 
                        id : res.data[i].id, 
                        state : res.data[i].state,
                        lat : res.data[i].lat,
                        lng : res.data[i].lng,
                        name: res.data[i].name,
                        lastname: res.data[i].lastname 
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


    openDetails(id, lat, lng){
      this.globalProv.createModal({
        id:id,
        lat:lat,
        lng:lng
      },DescriptionPage);
    }

    
    logOut(){
      this.globalProv.clearStorage();
      this.router.navigateByUrl("/home");
    }


  

}
