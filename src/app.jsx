import React from "react"
import ReactDOM from "react-dom"

export class CommentBox extends React.Component{

    constructor(props){
        super(props);
    }


    render(){

        return (
            <div>こんにちは！今日はいい天気ですね。</div>
        );
    }
}


ReactDOM.render(
    <CommentBox />
    , document.getElementById("main_content")
);
