// @flow
import React, { useContext } from 'react';
import {
  Text, View, TouchableOpacity, FlatList, Linking, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import {
  arrowLeft,
  moreIcon,
  editIcon,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './HelpScreen.style';
import { UserContext } from '../../../../contexts';
import HeaderComponent from '../../../../Components/HeaderComponent';

const renderItem = ({ item, index }) => (
  <TouchableOpacity
    key={index}
    style={styles.itemContainer}
    onPress={() => item.onPress(item.url)}
  >
    <View style={styles.flexContainer}>
      <Text style={styles.headerNameText}>
        {item.title}
      </Text>
      <Text style={styles.itemDescriptionText}>
        {item.description}
      </Text>
    </View>
    <SocialButton
      style={styles.itemButton}
      iconStyle={styles.itemIcon}
      icon={editIcon}
      clickOpacity={2}
    />
  </TouchableOpacity>
);

const HelpScreen = ({ navigation }) => {
  const [user] = useContext(UserContext);

  const handleUrl = async (url) => {
    try {
      if (url === 'contactus') {
        navigation.navigate('ContactScreen');
      } else {
        const canOpen = Linking.canOpenURL(url);
        if (canOpen) {
          Linking.openURL(url);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const listData = [
    {
      onPress: handleUrl,
      title: 'FAQ',
      description: 'Have questions? Check here.',
      url: 'https://drive.google.com/open?id=1NSO04ynjJv8S5dVFwoBoNFClLoUQSsfIrUC8ddQAEZ8',
    },
    {
      onPress: handleUrl,
      title: 'Terms of Service',
      description: 'MM/DD/YY',
      url: 'https://drive.google.com/open?id=1NSO04ynjJv8S5dVFwoBoNFClLoUQSsfIrUC8ddQAEZ8',
    },
    {
      onPress: handleUrl,
      title: 'Privacy Policy',
      description: 'MM/DD/YY',
      url: 'https://drive.google.com/open?id=1E5ZmIWhSxNStsjDNLv9ZRQ---Z-b8yL5ZmR4UTlCzyM',
    },
    {
      onPress: handleUrl,
      title: 'Contact Us',
      description: 'Discord, Facebook, Twitch, Email',
      url: 'contactus',
    },
  ];

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <HeaderComponent
        rightIcon={moreIcon}
        rightStyle={styles.rightButton}
        rightIconStyle={styles.headerRightIcon}
        rightClick={() => navigation.goBack()}
        leftIcon={arrowLeft}
        leftClick={() => navigation.goBack()}
        leftIconStyle={styles.headerLeftIcon}
      >
        <View style={styles.headerContainer}>
          <ImageBackground source={{ uri: `${user.userAvatarUrl}?${new Date()}` || '' }} style={styles.avatarImage} imageStyle={styles.flexContainer}>
            <View style={styles.onlineStatus} />
          </ImageBackground>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerNameText}>{user.userName}</Text>
            <Text style={[styles.headerNameText, styles.grayText]}>Online</Text>
          </View>
        </View>
      </HeaderComponent>
      <FlatList
        style={styles.flexContainer}
        contentContainerStyle={styles.scrollIntent}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.host}-${index}`}
      />
    </SafeAreaView>
  );
};

HelpScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
};

export default HelpScreen;
