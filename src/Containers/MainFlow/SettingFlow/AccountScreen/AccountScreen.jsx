// @flow
import React, { useContext, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import {
  heroTemplate,
  dotaBackground,
  arrowLeft,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './AccountScreen.style';
import { UserContext } from '../../../../contexts';


const listData = [
  {
    image: heroTemplate,
    title: 'Riki',
    status: '14/6/19',
  },
  {
    image: heroTemplate,
    title: 'Lich',
    status: '17/2/4',
  },
  {
    image: heroTemplate,
    title: 'Pudge',
    status: '7/3/29',
  },
  {
    image: heroTemplate,
    title: 'Lycan',
    status: '6/12/7',
  },
  {
    image: heroTemplate,
    title: 'Phantom Assasin',
    status: '19/2/14',
  },
];

const AccountScreen = ({ navigation }) => {
  const [user] = useContext(UserContext);

  const handleGoBack = useCallback(() => {
    const fromScreen = navigation.getParam('from');
    if (fromScreen && fromScreen.length > 0) {
      navigation.navigate(fromScreen);
    } else {
      navigation.pop();
    }
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate(item.route)}
      style={styles.itemContainer}
    >
      <Image
        source={item.image}
        resizeMode="cover"
        style={styles.heroImage}
      />
      <Text style={[styles.itemHeader, styles.smallFont]}>
        {item.title}
      </Text>
      <Text style={[styles.itemHeader, styles.smallFont, styles.itemDescription]}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: user.userAvatarUrl }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        <Text style={[styles.flexContainer, styles.profileName]}>
          {user.userName}
        </Text>
        <SocialButton
          style={styles.headerButton}
          iconStyle={styles.headerIcon}
          icon={arrowLeft}
          onClick={() => handleGoBack()}
        />
      </View>
      <Text style={styles.titleText}>Recent Matches</Text>
      <ImageBackground style={styles.liveVideo} imageStyle={styles.flexContainer} resizeMode="cover" source={dotaBackground} />
      <View style={styles.bottomContainer}>
        <View
          style={styles.headerContainer}
        >
          <Text style={styles.itemHeader}>
            HERO
          </Text>
          <Text style={[styles.itemHeader, styles.itemDescription]}>
            K/D/A
          </Text>
        </View>
        <FlatList
          style={styles.flexContainer}
          contentContainerStyle={styles.scrollIntent}
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.host}-${index}`}
        />
      </View>
    </SafeAreaView>
  );
};

AccountScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default AccountScreen;
