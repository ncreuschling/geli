import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeKataValidationService {

  validate(codeToTest: string) {
    let result = false;
    let logs = '';
    const origLogger = window.console.log;
    window.console.log = (msg) => {
      logs += msg + '\n';
    };
    try {
      // tslint:disable-next-line:no-eval
      result = eval(codeToTest);
    } catch (e) {
      const err = e.constructor('Error in evaled Script: ' + e.message);
      err.lineNumber = e.lineNumber - err.lineNumber;
      const msg = 'Error ' + e.message;
      // tslint:disable-next-line:no-console
      console.log(msg);
      // tslint:disable-next-line:no-console
      console.error(err);
    }
    return { result: result, log: logs};
  }
}
