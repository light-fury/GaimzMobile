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

const MatchTeamDetailComponent = ({ teamMember }) => (
  <View>
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
    {teamMember.map((member) => {
      const memberItems = get(member, 'items') || [];
      return (
        <View key={member.userId} style={styles.memberContainer}>
          <View style={[styles.itemContainer, styles.flex3]}>
            <Image
              style={styles.memberHeroImage}
              source={{ uri: get(member, 'heroAvatarUrl') || '' }}
              defaultSource={heroTemplate}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.itemContainer, styles.flex2]}>
            <Text style={styles.memberDetailText}>
              {`${get(member, 'kills')} / ${get(member, 'deaths')} / ${get(member, 'assists')}`}
            </Text>
          </View>
          <View style={[styles.itemContainer, styles.flex2]}>
            <Text style={styles.memberDetailText}>
              {`${get(member, 'gpm')}`}
            </Text>
          </View>
          <View style={[styles.itemContainer, styles.flex2]}>
            <Text style={styles.memberDetailText}>
              {`${get(member, 'lasthits')}`}
            </Text>
          </View>
          <View style={[styles.itemContainer, styles.flex3]}>
            <View style={[styles.rowContainer, styles.mb4]}>
              {memberItems.length >= 3 && memberItems.slice(0, 3).map((subItem) => (
                <Image
                  key={`dire ${subItem}`}
                  style={styles.memberItemImage}
                  source={{ uri: subItem || '' }}
                  resizeMode="cover"
                />
              ))}
            </View>
            <View style={styles.rowContainer}>
              {memberItems.length >= 6 && memberItems.slice(3, 6).map((subItem) => (
                <Image
                  key={`dire ${subItem}`}
                  style={styles.memberItemImage}
                  source={{ uri: subItem || '' }}
                  resizeMode="cover"
                />
              ))}
            </View>
          </View>
        </View>
      );
    })}
  </View>
);

MatchTeamDetailComponent.propTypes = {
  teamMember: PropTypes.shape().isRequired,
};

export default MatchTeamDetailComponent;
