import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import swal from '@sweetalert/with-react';

class Comments extends Component {
    state= {
        newInput: {
            comments: ''
        }
    }

    handleChangeComments = (event) => {
        this.setState({
            newInput: {
                comments: event.target.value
            }
        })
    }

    handleSubmit = (input) => {
        if (this.props.reduxState.editReducer === false) {
            this.props.dispatch({type: 'ADD_COMMENTS', payload:input})
            this.props.history.push('/review')            
        } else if (this.props.reduxState.editReducer === true) {
            this.props.dispatch({type: 'EDIT_FALSE'})
            this.props.dispatch({type: 'ADD_COMMENTS', payload:input})
            this.props.history.push('/review')
        }
    }

    render() {
        if (this.props.reduxState.editReducer === false) {
            return (
                <>
                    <h3>Any comments you would like to share?</h3>
                    <TextField id="standard-basic" label="Comments?" onChange= {(event) => this.handleChangeComments(event)} />
                    <Button variant="contained" size="small" color="primary" onClick={() => {this.handleSubmit(this.state.newInput.comments)}}>Submit</Button>
                </>
            )
        } else if (this.props.reduxState.editReducer === true) {
            return (
                <>
                    <h3>Any comments you would like to share?</h3>
                    <TextField id="standard-basic" label="Comments" onChange= {(event) => this.handleChangeComments(event)} />
                    <Button variant="contained" size="small" color="primary" onClick={() => {this.handleSubmit(this.state.newInput.comments)}}>Submit & Return to Review</Button>
                </>
            )
        }
    }
}

const putReduxDataProps = (reduxState) => {
    return {
      reduxState
    }
}

export default connect(putReduxDataProps)(withRouter(Comments));