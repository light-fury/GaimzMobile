// @flow
import React from 'react';
import {
  Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  get,
} from 'lodash';

import {
  heroTemplate,
} from '../../../../Assets';
import styles from './LobbyStartScreen.style';

const MatchOneDetailComponent = ({ teamMember }) => {
  const memberItems = get(teamMember, 'items') || [];
  return (
    <View style={styles.inProgressContainer}>
      <View style={styles.itemContainer}>
        <Text style={[styles.profileText, styles.matchProgressText]}>
          {get(teamMember, 'heroName')}
        </Text>
        {get(teamMember, 'heroAvatarUrl') && (
          <Image
            style={styles.heroImage}
            defaultSource={heroTemplate}
            source={{ uri: get(teamMember, 'heroAvatarUrl') }}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={[styles.itemContainer, styles.pt23]}>
        <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
          K / D / A
        </Text>
        <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
          {`${get(teamMember, 'kills')} / ${get(teamMember, 'deaths')} / ${get(teamMember, 'assists')}`}
        </Text>
      </View>
      <View style={[styles.itemContainer, styles.pt23]}>
        <View style={[styles.rowContainer, styles.mb4]}>
          {memberItems.slice(0,
            (memberItems.length > 3 ? 3 : memberItems.length)).map((subItem, index) => (
              <Image
                key={`dire ${subItem}${index + 1}`}
                style={styles.heroItemImage}
                source={{ uri: subItem || '' }}
                resizeMode="cover"
              />
          ))}
        </View>
        <View style={styles.rowContainer}>
          {memberItems.length > 3 && memberItems.slice(3).map((subItem, index) => (
            <Image
              key={`dire ${subItem}${index + 1}`}
              style={styles.heroItemImage}
              source={{ uri: subItem || '' }}
              resizeMode="cover"
            />
          ))}
        </View>
      </View>
    </View>
  );
};

MatchOneDetailComponent.propTypes = {
  teamMember: PropTypes.shape().isRequired,
};

export default MatchOneDetailComponent;
