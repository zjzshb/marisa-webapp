// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {savePreferences} from 'panguaxe-redux/actions/preferences';
import {getSupportedTimezones} from 'panguaxe-redux/actions/general';
import {autoUpdateTimezone} from 'panguaxe-redux/actions/timezone';
import {getConfig, getSupportedTimezones as getTimezones} from 'panguaxe-redux/selectors/entities/general';
import {getCurrentUserId} from 'panguaxe-redux/selectors/entities/users';
import {get} from 'panguaxe-redux/selectors/entities/preferences';
import {getUserTimezone} from 'panguaxe-redux/selectors/entities/timezone';
import {getUserCurrentTimezone} from 'panguaxe-redux/utils/timezone_utils';

import {Preferences} from 'utils/constants.jsx';

import UserSettingsDisplay from './user_settings_display.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const timezones = getTimezones(state);
    const currentUserId = getCurrentUserId(state);
    const userTimezone = getUserTimezone(state, currentUserId);
    const automaticTimezoneNotSet = userTimezone && userTimezone.useAutomaticTimezone && !userTimezone.automaticTimezone;
    const shouldAutoUpdateTimezone = !userTimezone || automaticTimezoneNotSet;

    const allowCustomThemes = config.AllowCustomThemes === 'true';
    const enableLinkPreviews = config.EnableLinkPreviews === 'true';
    const defaultClientLocale = config.DefaultClientLocale;
    const enableThemeSelection = config.EnableThemeSelection === 'true';
    const enableTimezone = config.ExperimentalTimezone === 'true';
    const configTeammateNameDisplay = config.TeammateNameDisplay;

    return {
        allowCustomThemes,
        configTeammateNameDisplay,
        enableLinkPreviews,
        defaultClientLocale,
        enableThemeSelection,
        enableTimezone,
        timezones,
        userTimezone,
        shouldAutoUpdateTimezone,
        currentUserTimezone: getUserCurrentTimezone(userTimezone),
        militaryTime: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.USE_MILITARY_TIME, Preferences.USE_MILITARY_TIME_DEFAULT),
        teammateNameDisplay: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.NAME_NAME_FORMAT, configTeammateNameDisplay),
        channelDisplayMode: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.CHANNEL_DISPLAY_MODE, Preferences.CHANNEL_DISPLAY_MODE_DEFAULT),
        messageDisplay: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.MESSAGE_DISPLAY, Preferences.MESSAGE_DISPLAY_DEFAULT),
        collapseDisplay: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.COLLAPSE_DISPLAY, Preferences.COLLAPSE_DISPLAY_DEFAULT),
        linkPreviewDisplay: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.LINK_PREVIEW_DISPLAY, Preferences.LINK_PREVIEW_DISPLAY_DEFAULT),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getSupportedTimezones,
            autoUpdateTimezone,
            savePreferences,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsDisplay);
