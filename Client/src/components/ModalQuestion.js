import React from 'react';
import { Link } from 'react-router-dom';

class FormQuestion extends React.Component {

    componentDidMount(){
        document.body.classList.add("modal-open");
    }

    componentWillUnmount() {
        document.body.classList.remove("modal-open");
      }

    render(){
        return (
        <div>
            <Link to="" data-toggle="modal" data-target={`#exampleModal${this.props.value}`}>
                {this.props.op}
            </Link>

            <div className="modal fade" id={`exampleModal${this.props.value}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`exampleModalLabel${this.props.value}`}>{this.props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            {this.props.body}
                        </div>

                        <div className="modal-footer">
                            {this.props.action}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default FormQuestion;