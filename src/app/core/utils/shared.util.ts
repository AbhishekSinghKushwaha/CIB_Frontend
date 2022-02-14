import { Subscription } from 'rxjs';
import { PreLoginModal } from './../domain/pre-login-modal.model';
export class SharedUtils {
  static getNotificationModalParam(param: PreLoginModal): PreLoginModal {
    return {
      image: param.image,
      title: param.title,
      message: param.message,
      buttonText: param.buttonText,
      registerButtonEnabled: !!param.registerButtonEnabled,
      logoutButtonEnabled: !!param.logoutButtonEnabled
    }
  }

  static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  static unSubscribe(subscriptions: Subscription[]) {
    subscriptions.forEach(sub => sub.unsubscribe())
  }

  static formatSeconds(s: number): string {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }
}
