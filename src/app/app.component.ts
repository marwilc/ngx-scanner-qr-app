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
                let choosenDev;
                for (const dev of videoDevices) {
                    if (dev.label.includes('front')) {
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.qrScannerComponent.chooseCamera.next(
                        choosenDev
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
}
