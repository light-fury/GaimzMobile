// @flow

import {connect} from 'react-redux';

import MatchErrorScreen from './MatchErrorScreen';
import {createSecretsData} from '../../../../State/Secrets/Actions';

const mapStateToProps = (state) => ({
  Secrets: state.Secrets,
});

const mapDispatchToProps = (dispatch) => ({
  createSecretsData: (...args) => {
    dispatch(createSecretsData(...args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchErrorScreen);
