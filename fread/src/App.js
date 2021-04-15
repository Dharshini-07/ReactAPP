import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);this.state = {
      filename: '',
      fileContest: ''
    };
  }
handlefilechange= e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload= () => {
  var array=file.toString().split("\r");
  let result=[];
  let headers=array[0].split(",");
  for(let i=1;i<array.length-1;i++){
        let obj={}
        let str = array[i]
  let s = ''

  let flag = 0
  for (let ch of str) {
    if (ch === '"' && flag === 0) {
      flag = 1
    }
    else if (ch === '"' && flag == 1) flag = 0
    if (ch === ', ' && flag === 0) ch = '|'
    if (ch !== '"') s += ch
  }
   let properties = s.split("|")
  for (let j in headers) {
    if (properties[j].includes(", ")) {
      obj[headers[j]] = properties[j]
        .split(", ").map(item => item.trim())
    }
    else obj[headers[j]] = properties[j]
  }
  result.push(obj)
}
    this.setState({filename: file.name, fileContest: reader.result});
  }
  reader.onerror = () => {
    console.log('file error', reader.error)
  }
}
  render() {
    return(
<div>
  <h1>File read</h1>
  
  <input type="file" onChange={this.handlefilechange}></input>
  <br />
  Delimeter:<input type="textbox" id="deli" ></input>
  <br />
  No. of .Lines :<input type="textbox" id="nl"></input>
  <br />
  <p>{this.state.filename}</p>
  <p>{this.state.fileContest}</p>
</div>
    );
  }
}

export default App