// @flow
import React, { useCallback } from 'react';
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

const MatchTeamDetailUserComponent = ({ teamMember, selectedTeam, radiantWon }) => {
  const getBorderColor = useCallback(() => {
    if ((radiantWon === 2 && selectedTeam === true)
      || (radiantWon === 1 && selectedTeam === false)) {
      return styles.wonBorderStyle;
    } if ((radiantWon === 2 && selectedTeam === false)
      || (radiantWon === 1 && selectedTeam === true)) {
      return styles.defeatBorderStyle;
    }
    return styles.clearBorderStyle;
  }, [selectedTeam, radiantWon]);

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
      {(teamMember || tempTeam).slice(0, 5).map((member) => {
        const memberItems = get(member, 'items') || tempItems;
        return (
          <View
            key={member.heroName}
            style={[styles.userInnerContainer, styles.mb12, getBorderColor()]}
          >
            <View style={[styles.itemContainer, styles.flex3]}>
              <FastImage
                style={styles.heroImage}
                source={{ uri: get(member, 'heroAvatarUrl') }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={[styles.itemContainer, styles.flex2]}>
              <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                {`${get(member, 'kills')} / ${get(member, 'deaths')} / ${get(member, 'assists')}`}
              </Text>
            </View>
            <View style={[styles.itemContainer, styles.flex2]}>
              <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                {`${get(member, 'gpm')}`}
              </Text>
            </View>
            <View style={[styles.itemContainer, styles.flex2]}>
              <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                {`${get(member, 'lasthits')}`}
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
  teamMember: PropTypes.arrayOf().isRequired,
  selectedTeam: PropTypes.bool.isRequired,
  radiantWon: PropTypes.bool.isRequired,
};

export default MatchTeamDetailUserComponent;
