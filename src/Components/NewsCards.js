import React from 'react';
import NewsCard from './NewsCard';
import {Grid, Grow, makeStyles, Typography} from '@material-ui/core';
const useStyles = makeStyles({
    container: {
        padding: '0 5%',
        width: '100%',
        margin: 10
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45vh',
        padding: '10%',
        borderRadius: 10,
        color: 'white'
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    }
});

const infoCards = [
    { color: '#7676ff', title: 'Latest News', text: 'Give me the latest news'},
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
  ];

  const infoCards1 = [
    { color: '#7676ff', title: 'Try Saying', text: 'Open article number [2]'},
    { color: '#1565c0', title: 'Try Saying', text: 'Go Back' },
  ];

const NewsCards = ({news, active}) => {
    const classes = useStyles();
    if(!news.length){
        return (
            <Grow in>
                <Grid container alignItems="stretch" spacing={3} className={classes.container}>
                    {infoCards.map((infoCard)=>(
                        <Grid item xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                            <div className={classes.card} style={{backgroundColor: infoCard.color}}>
                                 <Typography variant="h5">{infoCard.title}</Typography>
                                 {infoCard.info ? 
                                (<Typography variant="h6">
                                    <strong>
                                        {infoCard.title.split(' ')[2]}
                                    </strong>
                                    <br />
                                    {infoCard.info}
                                </Typography>): null}
                                <Typography variant="h6">Try Saying: <br /><i>{infoCard.text}</i></Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        )
    }
    return (
        <Grow in>
            <Grid container alignItems="stretch" spacing={3} className={classes.container}>
            <Grid container alignItems="center" justify="space-around" style={{marginTop: 20}}>
            {infoCards1.map((infoCard)=>(
                        <Grid item xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                            <div className={classes.card} style={{backgroundColor: infoCard.color}}>
                                 <Typography variant="h5">{infoCard.title}</Typography>
                                <Typography variant="h6">Try Saying: <br /><i>{infoCard.text}</i></Typography>
                            </div>
                        </Grid>
            ))}
            </Grid>
            {news.map((news, i)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                    <NewsCard news={news} i={i} active={active}/>
                </Grid>
            ))}
            </Grid>
        </Grow>
    )
}

export default NewsCards;