import React, { Component } from 'react';

class TOC extends Component {
  render() {
    console.log('TOC render');
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while(i < data.length){
      lists.push(
        <li key={data[i].id}> 
          <a 
            href={"/content/"+data[i].id}
            // 속성을 이용하지않고 하는 방법
            //data-id={data[i].id}
            onClick={function(id, e){
              e.preventDefault();
              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
          >{data[i].title}</a>
        </li>
      );
      i= i + 1;
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default TOC;