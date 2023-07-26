import "./App.css";
import React,{ useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [quote, setQuote] = React.useState();
    const [quoteString, setQuoteString] = React.useState();
    const [quoteAuthor, setQuoteAuthor] = React.useState();
    const [submit, setSubmit] = React.useState();
    
    React.useEffect(() => {
        axios.get("http://localhost:5000/quote").then((res)=>{
            setQuote(res.data);
        })
        .catch((err)=>{
            console.error(err);
        })
    }, [submit]);
    async function handleClick(){
        try{
        const res = await axios.post("http://localhost:5000/quote",{ "author": quoteAuthor, "quote" : quoteString });
        setSubmit(res);
        }
        catch{
            console.log("some error occured ramu");
        }

    }
    return (
        <div className="App">
            <h1 id="header">These are quotes from my MongoDB database</h1>
            <p id="quote" className="content">{quote && quote.map((item)=>(
               <div>{item.quote} <i>by</i> <b>{item.author}</b></div> 
            ))}</p>

            <div id="quoteMargin" className="margin">
            <label htmlFor="Quote" className="label">Write your quote : </label>
            <input type="text" id="Quote" onChange={(e)=>{setQuoteString(e.target.value)}} />
            </div>

            <div id="authorMargin" className="margin">
            <label htmlFor="Author" className="label">Write your name : </label>
            <input type="text" id="Author" onChange={(e)=>{setQuoteAuthor(e.target.value)}} />
            </div>

            <button id="btn" onClick={handleClick}>Submit</button>
        </div>
    );
}


export default App;