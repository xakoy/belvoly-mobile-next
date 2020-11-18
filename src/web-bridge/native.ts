import { log } from "../log";
import { Arg, Handle, registerCallback } from "./core";

export function execute(service: string, action: string, args: Arg<any>, handle: Handle<any>) {
    var callbackID = registerCallback(handle);
    var arg = JSON.stringify(args);

    log("service:" + service + ", action:" + action + ", args:" + arg + ", callbackID: " + callbackID);
    
    (window as any)._belvolyNative.exec(service, action, callbackID, arg);
}

