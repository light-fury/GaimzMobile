// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';

import SocialButton from '../../../../Components/SocialButton';
import styles from './TwitchDetailScreen.style';
import {
  arrowLeft,
} from '../../../../Assets';

const TwitchDetailScreen = ({ navigation }) => {
  const [currentLive] = useState(navigation.getParam('item', {}));

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <WebView
        source={{ uri: `https://www.twitch.tv/${currentLive.twitchUserName || ''}` }}
        style={styles.webView}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
      <SocialButton
        style={styles.socialButton}
        icon={arrowLeft}
        iconStyle={styles.headerIcon}
        onClick={() => navigation.pop()}
      />
    </SafeAreaView>
  );
};

TwitchDetailScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(TwitchDetailScreen);
