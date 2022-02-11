import React from "react"

const Person = (props) => {
    console.log(props)
    // JSX: javascript XML
    // JSX do đội ngũ phát triển viết ra để phục vụ viết html bên trong function js
    const age = "Ha Noi";
    const img = "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/131437508_2994484627320968_4944986382441755463_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_ohc=50QZBwrvg-oAX_EMCKh&_nc_ht=scontent.fhan2-3.fna&oh=00_AT8bNATcQ6olMVw005qh7lMmePOd-gv_Ou0WmZA_rRVypA&oe=622825AA"
    return (
      <div>
        <div>Name: {props.name}</div>
        <div>Age: {props.age} - <span>{age}</span></div>
        {/* <img src={img}/> */}
      </div>
    );
}

const PersonWithoutJSX = (props) => {
    return React.createElement('div', {id: "test"}, "hello" )
}
export default Person;