import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItems from './ProfileItems';
import { getProfiles } from '../../actions/profileActions';


class Profiles extends Component {
  componentDidMount = () => {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (!profiles || loading) {
      profileItems = <Spinner />
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItems key={profile._id} profile={profile} />
        ))
      } else {
        profileItems = <h4>No profiles found...</h4>
      }
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-5 text-center">Develpers Profiles</h1>
              <p className="lead text-center">
                Browse and connect with develpers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapSteteToProps = (state) => ({
  profile: state.profile
})

export default connect(mapSteteToProps, { getProfiles })(Profiles);
