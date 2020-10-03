### Go to alan.app

Register there and apply voucher code to get 2500 free interactions
### JSMASTERY 

After that create a empty project

const API_KEY = 'dea454ae54b444f2ac5690023c5f281a';
let savedArticles = [];
// News by Source
intent('Give me the news from $(source* (.*))', (p)=>{
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value){
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(' ').join('-')}`
    }
    api.request(NEWS_API_URL, (error, response, body)=>{
        const {articles} = JSON.parse(body);
        
        if(!articles.length){
            p.play('Sorry, news source not found, please try again.')
            return;
        }
        savedArticles = articles;
        p.play({command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) ${p.source.value}.`)
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
});

intent('Give me the latest news', (p)=>{
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    NEWS_API_URL = `${NEWS_API_URL}&country=in`
    api.request(NEWS_API_URL, (error, response, body)=>{
        const {articles} = JSON.parse(body);
        
        if(!articles.length){
            p.play('Sorry, country not found, please try again.')
            return;
        }
        savedArticles = articles;
        p.play({command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) news from India.`)
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
});

// News by Terms
intent('What\'s up with $(term* (.*))', (p)=>{
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.term.value){
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
    }
    api.request(NEWS_API_URL, (error, response, body)=>{
        const {articles} = JSON.parse(body);
        
        if(!articles.length){
            p.play('Sorry, term not found, please try again.')
            return;
        }
        savedArticles = articles;
        p.play({command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) term on ${p.term.value}.`)
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
});

// News by Categories

const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.C.value){
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    api.request(NEWS_API_URL, (error, response, body)=>{
        const {articles} = JSON.parse(body);
        
        if(!articles.length){
            p.play('Sorry, category not found, please try again.')
            return;
        }
        savedArticles = articles;
        p.play({command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) article on ${p.C.value}.`)
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
});

const confirmation = context(()=>{
    intent('yes',async(p)=>{
        for(let i=0;i<savedArticles.length;i++){
             p.play({command: 'highlight', articles: savedArticles[i]});
             p.play(`${savedArticles[i].title}`)
        }
    })
    intent('no', (p)=>{
        p.play('Ok. ')
    })
});

intent('Open (the|) (article|) (number|) $(number* (.*))', (p)=>{
    if(p.number.value){
        p.play({command: 'open', number: p.number.value, articles: savedArticles});
    }
});

intent('go back', (p)=>{
   p.play('Sure, going back')
   p.play({command: 'newHeadlines', articles: []});
});

Click on Intergrations on Top and copy the alan sdk key and paste in alenKey in App.js file
