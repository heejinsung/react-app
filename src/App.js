import React, { Component } from 'react';
import TOC from "./components/TOC"; 
import ReadContent from "./components/ReadContent"; 
import CreateContent from "./components/CreateContent"; 
import Subject from "./components/Subject"; 
import Control from "./components/Control"; 
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = { 
      mode:'create',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break; // 강제로 while문을 끝내는 코드
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id = this.max_content_id+1;
        // ---*** push ***--- 
        // 원본 그대로 살아있는 상태에서 원본을 변형시킨것
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        // ---*** concat ***---
        // 원본을 복제해서 교체한 것
        // var _contents = this.state.contents.concat({
        //   id: this.max_content_id,
        //   title: _title,
        //   desc: _desc,
        // });

        // ---*** from ***---
        // 원본을 복제해서 변형시킨것, 즉 원본을 변형시킨것이다
        var newContents = Array.from(this.state.contents);
        newContents.push({
          id: this.max_content_id,
          title: _title,
          desc: _desc,
        });
        this.setState({
          //contents: _contents
          contents:newContents
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }

    console.log('render', this);

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' }); // 원본을 교체한것
          }.bind(this)}
        >
        </Subject>
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
       <Control onChangeMode={function(_mode){
         this.setState({
           mode:_mode
         })
       }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;

