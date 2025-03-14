import CryptoJS from "crypto-js";
import { redirect } from "react-router";

import { tokenSecret, userSecret } from "./env";
import { UserEntity } from "./api/dto";

class Session {
  isAuthenticated = () => localStorage.getItem("session") !== null;
  isClient = () => localStorage.getItem("isClient") !== null;
  isDoctor = () => localStorage.getItem("isDoctor") !== null;

  logInAsPatient(user: UserEntity, token: string) {
    console.log(
      localStorage.getItem("session") === null,
      userSecret,
      tokenSecret
    );

    if (localStorage.getItem("session") === null && userSecret && tokenSecret) {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        userSecret
      ).toString();
      localStorage.setItem("session", encrypted);
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        tokenSecret
      ).toString();
      localStorage.setItem("token", encryptedToken);
      localStorage.setItem("isClient", "true");
      window.location.reload();
    }
  }

  logInAsDoctor(user: UserEntity, token: string) {
    if (localStorage.getItem("session") === null && userSecret && tokenSecret) {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        userSecret
      ).toString();
      localStorage.setItem("session", encrypted);
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        tokenSecret
      ).toString();
      localStorage.setItem("token", encryptedToken);
      localStorage.setItem("isDoctor", "true");
      window.location.reload();
    }
  }

  getUserInfo() {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("isClient") !== null &&
      localStorage.getItem("isDoctor") !== null &&
      userSecret &&
      tokenSecret
    ) {
      const encrypted = localStorage.getItem("session");
      if (encrypted) {
        const bytes = CryptoJS.AES.decrypt(encrypted, userSecret);
        let originalText = "";
        try {
          originalText = bytes.toString(CryptoJS.enc.Utf8);
          return JSON.parse(originalText);
        } catch (err) {
          this.logOut(err as Error);
        }
      } else this.logOut(new Error("aquiee"));
    } else this.logOut(new Error("aquie"));
  }

  getToken() {
    if (
      (localStorage.getItem("isClient") !== null ||
        localStorage.getItem("isDoctor") !== null) &&
      localStorage.getItem("token") !== null &&
      tokenSecret !== null
    ) {
      const encrypted = localStorage.getItem("token");

      if (encrypted) {
        const bytes = CryptoJS.AES.decrypt(encrypted, tokenSecret);
        let originalText = "";
        try {
          originalText = bytes.toString(CryptoJS.enc.Utf8);
          return String(originalText).replace(/"/g, "");
        } catch (err) {
          this.logOut(err as Error);
          redirect("/");
        }
      } else this.logOut(new Error("aqui talvez"));
    } else this.logOut(new Error("aqui"));
  }

  logOut(err?: Error) {
    console.log(err);

    localStorage.removeItem("session");
    localStorage.removeItem("token");
    localStorage.removeItem("isClient");
    localStorage.removeItem("isDoctor");
  }
}

const session = new Session();

export default session;
