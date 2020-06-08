import { Component } from '@angular/core';
import { Plugins, StatusBarStyle, Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { StatusBar, SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('StatusBar')) {
        StatusBar.setStyle({ style: StatusBarStyle.Light });
      }
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        SplashScreen.hide();
      }
    });
  }
}
