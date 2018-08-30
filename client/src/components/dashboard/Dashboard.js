import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome to <Link className="text-info" to={`/profile/${profile.handle}`}> {user.name}</Link>
            </p>
            <ProfileActions />
            {profile.education ? <Experience experience={profile.experience} /> : null}
            <Education education={profile.education} />

            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger rounded-0">Delete Account</button>
          </div>
        )
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-md btn-info rounded-0">
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-5">Dashboard</h3>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapSteteToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapSteteToProps, { getCurrentProfile, deleteAccount })(Dashboard);
