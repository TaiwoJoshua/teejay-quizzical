import React from "react";

export default function Question(props){
    React.useEffect(() => {
        if(props.submitted){
            for (let i = 0; i < 5; i++) {
                if(props.answers[i] === props.userSelections[i]){
                    for (let j = 1; j < 5; j++) {
                        let currid = j.toString() + props.id;
                        let val = document.getElementById(currid).innerText;
                        if(props.answers[i] === val){
                            document.getElementById(currid).style.backgroundColor = "#94D7A2";
                            document.getElementById(currid).style.border = "1px solid #94D7A2";
                        }
                    }
                }else{
                    for (let j = 1; j < 5; j++) {
                        let currid = j.toString() + props.id;
                        let val = document.getElementById(currid).innerText;
                        if(props.answers[i] === val){
                            document.getElementById(currid).style.backgroundColor = "#94D7A2";
                            document.getElementById(currid).style.border = "1px solid #94D7A2";
                        }else if(props.userSelections[i] === val){
                            document.getElementById(currid).style.backgroundColor = "#F7DADC";
                            document.getElementById(currid).style.border = "1px solid #F7DADC";
                        }
                    }
                }
            }
        }
    }, [props.answers, props.id, props.submitted, props.userSelections])

    return(
        <div className="question">
            <h5>{props.question}</h5>
            <div>
                <input type="radio" name={props.id} id={props.id + "1"} value={props.options[props.index[0]]} onChange={props.handleChange} disabled={props.submitted}/>
                <label htmlFor={props.id + "1"} id={"1" + props.id}>{props.options[props.index[0]]}</label>
                <input type="radio" name={props.id} id={props.id + "2"} value={props.options[props.index[1]]} onChange={props.handleChange} disabled={props.submitted}/>
                <label htmlFor={props.id + "2"} id={"2" + props.id}>{props.options[props.index[1]]}</label>
                <input type="radio" name={props.id} id={props.id + "3"} value={props.options[props.index[2]]} onChange={props.handleChange} disabled={props.submitted}/>
                <label htmlFor={props.id + "3"} id={"3" + props.id}>{props.options[props.index[2]]}</label>
                <input type="radio" name={props.id} id={props.id + "4"} value={props.options[props.index[3]]} onChange={props.handleChange} disabled={props.submitted}/>
                <label htmlFor={props.id + "4"} id={"4" + props.id}>{props.options[props.index[3]]}</label>
            </div>
            <hr />
        </div>
    );
}