import React from 'react';
import { connect } from 'react-redux';
import { fetchStream,deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
import history from '../../history';
import Modal from '../modal';


class StreamDelete extends React.Component {

    componentDidMount(){
       this.props.fetchStream(this.props.match.params.id)
       console.log(this.props)
    }

    renderActions() {

        const {id} = this.props.match.params;

        return (
        <React.Fragment>
            <button onClick={()=> this.props.deleteStream(id)} className='ui button negative'>Delete</button>
            <Link to='/' className='ui button'>Cancel</Link>
        </React.Fragment>
    )
        }

        renderContent() {
            if(!this.props.stream) {
                return 'Are you sure you want to Delete this Stream?'
            }
            return `Are you sure want you to Delete this Stream with Title:${this.props.stream.title}`
        }

    render() {

        return(  
            <Modal 
                title='Delete Stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={()=>history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect ((mapStateToProps),{fetchStream,deleteStream})(StreamDelete)