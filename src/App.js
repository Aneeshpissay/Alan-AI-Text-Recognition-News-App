import React, {useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.css';
import NewsCards from './Components/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import { AppBar, Toolbar, Typography} from '@material-ui/core';


const alanKey = process.env.alenKey;

function App() {
  const [news, setNews] = useState([]);
  const [active, setActive] = useState(-1);
  useEffect(()=>{
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number})=>{
        if(command === 'newHeadlines'){
          setNews(articles)
          setActive(-1);
        }
        else if(command === 'highlight'){
          setActive(prevArticle=>prevArticle+1)
        }
        else if(command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          const article = articles[parsedNumber - 1];
          if(parsedNumber > 20){
            alanBtn().playText('Please try that again');
          }
          else if(article){
            window.open(article.url, '_blank');
            alanBtn().playText(`Opening article`)
          }
        }
      }
    })
  },[])
  return (
    <div className="App">
       <AppBar position="static" style={{height: '64px', backgroundColor: '#7676ff'}}>
            <Toolbar>
          <Typography color="inherit" style={{ fontFamily: 'Quicksand'}}>
            ALAN VOICE RECOGNITION NEWS APP
          </Typography>
        </Toolbar>
      </AppBar>
      <NewsCards news={news} active={active}/>
    </div>
  );
}

export default App;
