// R. Gorr-Grohmann
// September 2025
// Snails Drawings
//
"use strict";
class DrawSnails {
  constructor() {
    this.tst = new Test("snails", false, 1);
    this.stateNumbers = [];
    this.auto = new Automat2(this.tst, "snails", 0);
    this.createAutomat();
    this.auto.evePush(1, 0);
  }
  createAutomat() {
    this.auto.setState(["ST0", "ST1", "ST2", "ST3", "ST4", "ST5", "ST6", "ST7"]);
    this.auto.setEvent(["TRI", "EV1", "EV2", "EV3","EV4","EV5"]);
    let next = [
    // State Start: 
    //   TRI: do nothing; 
    //   EV1: create bezier snails
    [[0,0],[1,1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]],
    // State Bezier snails created:
    //   TRI: do nothing, 
    //   EV2: init creating of different snails
    [[1,0],[-1,-1],[2,2],[-1,-1],[-1,-1],[-1,-1]],
    // State Snails created
    //   TRI: if snails created induce EV3
    //   EV3: init running of snails
    [[2,3],[-1,-1],[-1,-1],[3,4],[-1,-1],[-1,-1]],
    // State Snails running initialized
    //   TRI: if all snails are running induce EV4
    //   EV4: do nothing
    [[3,5],[-1,-1],[-1,-1],[-1,-1],[4,0],[-1,-1]],
    // State All snails are running
    //   TRI: if all snails are stopped induce EV5
    //   EV5: init creating of different snails
    [[4,6],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[2,2]],
    ];
    this.auto.setNext(next);
    let afunction = [
      // 0
      () => { },
      // 1
      () => {
        // Create new bezier snails
        this.initSnails0();
        this.maxNumberOfRunningSnails = 6;
        // nr of triggers to draw a step
        this.cyclesPerRectangle = 40;
        this.lineSize = data.linesize.getValue();
        this.lineColor = [0, 0, 0, 255];
        /*this.tst.print(
                      2,
                      "const maxNRS|cPR|lSize|lColor",
                      this.maxNumberOfRunningSnails,
                      this.cyclesPerRectangle,
                      this.lineSize,
                      this.lineColor
        );*/
        //
        //this.snails = this.bSnails.arr.slice(0);
        //this.snails0 = bSnails.arr.slice(0);
        //this.stateInit(5, this.snails0.length);
        //this.statePrint();
        this.auto.evePush(2, 0);
      },
      // 2
      () => {
        this.stateInit(5, this.snails0.length);
        this.statePrint();
        if (this.snails1!=undefined) {
          let k = this.snails1.length-1;
          for (let i = k; i >= 0; i--) {
            this.snails1[i] = undefined;
            this.snails1.splice(i,1);
          }
        }
        // Select which snail should be displayed how
        this.lcolor = [0,0,0];
        this.lcolor[0] = data.bgcolor.getValue();
        data.linecolor.setValueRandomly();
        this.lcolor[1] = data.linecolor.getValue();
        data.linecolor.setValueRandomly();
        this.lcolor[2] = data.linecolor.getValue();
        //
        this.typcnt = [0,0,0];
        let x = data.modus.getNoneGrowAtOn()[1]/100;
        this.typcnt[1] = int(x*this.snails0.length);
        x = data.modus.getNoneGrowAtOn()[2]/100;
        this.typcnt[2] = int(x*this.snails0.length);
        this.typcnt[0] = 
          this.snails0.length
          -this.typcnt[1]
          -this.typcnt[2];
        //this.initSnails1(
        //  this.snails1,
        //  int(random(this.snails.length / 3)),
        //  data.bgcolor.getValue()
        //);
        this.initSnails1()
        this.statePrint();
      },
      // 3
      () => {
        this.statePrint();
        if (this.stateNumbers[1] == this.snails1.length) {
          this.auto.evePush(3, 0);
        }
      },
      // 4
      () => {
        for (let i = 0; i < this.snails1.length; i++) {
          this.snails1[i].auto.evePush(2, 0);
        }
      },
      // 5
      () => {
        this.statePrint();
        if (this.stateNumbers[4] == this.snails1.length) {
          this.auto.evePush(4, 0);
        }
      },
      // 6
      () => {
        this.statePrint();
        if (this.stateNumbers[4] == this.snails1.length) {
          this.auto.evePush(5, 0);
        }
      }
    ];
    this.auto.setFunction(afunction);
  }
  //
  //  Help Functions
  //
  initSnails0() {
    let baseSnails = new BaseSnails(
      data.rectsize.getValue(),
      data.rectsize.getCentralizer(),
      data.rectsize.getX(),
      data.rectsize.getY()
    );
    //this.tst.print(1, 
    //               "create BaseSnails",
    //               baseSnails.toString());
    //
    let bSnails = new BezierSnails(
      baseSnails,
      data.rectsize.getValue(),
      data.rectsize.getCentralizer(),
    );
    /*
    this.tst.print(1, 
                   "const params SLen", 
                   bSnails.arr.length);
    this.tst.print(1, 
                   "create BezierSnails",
                   bSnails.toString());
    */
    this.snails0 = bSnails.arr.slice(0);
  }
  initSnails1() {
    this.snails1 = [];
    for (let i=0; i<this.snails0.length;i++) {
      this.snails1.push(undefined)
    }
    //
    for (let i=0; i<3; i++) {
      for (let j=0; j<this.typcnt[i]; j++) {
        let notfound = true;
        while (notfound) {
          let rand = int(random(this.snails1.length));
          if (this.snails1[rand]==undefined) {
            switch (i) {
            case 0: 
              this.snails1[rand] = 
                new SnailT0(
                  this,
                  rand,
                  this.snails0[rand],
                  this.cyclesPerRectangle,
                  // mean nr of cycles to start a snail
                  24, 
                  data.linesize.getValue(),
                  [0,0,0,255]
                  );
            break;
            case 1: 
              this.snails1[rand] = 
                new SnailT1(
                  this,
                  rand,
                  this.snails0[rand],
                  this.cyclesPerRectangle,
                  24, 
                  data.linesize.getValue(),
                  this.lcolor[1]
                  );
            break;
            case 2: 
              this.snails1[rand] = 
                new SnailT2(
                  this,
                  rand,
                  this.snails0[rand],
                  this.cyclesPerRectangle,
                  24, 
                  data.linesize.getValue(),
                  this.lcolor[1]
                  );
              break;
            }
            notfound = false;
          } else {
            rand = (rand+1<this.snails1.length
                   ?rand+1:0);
          }
        }
      }
    }
    /*
    for (let i=0; i<this.snails1.length;i++) {
      print("YY:"+i+","
            +this.snails1[i].getClassName([0]));
    }
    */
  }
  //
  trigger() {
    this.auto.evePush(0, 0); // TRIGGER event
    this.auto.eveShift();
    if (this.snails1!=undefined) {
      for (let i = 0; i < this.snails1.length; i++) {
        this.snails1[i].trigger();
      }
    }
  }
  triggerSnails(snails_) {
    for (let i = 0; i < snails_.length; i++) {
      snails_[i].drawTrigger();
    }
  }
  //
  // State counting
  //
  stateInit(len_, cnt_) {
    this.stateTimer = data.frames.getValue();
    this.stateNumbers = [];
    for (let i = 0; i < len_; i++) {
      this.stateNumbers[i] = 0;
    }
    this.stateNumbers[0] = cnt_;
  }
  stateIncr(s_, b_) {
    this.stateNumbers[s_] += b_ ? 1 : -1;
  }
  stateLessThanMaxNumberOfRunningSnail() {
    let ret =
      this.stateNumbers[3] < this.maxNumberOfRunningSnails ? true : false;
    return ret;
  }
  statePrint() {
    this.stateTimer -= 1;
    if (this.stateTimer < 0) {
      print("stateCounter:" + this.stateNumbers);
      this.stateTimer = data.frames.getValue();
    }
  }
}
