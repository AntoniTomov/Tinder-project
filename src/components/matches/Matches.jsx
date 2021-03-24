import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import { shadows } from '@material-ui/system';
import { SportsRugbySharp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        padding: theme.spacing(0, 10, 2),
        justifyItems: "flex-start",
        alignItems: "center",
    },
    item: {
        margin: `${theme.spacing(2)}px`,
        '&:hover':  {boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'},
        // "&hover":  
    },
}));

const users = [
    { name: 'Pesho', age: 19 , url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg'},
    { name: 'Genadi', age: 23 , url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'},
    { name: 'Ginka', age: 25 , url: 'https://media.jobcase.com/images/24b8d0dd-2b2b-4f53-b8a9-c1d3a1e5f248/large'},
    { name: 'Strahinka', age: 19 , url: 'https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg'},
    { name: 'Doy4o', age: 19 , url: 'https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png'},
    { name: 'Ivan', age: 19 , url: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70'},
    { name: 'Zlatko', age: 19 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU53EcOIyxE7pOZJBvGHJGbDk39EYxvOhbdw&usqp=CAU'},
    { name: 'Donyo', age: 19 , url: 'https://expertphotography.com/wp-content/uploads/2018/10/cool-profile-pictures-fake-smile.jpg'},
    { name: 'Zasmqna', age: 19 , url: 'https://competition.adesignaward.com/images/designers-portrait-photo-1.jpg'},
    { name: 'Ivanka', age: 19 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlSyMW39B5owZrxmWcxQy8x8cTC5ofBFPsvA&usqp=CAU'}
];



export default function Matches() {
    const styles = useStyles();

    return (
        <Grid
            container
            className={styles.container}
        >
        {users.map((user) =>
        // <Box boxShadow={3} style={{borderRadius:"2rem"}}>
            <Grid className={styles.item} item xs key={user.name}>
                <div style={{ backgroundImage: 'url(' + user.url + ')' }} className='card'>
                    <h3>{user.name}</h3>
                    <h3>{user.age}</h3>
                </div>
            </Grid>
        // </Box>
        )}
        </Grid>
    );
}
