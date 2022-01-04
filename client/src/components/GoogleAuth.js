import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2' , () => {
            window.gapi.client.init({
            clientId:'742320767555-1n8h2t90aihsoj1unm5m91mohnvfio1a.apps.googleusercontent.com',
            scope:'email'
            }).then( ()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }
    
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSingnOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null)
        {
            return null
        }
        else if (this.props.isSignedIn) 
        {
            return (<button onClick={this.onSingnOutClick} className='ui red google button'>
                <i className='google icon' />
                    Sign Out
            </button>
            )
        }
        else {
            return (
                <button onClick={this.onSignInClick} className='ui red google button'>
                    <i className='google icon' />
                        Sign In with Google
                </button>
            )
        }
    }


    render() { 
        return <div>{this.renderAuthButton()}</div>;

    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps,
    {signIn,signOut})
    (GoogleAuth);