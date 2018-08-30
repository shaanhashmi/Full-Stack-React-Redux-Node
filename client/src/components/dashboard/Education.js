import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id, this.props.history);
  };

  render() {
    const education = this.props.education.map(exp => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
          {!exp.to ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}

        </td>
        <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-outline-danger rounded-circle"><i className="fas fa-trash"></i></button></td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Education Credential's</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {education}
          </tbody>
        </table>
      </div>
    )
  }
};

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}



export default connect(null, { deleteEducation })(Education);

