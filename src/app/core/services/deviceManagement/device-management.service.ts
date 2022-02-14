import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Bowser from 'bowser';
import { map, switchMap, take, tap } from 'rxjs/operators';
import forge from 'node-forge';
import urlList from 'src/app/core/services/service-list.json';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceManagementService {
  fcmToken = '';
  allowedNotifications: boolean;
  cloudMessagingService: string;
  deviceRegExp = /\(([^)]+)\)/;

  private securityChallengeQuestions = new BehaviorSubject<any[]>([]);
  private activatedDevicesPerChannel = new BehaviorSubject<any[]>([]);
  private removeReasons = new BehaviorSubject<string[]>([]);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  get SecurityChallengeQuestions(): Observable<any[]> {
    return this.securityChallengeQuestions.asObservable().pipe(
      map((questions) => {
        if (questions.length <= 0) {
          const savedQuestions = this.storageService.getData('securityQuestions');
          this.securityChallengeQuestions.next(savedQuestions);
          return savedQuestions;
        } else {
          return questions;
        }
      })
    );
  }

  get RemoveReasons(): Observable<string[]> {
    return this.removeReasons.asObservable();
  }

  get UserVerifyProducts(): any[] {
    let products: any[] = [];
    if (this.storageService.getData('profile-products')) {
      products = this.storageService.getData('profile-products');
    }
    products.push({ option: 'support', token: '' });
    return products;
  }

  get CurrentVerifyProduct(): any {
    return this.storageService.getData('current-verify-product');
  }

  get UserId(): string {
    return this.storageService.getData('userId');
  }

  setCurrentVerifyProduct(product: any): void {
    this.storageService.setData('current-verify-product', product);
  }

  get DeviceName(): string {
    return Bowser.parse(navigator.userAgent).browser.name || '';
  }

  get DeviceType(): string {
    return Bowser.parse(navigator.userAgent).platform.type || '';
  }

  get DeviceOS(): string {
    const obj = this.deviceRegExp.exec(navigator.userAgent.toLowerCase());
    return obj && obj[1].trim() || '';
  }

  get DeviceOSVersion(): string {
    return navigator.userAgent.toLowerCase();
  }

  get DeviceModel(): string {
    return this.DeviceOS.split(';')[0];
  }

  public encryptPassword(password: string): Observable<string> {
    const existingPassword = this.storageService.getData('password');
    if (existingPassword) {
      return of(existingPassword);
    }
    return this.fetchCertificate().pipe(
      switchMap((cert) => {
        const publicKey = forge.pki.publicKeyFromPem(forge.pki.publicKeyToPem(cert.publicKey));
        const encryptedPassword = forge.util.encode64(
          publicKey.encrypt(password, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
          })
        );
        return of(encryptedPassword);
      })
    );
  }

  public generateDeviceToken(timestamp: number): string {
    // d.DeviceID&d.DeviceName&d.DeviceOS&unixTimestamp&nbf
    const deviceOS = this.DeviceOS;
    const deviceName = this.DeviceName;
    const clientID: string = forge.util.encode64(environment.clientId);
    const deviceId: string = this.storageService.getData('device_id');
    const nbf: number = timestamp + 5;
    const deviceTokenInput = forge.util.encodeUtf8(
      `${deviceId}&${deviceName}&${deviceOS}&${timestamp}&${nbf}`
    );
    const hmac = forge.hmac.create();
    hmac.start('sha256', clientID);
    hmac.update(deviceTokenInput);
    const deviceToken = forge.util.encode64(forge.util.hexToBytes(hmac.digest().toHex()));
    return deviceToken;
  }

  public generateSignature(
    username: string,
    encryptedPassword: string,
    deviceToken: string,
    timestamp: string,
    nonce: string
  ): string {
    const md = forge.md.sha256.create();
    md.update(`${username}&${encryptedPassword}&${deviceToken}&${timestamp}&${nonce}`);
    const sig = forge.util.encode64(forge.util.hexToBytes(md.digest().toHex()));
    return sig;
  }

  public fetchCertificate(): Observable<forge.pki.Certificate> {
    const url = environment.apiUrl + urlList;
    return this.http.get<any>(url).pipe(
      take(1),
      map((resp) => {
        const respCert: string = resp.responseObject;
        const preCert = '-----BEGIN CERTIFICATE-----';
        const postCert = '\n-----END CERTIFICATE----- ';
        let fullCert: string;
        if (respCert.includes(preCert)) {
          fullCert = respCert;
        } else {
          fullCert = preCert.concat(respCert).concat(postCert);
        }
        const cert = forge.pki.certificateFromPem(fullCert);
        return cert;
      })
    );
  }

  public fetchNonce(): Observable<string> {
    const url = environment.apiUrl + urlList;;
    return this.http.get<any>(url).pipe(
      take(1),
      map((resp) => {
        const nonce: string = resp.responseObject;
        return nonce;
      })
    );
  }

  public fetchServerTimestamp(): Observable<number> {
    const url = environment.apiUrl + urlList;
    return this.http.get<any>(url).pipe(
      take(1),
      switchMap((resp) => {
        const timeStamp: number = +resp.responseObject;
        return of(timeStamp);
      })
    );
  }

  public activateDevice(userId: string, password: string): Observable<any> {
    const url = environment.apiUrl + urlList;
    const deviceName = this.DeviceName;
    const deviceType = this.DeviceType;
    const deviceOS = this.DeviceOS;
    const deviceOSVersion = this.DeviceOSVersion;
    const clientId: string = forge.util.encode64(environment.clientId);
    return this.encryptPassword(password).pipe(
      take(1),
      switchMap((encryptedPassword) => {
        const payload = {
          userId,
          password: encryptedPassword,
          clientId,
          deviceName,
          deviceType,
          deviceOS,
          deviceOSVersion,
        };
        this.storageService.setData('userId', userId);
        this.storageService.setData('password', encryptedPassword);
        return this.http.post<any>(url, payload).pipe(take(1));
      })
    );
  }

  public requestOTPCode(recipientKey: string, userId: string): Observable<any> {
    const payload = {
      recipientKey,
      userId,
    };
    const url = environment.apiUrl + urlList;
    return this.http.post<any>(url, payload).pipe(take(1));
  }

  public resendOTPCode(userId: string): Observable<any> {
    const payload = {
      userId,
    };
    const url = environment.apiUrl + urlList;;
    return this.http.post<any>(url, payload).pipe(take(1));
  }

  public verifyOTP(
    recipientKey: string,
    UserId: string,
    otp: string
  ): Promise<any[]> {
    const payload = {
      UserId,
      recipientKey,
      otp,
    };
    // const url = environment.apiUrl + urlList.deviceManagement.activateDevice;
    const url = environment.apiUrl + urlList;
    return this.http
      .post<any>(url, payload)
      .pipe(map((resp) => resp.responseObject))
      .toPromise();
  }

  public getSecurityQuestions(token: string): Promise<any> {
    const url = environment.apiUrl;
    const data = {
      token,
      userId: this.UserId,
    };
    return this.http
      .put<any>(url, data)
      .pipe(
        map((resp) => {
          this.securityChallengeQuestions.next(resp.responseObject.questions);
          this.storageService.setData('otpToken', resp.responseObject.token);
          return resp.responseObject;
        })
      )
      .toPromise();
  }

  public verifySecurityQuestions(
    questions: { questionId: string; answer: string }[]
  ): Promise<any> {
    const url = environment.apiUrl + urlList;
    const token = this.storageService.getData('otpToken');
    const data = {
      userId: this.UserId,
      questions,
      token,
    };
    return this.http
      .post<any>(url, data)
      .toPromise()
      .then((resp) => this.addDevice(resp.responseObject));
  }

  public verifyUserCard(last6pan: string, expiry: string): Promise<any> {
    const url = environment.apiUrl + urlList;
    const userId = this.UserId;
    const token = this.CurrentVerifyProduct.token;
    const data = {
      userId,
      last6pan,
      expiry,
      token,
    };
    return this.http
      .post<any>(url, data)
      .toPromise()
      .then((resp) => this.addDevice(resp.responseObject));
  }

  public async addDevice(userToken: string): Promise<any> {
    const url = environment.apiUrl + urlList;
    const deviceName = this.DeviceName;
    const deviceType = this.DeviceType;
    const deviceOS = this.DeviceOS;
    const deviceOSVersion = this.DeviceOSVersion;
    const userId = this.UserId;
    const cloudMessagingRegistrationId = this.fcmToken;
    const allowedNotifications = this.allowedNotifications;
    const cloudMessagingService = this.cloudMessagingService;
    const payload = {
      userToken,
      deviceName,
      deviceType,
      deviceOS,
      deviceOSVersion,
      userId,
      cloudMessagingRegistrationId,
      allowedNotifications,
      cloudMessagingService,
    };
    return await this.http
      .post<any>(url, payload)
      .pipe(
        map((resp) => {
          this.storageService.setData('device_id', resp.responseObject);
          return resp;
        })
      )
      .toPromise();
  }

  public getActiveDevicesPerChannel(channel: string): Observable<any[]> {
    return this.activatedDevicesPerChannel.asObservable().pipe(
      map((devices: any[]) => {
        if (devices && devices.length > 0) {
          // eslint-disable-next-line max-len
          const devicesToReturn: any = devices.find(
            (x: any) =>
              x.channel.toLowerCase() === channel.toLowerCase()
          );
          return devicesToReturn?.devices;
        } else {
          return [];
        }
      })
    );
  }

  public fetchUsersActivatedDevices(): Promise<any[]> {
    const url = environment.apiUrl + urlList;
    return this.http
      .get<any>(url)
      .pipe(map((resp) => resp.responseObject))
      .toPromise();
  }

  public fetchUsersActivatedDevicesOfChannel(): Promise<any[]> {
    const url = environment.apiUrl + urlList;
    return this.http
      .get<any>(url)
      .pipe(map((resp) => resp.responseObject))
      .toPromise();
  }

  public fetchUsersActivatedDevicesPerChannel(): Promise<any[]> {
    const url = environment.apiUrl + urlList;
    return this.http
      .get<any>(url)
      .pipe(
        tap((resp) => this.activatedDevicesPerChannel.next(resp.responseObject)),
        map((resp) => resp.responseObject)
      )

      .toPromise();
  }

  public getRemoveReasons(): Promise<string[]> {
    const url = environment.apiUrl + urlList;
    return this.http
      .get<any>(url)
      .pipe(
        tap((resp) => {
          this.removeReasons.next(resp.responseObject);
        }),
        map((resp) => resp.responseObject)
      )

      .toPromise();
  }

  public clearStorage(): void {
    this.storageService.removeData('securityQuestions');
    this.storageService.removeData('otpToken');
    this.storageService.removeData('maskedUserId');
    this.storageService.removeData('removeReasons');
  }

  public deactivateDevice(devices: string[], reason?: string): Promise<any> {
    const url = environment.apiUrl + urlList;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        deviceIds: devices,
        reason,
      },
    };
    return this.http
      .delete<any>(url, options)
      .pipe(map((resp) => resp))
      .toPromise();
  }
}
