// Robert Gorr-Grohmann
// September 2025
// State Machine
//
"use strict;";
class Automat2 {
  constructor(tstobj_, classname_, objnr_) {
    this.classname = classname_;
    this.objnr = objnr_;
    this.events = [];
    this.pushnr = 0;
    this.snr = 0;
    this.mNext = [];
    //this.mNextState = [];
    //this.mNextFunction = [];
    this.aFunction = [];
    this.tst = tstobj_;
  }
  //
  // Events
  //
  evePush(event_, parameter_) {
    this.events.push([this.pushnr, event_, parameter_]);
    this.pushnr += 1;
    if (this.pushnr > 100000) {
      this.pushnr = 0;
    }
  }
  eveShift() {
    while (this.events.length > 0) {
      let e = this.events.shift();
      this.eveCall(e[1], e[0], e[2]);
    }
  }
  eveCall(enr_, nr_, par_) {
    //let fnr = this.mNextFunction[this.snr][enr_];
    //print("AUTO2 1:"+enr_);
    //print("AUTO2 2:"+this.mNext[this.snr][enr_]);
    let nsnr = this.mNext[this.snr][enr_][0];
    let fnr = this.mNext[this.snr][enr_][1];
    if ((fnr<0) ||(fnr>this.aFunction.length)) {
      print("ERROR SNr|ENr|NSNr|FNr:"+
           this.snr+"|"+
           enr_+"|"+
           nsnr+"|"+
           fnr);
    }
    this.tst.print(
      0,
      "eveCall ONr|Snr|Enr|Para|NSnr",
      this.objnr,
      this.aState[this.snr],
      this.aEvent[enr_],
      par_,
      nsnr
    );
    this.aFunction[fnr](par_);
    this.snr = nsnr;
    /*this.tst.print(
      1,
      "eveCall Class|ObjNr|NextSnr",
      this.classname,
      this.objnr,
      this.aState[this.snr]
    );*/
  }
  //
  // set automat configuration
  //
  setEvent(x_) {
    this.aEvent = x_.slice(0);
  }
  setState(x_) {
    this.aState = x_.slice(0);
  }
  setNext(x_) {
    this.mNext = [];
    for (let i=0;i<x_.length;i++) {
      let ai = [];
      for (let j=0;j<x_[i].length;j++) {
        ai.push([x_[i][j][0],x_[i][j][1]]);
      }
      this.mNext.push(ai.slice(0));
    }
  }
  setNextState(x_) {
    this.mNextState.push(x_.slice(0));
  }
  setNextFunction(x_) {
    this.mNextFunction.push(x_.slice(0));
  }
  setFunction(x_) {
    this.aFunction = x_.slice(0);
  }
  //
  // toString
  //
  toString() {
    let s = "";
    s += "States:" + this.aState;
    s += "\nEvents:" + this.aEvent;
    s += "\nNextStates:[";
    for (let i = 0; i < this.mNextState.length; i++) {
      s += "[" + this.mNextState[i] + "]";
    }
    s += "]";
    s += "\nNextFunction:[";
    for (let i = 0; i < this.mNextFunction.length; i++) {
      s += "[" + this.mNextFunction[i] + "]";
    }
    s += "]";
    s += "\nFunction:[";
    for (let i = 0; i < this.aFunction.length; i++) {
      s += "\n" + i + ": " + this.aFunction[i];
    }
    s += "]";
    return s;
  }
}
