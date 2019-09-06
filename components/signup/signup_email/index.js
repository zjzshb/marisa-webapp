// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendSMS, createUser} from 'panguaxe-redux/actions/users';
import {getConfig} from 'panguaxe-redux/selectors/entities/general';
import {getTeamInviteInfo} from 'panguaxe-redux/actions/teams';

import {setGlobalItem} from 'actions/storage';
import {loginById} from 'actions/views/login';
import {getPasswordConfig} from 'utils/utils.jsx';

import SignupEmail from './signup_email.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);

    const enableSignUpWithEmail = config.EnableSignUpWithEmail === 'true';
    const siteName = config.SiteName;
    const termsOfServiceLink = config.TermsOfServiceLink;
    const privacyPolicyLink = config.PrivacyPolicyLink;
    const customDescriptionText = config.CustomDescriptionText;

    return {
        enableSignUpWithEmail,
        siteName,
        termsOfServiceLink,
        privacyPolicyLink,
        customDescriptionText,
        passwordConfig: getPasswordConfig(config),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createUser,
            loginById,
            setGlobalItem,
            getTeamInviteInfo,
            sendSMS,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupEmail);
