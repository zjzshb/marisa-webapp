// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getTeammateNameDisplaySetting} from 'panguaxe-redux/selectors/entities/preferences';
import {getCurrentUserId, getUsersByUsername} from 'panguaxe-redux/selectors/entities/users';

import AtMention from './at_mention.jsx';

function mapStateToProps(state) {
    return {
        currentUserId: getCurrentUserId(state),
        teammateNameDisplay: getTeammateNameDisplaySetting(state),
        usersByUsername: getUsersByUsername(state),
    };
}

export default connect(mapStateToProps)(AtMention);
