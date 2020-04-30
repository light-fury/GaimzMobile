// @flow
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';

import SocialButton from '../../../../Components/SocialButton';
import styles from './StreamDetailScreen.style';
import {
  arrowLeft,
} from '../../../../Assets';
import {
  colors,
} from '../../../../Assets/config';

const StreamDetailScreen = ({ navigation }) => {
  const [currentLive] = useState(navigation.getParam('item', {}));
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <WebView
        onLoad={() => setLoading(false)}
        source={{ uri: `https://www.twitch.tv/${currentLive.twitchAccountName || ''}` }}
        style={styles.webView}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      >
        {loading && (
          <ActivityIndicator
            style={styles.flexContainer}
            size="large"
            color={colors.white}
          />
        )}
      </WebView>
      <SocialButton
        style={styles.socialButton}
        icon={arrowLeft}
        onClick={() => navigation.pop()}
      />
    </SafeAreaView>
  );
};

StreamDetailScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(StreamDetailScreen);
