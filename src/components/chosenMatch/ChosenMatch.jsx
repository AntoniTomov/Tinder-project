import { useState } from "react";
import { useParams } from 'react-router-dom'
import  Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles, Grid, GridList, GridListTile  } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import SimpleImageSlider from "react-simple-image-slider";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',

    },
    head: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            margin: theme.spacing(1),
        },
    }));

    
export default function ChosenMatch({users}) {

    
    const styles = useStyles();
    
    const { id } = useParams();
    const images = [
        { url: "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270" },
        { url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" },
        { url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" },
        { url: "https://static.toiimg.com/photo/72975551.cms" },
        { url: "https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg" },
    ];

    const chosenUser = users.find(user => user.id === parseInt(id));

    console.log('Type of ID: ', id, typeof id);
    console.log(users);
    console.log('User: ', chosenUser);
        
    return (
        <CssBaseline>
                <Grid container direction='column' alignItems='center' xs={4} spacing={2}>
                    <Grid item>
                        <SimpleImageSlider
                            showNavs={true}
                            showBullets={true}
                            width={350}
                            height={250}
                            images={images}
                        />
                    </Grid>
                    <Grid item>{chosenUser.name} {chosenUser.age}</Grid>
                    <Grid item>{chosenUser.description}</Grid>
                    <Grid item>{chosenUser.location}</Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>
                </Grid>
                {/* <GridList cellHeight={200} spacing={1}>
                    <GridListTile>

                    </GridListTile>

                </GridList> */}
        </CssBaseline>
    )
}