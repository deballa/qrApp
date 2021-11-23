import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scanner: any;
  content: HTMLElement;

  resultado = '';

  constructor(
    private qrScanner: QRScanner, 
    public alertController: AlertController) {}

  lerQRCode(){
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        this.content = document.getElementsByTagName('ion-content')[0];
        this.content.style.opacity = '0';

        // start scanning
        this.scanner = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned', text);

          this.resultado = text['result']; //Guarda a leitura na variável

          this.alertUrl();

          this.content.style.opacity = '1';
          this.qrScanner.hide(); // hide camera preview
          this.scanner.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        alert('Não é para negar!');
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
        alert('Não é para negar. Tente novamente!');
      }
    })
    .catch((e: any) => console.log('Error is', e));
    }

    async alertUrl() {
      const alert = await this.alertController.create({
        header: 'Leitura:',
        message: this.resultado,
        buttons: ['Ok'],
      });
  
      await alert.present();
    }

    testeURL() {
      const txt = this.resultado.substr(0, 3);
      console.log(txt);
    }

}