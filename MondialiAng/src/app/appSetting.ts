import { environment } from "src/environments/environment";
var str = new String(environment._API)
var splits1 = str.substring(0, 8)
var splits2 = str.substring(8,)
var str3 = splits1+5000+"-"+splits2 + "/";

export class AppSettings {
    public static _API= str3;
 }