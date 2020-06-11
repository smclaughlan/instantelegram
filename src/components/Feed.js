import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import { getFeedPostReq, getUserProfileReq } from '../redux/user';

import Image from './Image';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'space-around',
        // backgroundImage: theme.gradientBackground,
    },
    paper: {
        padding: theme.spacing(2),
        // margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20,
        maxWidth: 1000,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    gridList: {
        justifyContent: 'space-around',
        maxWidth: 500,
        height: 450,
    },
}));

function Feed(props) {
    React.useEffect(() => {
        let id = props.currentUserId;
        props.getFeedPostReq(id);
        props.getUserProfileReq(id);
    }, []);

    const classes = useStyles();
    return (
        (props.followings && props.user) ?
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid
                        container
                        spacing={3}
                        direction="column"
                        justify="center"
                        alignContent="center"
                        alignItems="flex-start"
                    >

                        {Object.keys(props.followings).map(following => {
                            const postObj = props.followings[following].posts;
                            const username = props.followings[following].username;
                            const avatarUrl = props.followings[following].avatarUrl;

                            if (postObj) {
                                return Object.values(postObj).map((post) => {
                                    return (
                                        <Grid item className={classes.column1}>
                                            <Image imageId={post.id}
                                                postDate={post.timestamp}
                                                imageUrl={post.imageUrl}
                                                imageCapt={post.caption}
                                                imagePosterUsername={username}
                                                imagePosterAviUrl={avatarUrl}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                            return;
                        })}

                        {Object.values(props.posts).map(post => {
                            return (
                                <Grid item className={classes.column1}>
                                    <Image imageId={post.id}
                                        postDate={post.timestamp}
                                        imageUrl={post.imageUrl}
                                        imageCapt={post.caption}
                                        imagePosterUsername={props.user.username}
                                        imagePosterAviUrl={props.user.avatarUrl}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>

                </Paper>
            </div >
            :
            <div>Loading</div>
    )
}

const mapStateToProps = state => {
    return {
        followings: state.user.followings,
        posts: state.user.posts,
        user: state.user.profile,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getFeedPostReq: (...args) => dispatch(getFeedPostReq(...args)),
        getUserProfileReq: (...args) => dispatch(getUserProfileReq(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Feed
);
