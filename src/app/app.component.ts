import {
    Component,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    title = 'scanner-qr-app';
    @ViewChild(QrScannerComponent)
    qrScannerComponent: QrScannerComponent;

    frontCam: any;
    backCam: any;
    currentCam: any;

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.

        console.log(this.qrScannerComponent);

        this.qrScannerComponent.getMediaDevices().then((devices) => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0) {
                for (const dev of videoDevices) {
                    console.log(dev);
                    if (dev.label.includes('front')) {
                        this.frontCam = dev;
                    }

                    if (dev.label.includes('back')) {
                        this.backCam = dev;
                    }
                }

                this.currentCam = this.frontCam;
                if (this.currentCam) {
                    this.qrScannerComponent.chooseCamera.next(
                        this.currentCam
                    );
                } else {
                    this.qrScannerComponent.chooseCamera.next(
                        videoDevices[0]
                    );
                }
            }
        });

        this.qrScannerComponent.capturedQr.subscribe((result) => {
            console.log(result);
        });
    }

    swapCam() {
        if (this.currentCam === this.backCam) {
            this.currentCam = this.frontCam;
        } else {
            this.currentCam = this.backCam;
        }
        this.qrScannerComponent.chooseCamera.next(this.currentCam);
    }
}
