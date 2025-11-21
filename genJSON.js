// Robert Gorr-Grohmann
// 2025-01-01
// Read and write JSON file
class JSONObject {
  constructor() {
    this.writeJSON = "";
    this.readJSON = "";
    // Prepare read json file
    this.divInputfile = 
      document.getElementById("idInputfile");
    this.divInputfile.style.display = "none";
    let h1 = document.createElement ( 'div' );
    this.divInputfile.append ( h1 );
    let h11 = document.createElement ('p');
    h11.innerHTML = 'Inputfile: ';
    h1.appendChild(h11);    
    let h111 = document.createElement ('input');
    h111.type = 'file';
    h111.onchange = function(){json.readJSONFile();};
    h11.appendChild(h111);    
  }
  readJSONFile() {
    this.divInputfile.style.display = "block";
    const [file] = 
      document.querySelector('input[type=file]').files;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.readJSON = reader.result;
      this.parseJSONFile();
      this.divInputfile.style.display = "none";
      }, false);
    if (file) {reader.readAsText(file);}
  }
  parseJSONFile() {
    print("parseJSONFile");
    let as = this.readJSON.split(/\|\|\|/);
    data.fromJSON(as[0]);
    snailsAda.fromJSON(as[1]);
  }
  writeJSONFile() {
    // Global data
    let s1 = data.toJSON();
    print(s1);
    let s2 = drawSnails.toJSON();
    print(s2);
    // Write file
    let s3 = s1+"|||"+s2;
    const blob = 
          new Blob([s3],{type:'text/plain'});
    const file = URL.createObjectURL(blob);
    const down = document.createElement('a');
    down.href = file;
    let d = new Date();
    let fname = 'snails-'+data.col.getBgName();
    fname += '-'+data.col.getLineName();
    fname += '-'+data.rec.getX();
    fname += '-'+data.rec.getY();
    fname += '-'+d.getTime()+'.json';
    down.download = fname;
    document.body.appendChild(down);
    down.click();
    URL.revokeObjectURL(file);
  }
  jsonCorrectString(s_) {
    let s1,s2,reg;
    // Erstes und letztes Zeichen entfernen
    s1 = s_.slice(1,s_.length-1);
    // \n und \" entfernen
    reg = /\\n/g;
    s2 = s1.replace (reg,'');
    reg = /\\"/g;
    s1 = s2.replace (reg,'"');
    s2 = '';
    // Tabs und Zeilenende durch Leerzeichen ersetzen
    for (let i=0;i<s1.length;i++) {
      s2 += 
        ((s1[i]=='\n')||(s1[i]=='\t')?' '
         :(s1[i]=='\\'?'':s1[i]));
    }
    // Doppelte Leerzeichen löschen
    s1 = '';
    let b = false;
    for (let i=0;i<s2.length;i++) {
      if (s2[i]==' ') {
        if (!b) {
          b = true;
          s1 += ' ';
        }
      } else {
        b = false;
        s1 += s2[i];
      }
    }
    // Objektklammern einfügen
    s2 = '{'+s1+'}';
    // Zeilenumbrüche einfügen
    reg = /\{\"nr\":/g;
    s1 = s2.replace (reg,'\n{"nr":');
    return(s1);
  }
}
