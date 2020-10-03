import React, {useState, useEffect, createRef} from 'react';
import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, makeStyles} from '@material-ui/core';
import classnames from 'classnames';

const useStyles = makeStyles({
    media: {
        height: 250,
      },
      border: {
        border: 'solid',
      },
      fullHeightCard: {
        height: '100%',
      },
      card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '10px solid white',
      },
      activeCard: {
        borderBottom: '10px solid #22289a',
      },
      grid: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      },
      title: {
        padding: '0 16px',
      },
      cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      }
});

const NewsCard = ({news: {description, publishedAt, source, title, url, urlToImage}, i, active}) => {
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref)=>window.scroll(0, ref.current.offsetTop - 50);
    useEffect(()=>{
        setElRefs((refs)=>Array(20).fill().map((_, j)=>refs[j] || createRef()))
    },[]);
    useEffect(()=>{
        if(i === active && elRefs[active]){
            scrollToRef(elRefs[active]);
        }
    },[i, active, elRefs])
    const classes = useStyles();
    return (
        <Card ref={elRefs[i]} className={classnames(classes.card, active === i ? classes.activeCard: null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage}/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i+1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard;