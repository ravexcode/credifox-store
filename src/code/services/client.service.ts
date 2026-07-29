export class SessionManagerClient {
  static set(token: string) {
    this.delete();

    //Tiempo de expiracion
    const exp = new Date();
    exp.setTime(exp.getTime() + 15 * 60 * 60 * 1000);

    //Se suma el tiempo y mas valores
    const str = `token=${token}; expires=${exp.toUTCString()}; path=/; sameSite=Strict; Secure;`;

    document.cookie = str;
  }
  static get() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));

    const returned = tokenCookie ? tokenCookie.split("=")[1] : null;
    return returned as string | undefined;
  }
  static delete() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  static has() {
    return (this.get()) !== null;
  }
}