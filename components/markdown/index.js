// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {Preferences} from 'panguaxe-redux/constants';
import {getChannelsNameMapInCurrentTeam} from 'panguaxe-redux/selectors/entities/channels';
import {getAutolinkedUrlSchemes, getConfig} from 'panguaxe-redux/selectors/entities/general';
import {getBool} from 'panguaxe-redux/selectors/entities/preferences';
import {getCurrentTeam} from 'panguaxe-redux/selectors/entities/teams';
import {getCurrentUserMentionKeys} from 'panguaxe-redux/selectors/entities/users';

import {getSiteURL} from 'utils/url.jsx';

import Markdown from './markdown';

function makeGetChannelNamesMap() {
    return createSelector(
        getChannelsNameMapInCurrentTeam,
        (state, props) => props && props.channelNamesMap,
        (channelNamesMap, channelMentions) => {
            if (channelMentions) {
                return Object.assign({}, channelMentions, channelNamesMap);
            }

            return channelNamesMap;
        }
    );
}

function makeMapStateToProps() {
    const getChannelNamesMap = makeGetChannelNamesMap();

    return function mapStateToProps(state, ownProps) {
        const config = getConfig(state);

        return {
            autolinkedUrlSchemes: getAutolinkedUrlSchemes(state),
            channelNamesMap: getChannelNamesMap(state, ownProps),
            enableFormatting: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'formatting', true),
            mentionKeys: getCurrentUserMentionKeys(state),
            siteURL: getSiteURL(),
            team: getCurrentTeam(state),
            hasImageProxy: config.HasImageProxy === 'true',
            minimumHashtagLength: parseInt(config.MinimumHashtagLength, 10),
        };
    };
}

export default connect(makeMapStateToProps)(Markdown);
