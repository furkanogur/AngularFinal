import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-hesabim',
  templateUrl: './hesabim.component.html',
  styleUrls: ['./hesabim.component.css']
})
export class HesabimComponent implements OnInit {

  adsoyad: string;
  uid: string;
  kayitlar: Kayit[];
  constructor(
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit(): void {

    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.KayitListele();

  }

  OturumKapat() {
    this.fbservis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);

    });

  }

  KayitListele() {
    this.fbservis.KayitListeleByUID(this.uid).snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    })
  }

  HesapAYAR(){
    
  }
  

}
