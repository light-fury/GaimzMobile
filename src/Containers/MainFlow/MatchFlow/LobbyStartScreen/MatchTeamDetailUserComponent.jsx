// @flow
import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  get,
} from 'lodash';
import FastImage from 'react-native-fast-image';

import styles from './LobbyStartScreen.style';

const tempTeam = [{ userId: '1' }, { userId: '2' }, { userId: '3' }, { userId: '4' }, { userId: '5' }];
const tempItems = ['', '', '', '', '', ''];

const MatchTeamDetailUserComponent = ({ selectedTeam, match }) => {
  let teamMembers = [];
  if (get(match, 'match.stats.teams')) {
    teamMembers = get(match, 'match.stats.teams').find((item) => item.name === (selectedTeam ? 'Dire' : 'Radiant'));
  }
  return (
    <View>
      <Text style={[styles.profileText, styles.matchProgressText, styles.alignLeft]}>
        {selectedTeam ? 'DIRE' : 'RADIANT'}
      </Text>
      <View style={styles.teamDetailHeader}>
        <View style={[styles.itemContainer, styles.flex3]}>
          <Text style={styles.teamDetailHeaderText}>HERO</Text>
        </View>
        <View style={[styles.itemContainer, styles.flex2]}>
          <Text style={styles.teamDetailHeaderText}>K/D/A</Text>
        </View>
        <View style={[styles.itemContainer, styles.flex2]}>
          <Text style={styles.teamDetailHeaderText}>GPM</Text>
        </View>
        <View style={[styles.itemContainer, styles.flex2]}>
          <Text style={styles.teamDetailHeaderText}>LH</Text>
        </View>
        <View style={[styles.itemContainer, styles.flex3]}>
          <Text style={styles.teamDetailHeaderText}>ITEMS</Text>
        </View>
      </View>
      {(((teamMembers && teamMembers.players) ? teamMembers.players : tempTeam) || tempTeam)
        .slice(0, 5).map((member) => {
          const memberItems = get(member, 'items') || tempItems;
          return (
            <View key={member.userId} style={[styles.userInnerContainer, styles.mb12]}>
              <View style={[styles.itemContainer, styles.flex3]}>
                <FastImage
                  style={styles.heroImage}
                  source={{ uri: get(member, 'userAvatarUrl') }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={[styles.itemContainer, styles.flex2]}>
                <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                  0 / 0 / 0
                </Text>
              </View>
              <View style={[styles.itemContainer, styles.flex2]}>
                <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                  000
                </Text>
              </View>
              <View style={[styles.itemContainer, styles.flex2]}>
                <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                  0 / 0
                </Text>
              </View>
              <View style={[styles.itemContainer, styles.flex3]}>
                <View style={[styles.rowContainer, styles.mb4]}>
                  {memberItems.slice(0,
                    (memberItems.length > 3 ? 3 : memberItems.length)).map((subItem, index) => (
                      <View
                        key={`dire ${subItem}${index + 1}`}
                        style={styles.heroItemImageContainer}
                      >
                        {subItem.length > 0 && (
                        <FastImage
                          style={styles.heroItemImage}
                          source={{ uri: subItem || '' }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        )}
                      </View>
                  ))}
                </View>
                <View style={styles.rowContainer}>
                  {memberItems.length > 3 && memberItems.slice(3).map((subItem, index) => (
                    <View
                      key={`dire ${subItem}${index + 4}`}
                      style={styles.heroItemImageContainer}
                    >
                      {subItem.length > 0 && (
                      <FastImage
                        style={styles.heroItemImage}
                        source={{ uri: subItem || '' }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};

MatchTeamDetailUserComponent.propTypes = {
  selectedTeam: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
};

export default MatchTeamDetailUserComponent;
