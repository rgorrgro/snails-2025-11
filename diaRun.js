// R. Gorr-Grohmann
// Oktober 2025
// Sub dialog of the main dialog for the
// configuration of program modus
//
"use strict";
class DialogRun {
  constructor(canvas_) {
    this.tst = new Test("diarun", false, 1);
    this.auto = new Automat2(this.tst,"diarun",0);
    this.createAutomat();
    this.canvas = canvas_;
  }
  createAutomat() {
    this.auto.setState(["STA","RUN","PA+","HALT"]);
    this.auto.setEvent(["TRG","PA+","PA-"]);
    // ENr 0: TRG trigger event
    // ENr 1: PA+ Canvas clicked
    // ENr 2: PA- end PAUSE dialog 
	let next = [
    // SNr 0 STA START
    //    ENr 0: display canvas => NSNr 1
      [[1,1],[-1,-1],[-1,-1]],
    // SNr 1 RUN Canvas displayed
    //    ENr 0: trigger snails => NSNr 1
    //    ENr 1: start PAUSE dialog => NSNr 2
      [[1,2],[2,3],[-1,-1]],
    // SNr 2 PA+ PAUSE +
    //   ENr  0: trigger PAUSE obj
    //   ENr  1: do nothing
    //   ENr  2: del PAUSE dialog; 
    //            set CANVAS button => NSNr 1
      [[2,4],[2,0],[1,5]],
    // SNr 3 HALT
      [[-1,-1],[-1,-1],[-1,-1]]
    ];
    this.auto.setNext(next);
    let aFunction = [
    // 0
      () => {},
    // 1
      () => {
        canvas.mouseClicked(() => {
          this.auto.eveCall(1,0,0);
        });
        graphics.makeCanvas();
        background(data.bgcolor.getValue());
        drawSnails = new DrawSnails();
        drawSnails.trigger();
      },
    // 2
      () => {drawSnails.trigger();}, 
    // 3
      () => {dialogPause = new DialogPause(canvas);}, 
    // 4
      () => {dialogPause.trigger();}, 
    // 5
      () => {
        canvas.mouseClicked(() => {
          this.auto.eveCall(1,0,0);
        });
        dialogPause = undefined;
      }, 
    ];
    this.auto.setFunction(aFunction);
  }
  trigger() {
    this.auto.eveCall(0,0,0);
  }
}
