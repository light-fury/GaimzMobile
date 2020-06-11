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
  discordIcon,
  facebookIcon,
  twitterIcon,
  messageIcon,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './ContactScreen.style';
import { UserContext } from '../../../../contexts';
import HeaderComponent from '../../../../Components/HeaderComponent';

const renderItem = ({ item, index }) => (
  <TouchableOpacity
    key={index}
    style={styles.itemContainer}
    onPress={() => item.onPress(item.url)}
  >
    <SocialButton
      style={styles.itemImage}
      iconStyle={styles.platformIcon}
      icon={item.img}
      clickOpacity={2}
    />
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

const ContactScreen = ({ navigation }) => {
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
      title: '@GaimzHQ',
      img: discordIcon,
      description: 'Discord',
      url: 'https://discord.gg/NNDJAmN',
    },
    {
      onPress: handleUrl,
      title: '@GaimzHQ',
      img: facebookIcon,
      description: 'Facebook',
      url: 'https://www.facebook.com/GaimzHQ',
    },
    {
      onPress: handleUrl,
      title: '@GaimzHQ',
      img: twitterIcon,
      description: 'Twitter',
      url: 'https://twitter.com/GaimzHQ',
    },
    {
      onPress: handleUrl,
      title: 'support@gaimz.com',
      img: messageIcon,
      description: 'Email',
      url: 'mailto:support@gaimz.com',
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

ContactScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
};

export default ContactScreen;
