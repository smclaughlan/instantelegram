import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
        (props.feedPosts && props.user) ?
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
                        {props.feedPosts.map((post) => {
                            return (
                                <Grid item className={classes.column1}>
                                    <Image
                                        imageId={post.postId}
                                        postDate={post.timestamp}
                                        imageUrl={post.imageUrl}
                                        imageCapt={post.caption}
                                        imagePosterUsername={post.username}
                                        imagePosterAviUrl={post.avatarUrl}
                                        imagePosterId={post.userId}
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
        feedPosts: state.user.feedPosts,
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
