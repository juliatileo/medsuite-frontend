import CryptoJS from "crypto-js";

import { tokenSecret, userSecret } from "./env";
import { UserEntity } from "./api/dto";

class Session {
  private isSessionActive(): boolean {
    return localStorage.getItem("session") !== null;
  }

  private encryptData(data: string, secret: string): string {
    return CryptoJS.AES.encrypt(data, secret).toString();
  }

  private decryptData(encryptedData: string, secret: string): string | null {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secret);

      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return null;
    }
  }

  private storeSession(
    user: UserEntity,
    token?: string,
    roleKey?: string
  ): void {
    const encryptedUser = this.encryptData(JSON.stringify(user), userSecret);
    const encryptedToken = this.encryptData(JSON.stringify(token), tokenSecret);

    localStorage.setItem("session", encryptedUser);

    if (token) localStorage.setItem("token", encryptedToken);

    if (roleKey) localStorage.setItem(roleKey, "true");

    window.location.reload();
  }

  private isSessionValid(): boolean {
    return (
      (this.isPatient() || this.isDoctor()) &&
      localStorage.getItem("token") !== null &&
      userSecret &&
      tokenSecret
    );
  }

  public isAuthenticated(): boolean {
    return this.isSessionActive();
  }

  public isPatient(): boolean {
    return localStorage.getItem("isPatient") !== null;
  }

  public isDoctor(): boolean {
    return localStorage.getItem("isDoctor") !== null;
  }

  public isFirstAccess(): boolean {
    const user = this.getUserInfo();

    return user?.firstAccess || false;
  }

  public updateFirstAccess(): void {
    if (this.isSessionValid()) {
      const encryptedUser = localStorage.getItem("session");

      if (encryptedUser) {
        const decryptedUser = this.decryptData(encryptedUser, userSecret);

        if (decryptedUser)
          this.storeSession({
            ...JSON.parse(decryptedUser),
            firstAccess: false,
          });
      }
    }
  }

  public logInAsPatient(user: UserEntity, token: string): void {
    if (!this.isSessionActive() && userSecret && tokenSecret) {
      this.storeSession(user, token, "isPatient");
    }
  }

  public logInAsDoctor(user: UserEntity, token: string): void {
    if (!this.isSessionActive() && userSecret && tokenSecret) {
      this.storeSession(user, token, "isDoctor");
    }
  }

  public getUserInfo(): UserEntity | null {
    if (this.isSessionValid()) {
      const encryptedUser = localStorage.getItem("session");

      if (encryptedUser) {
        const decryptedUser = this.decryptData(encryptedUser, userSecret);

        if (decryptedUser) return JSON.parse(decryptedUser) as UserEntity;
      }
    }

    return null;
  }

  public getToken(): string | null {
    if (this.isSessionValid()) {
      const encryptedToken = localStorage.getItem("token");

      if (encryptedToken) {
        const decryptedToken = this.decryptData(encryptedToken, tokenSecret);

        if (decryptedToken) return decryptedToken.replace(/"/g, "");
      }
    }

    return null;
  }

  public logOut(error?: Error): void {
    if (error) {
      console.error("Error during logout:", error);
    }

    localStorage.removeItem("session");
    localStorage.removeItem("token");
    localStorage.removeItem("isPatient");
    localStorage.removeItem("isDoctor");

    window.location.reload();
  }
}

const session = new Session();

export default session;
