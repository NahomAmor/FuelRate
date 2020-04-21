// import { connect } from 'react-redux';
// import {
//   compose,
//   withHandlers,
//   lifecycle,
//   withContext,
//   getContext,
// } from 'recompose';

// const withStore = compose(
//   withContext({ store: PropTypes.object }, () => {}),
//   getContext({ store: PropTypes.object }),
// );

// const enhance = compose(
//   withStore,
//   withHandlers({
//     loadData: props => () => props.store.firestore.get('todos'),
//     onDoneClick: props => (key, done = false) =>
//       props.store.firestore.update(`todos/${key}`, { done }),
//     onNewSubmit: props => newTodo =>
//       props.store.firestore.add('todos', { ...newTodo, owner: 'Anonymous' }),
//   }),
//   lifecycle({
//     componentDidMount(props) {
//       props.loadData();
//     },
//   }),
//   connect(({ firebase }) => ({
//     // state.firebase
//     todos: firebase.ordered.todos,
//   })),
// );

// export default enhance(SomeComponent);



export const updateProfile = (info) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        // const profile = getState().firebase.profile;
        const userid = getState().firebase.auth.uid;
        firestore.collection('Profiles').doc(userid).update({
          ...info
        }).then(() => {
            dispatch({
                type: "Profile_updated",
                payload: true
              });
        }).catch((err) => {
            dispatch({
              type: "Profile_error",
              payload: err,
              err
            });
        });
    }
  };