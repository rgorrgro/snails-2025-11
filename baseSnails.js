// Robert Gorr-Grohmann
// September 2025
// Basic Snail Geometry
//
"use strict;";
class BaseSnails {
  constructor(size, centralizer, cntx, cnty) {
    //print("BaseSnails constructor start");
    // Create geometry
    //print("BaseSnails: new geometry");
    this.geo = new Geometry(size, cntx, cnty);
    //print(this.geo.toStringFull());
    //print("BaseSnails: new geometry - Done");
    // Create list of snails with geometry coordinates
    //print("BaseSnails: create snails");
    this.arr = [];
    for (let i = 0; i < cntx * cnty * 4; i++) {
      let snail = new BaseSnail(i, this.geo, cntx, cnty);
      if (snail.empty) {
        i = cntx * cnty * 4;
      } else {
        this.arr.push(snail);
      }
    }
    if (this.arr.length == 0) {
      hlp.err("BaseSnails Error: programm error nr 1.");
    }
    for (let i = 0; i < this.arr.length; i++) {
      //print(this.baseSnails[i].toString());
    }
    //print("BaseSnails constructor - Done");
  }
  toString() {
    let s = "BaseSnails arr:[";
    for (let i = 0; i < this.arr.length; i++) {
      s += "\n" + this.arr[i].toString();
    }
    return s + "\n]";
  }
}
class BaseSnail {
  constructor(nr_, geo_, cntx_, cnty_) {
    this.nr = nr_;
    this.empty = true;
    this.steps = [];
    let p = undefined;
    let p1 = undefined;
    let p2 = undefined;
    p1 = geo_.getNextFreePoint();
    if (p1 == undefined) {
      return;
    }
    let endfor = cntx_ * cnty_ * 4;
    for (let i = 0; i < endfor; i++) {
      if (!p1.isFree) {
        if (this.steps.length == 0) {
          hlp.err("SnailError: programm error nr 2.");
          return;
        } else {
          let p = this.steps[0].p1;
          if (!p1.equals(p)) {
            hlp.err("SnailError: programm error nr 3.");
          } else {
            this.empty = false;
          }
          return;
        }
      } else {
        p1.isFree = false;
        p2 = geo_.getNextFreeRectPoint(p1);
        if (p2 == undefined) {
          return;
        }
        p2.isFree = false;
        let step = new BaseSnailStep(p1, p2);
        this.steps.push(step);
        if (!p2.isEdge) {
          p1 = geo_.getAssociated(p2);
        } else {
          p = this.steps[0].p1;
          if (p.isEdge) {
            this.empty = false;
            return;
          } else {
            this.reordering();
            p2 = this.steps[this.steps.length - 1].p2;
            p1 = geo_.getAssociated(p2);
          }
        }
      }
    }
  }
  reordering() {
    let arr2 = [];
    for (let i = this.steps.length - 1; i >= 0; i--) {
      let step = this.steps[i];
      let h = step.p1;
      step.p1 = step.p2;
      step.p2 = h;
      arr2.push(step);
    }
    this.steps = arr2;
  }
  toString() {
    let s = "{nr=" + this.nr;
    s += ",len=" + this.steps.length;
    s += ",[";
    for (let i = 0; i < this.steps.length; i++) {
      s += "," + i + ":" + this.steps[i].toString();
    }
    s += "]}";
    return s;
  }
}
//
// Step of a path of a snail
//   are two points of class GeometryPoint
//   of a rectangle
//
class BaseSnailStep {
  constructor(p1_, p2_) {
    this.p1 = p1_;
    this.p2 = p2_;
  }
  toString() {
    let s = "";
    s += "{" + this.p1.toString();
    s += "," + this.p2.toString() + "}";
    return s;
  }
}
//
// Geometry
//   rectangles of equal size, each with 8 points
//   neighbour rectangles have 3 (sometimes 1) point
//   in common
//
class Geometry {
  constructor(size_, cntx_, cnty_) {
    this.size = size_;
    this.cntx = cntx_;
    this.cnty = cnty_;
    this.pts = [];
    for (let x = 0; x < cntx_; x++) {
      let h0 = [];
      for (let y = 0; y < cnty_; y++) {
        let h1 = [];
        for (let z = 0; z < 8; z++) {
          let p = new GeometryPoint(x, y, z, cntx_, cnty_);
          h1.push(p);
        }
        h0.push(h1);
      }
      this.pts.push(h0);
    }
  }
  setFree(p_, bool_) {
    this.geopts[p_.x][p_.y][p_.z].isFree = bool_;
  }
  getFree(p_) {
    return this.geopts[p_.x][p_.y][p_.z].isFree;
  }
  getNextFreePoint() {
    for (let x = 0; x < this.cntx; x++) {
      for (let y = 0; y < this.cnty; y++) {
        for (let z = 0; z < 8; z++) {
          let p = this.pts[x][y][z];
          if (p.isFree) {
            return p;
          }
        }
      }
    }
    return undefined;
  }
  getNextFreeRectPoint(p_) {
    let x = p_.x;
    let y = p_.y;
    let j = int(random(8));
    for (let i = 0; i < 8; i++) {
      let k = i + j >= 8 ? i + j - 8 : i + j;
      let p = this.pts[x][y][k];
      if (p.isFree) {
        return p;
      }
    }
    return undefined;
  }
  getAssociated(p_) {
    let p = this.pts[p_.associatedx][p_.associatedy][p_.associatedz];
    return p;
  }
  toString() {
    let s = "Geometry:\n";
    for (let x = 0; x < this.cntx; x++) {
      for (let y = 0; y < this.cnty; y++) {
        for (let z = 0; z < 8; z++) {
          let p = this.pts[x][y][z];
          s += p.toString() + "\n";
        }
      }
    }
    s += "end";
    return s;
  }
  toStringFull() {
    let s = "Geometry:\n";
    for (let x = 0; x < this.cntx; x++) {
      for (let y = 0; y < this.cnty; y++) {
        for (let z = 0; z < 8; z++) {
          let p = this.pts[x][y][z];
          s += p.toStringFull() + "\n";
        }
      }
    }
    s += "end";
    return s;
  }
}
//
// GeometryPoint
//   every geometry point with
//      its coordiates x(0,cntx),y(0,cnty),z(0,7)
//      and the info if it is an edge isEdge
//      and if it is free for planning isFree
//      and the coordinates of its
//        associated point associatedx,y,z
//
class GeometryPoint {
  constructor(x_, y_, z_, cntx_, cnty_) {
    this.x = x_;
    this.y = y_;
    this.z = z_;
    this.isFree = true;
    //
    this.isEdge = false;
    if (x_ == 0 && (z_ == 0 || z_ == 3 || z_ == 5)) {
      this.isEdge = true;
    }
    if (y_ == 0 && (z_ == 0 || z_ == 1 || z_ == 2)) {
      this.isEdge = true;
    }
    if (x_ == cntx_ - 1 && (z_ == 2 || z_ == 4 || z_ == 7)) {
      this.isEdge = true;
    }
    if (y_ == cnty_ - 1 && (z_ == 5 || z_ == 6 || z_ == 7)) {
      this.isEdge = true;
    }
    //
    if (!this.isEdge) {
      let addx = [-1, 0, 1, -1, 1, -1, 0, 1];
      let addy = [-1, -1, -1, 0, 0, 1, 1, 1];
      let addz = [7, 6, 5, 4, 3, 2, 1, 0];
      this.associatedx = x_ + addx[z_];
      this.associatedy = y_ + addy[z_];
      this.associatedz = addz[z_];
    }
  }
  equals(p_) {
    return this.x == p_.x && this.y == p_.y && this.z == p_.z;
  }
  toString() {
    let s = "P(" + this.x;
    s += "," + this.y;
    s += "," + this.z + ")";
    return s;
  }
  toStringFull() {
    let s = "{P(" + this.x;
    s += "," + this.y;
    s += "," + this.z + ")";
    s += ",isFree=" + this.isFree;
    s += ",isEdge=" + this.isEdge;
    if (!this.isEdge) {
      s += ",Associated=(" + this.associatedx;
      s += "," + this.associatedy;
      s += "," + this.associatedz + ")";
    }
    return s + "}";
  }
}
