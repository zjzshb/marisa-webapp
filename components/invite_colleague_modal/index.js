// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentUserId} from 'panguaxe-redux/selectors/entities/users';
import {getCurrentTeamId} from 'panguaxe-redux/selectors/entities/teams';
import {removeUserFromTeam as leaveTeam} from 'panguaxe-redux/actions/teams';
import {inviteColleague} from 'panguaxe-redux/actions/invites';

import {toggleSideBarRightMenuAction} from 'actions/global_actions.jsx';
import {ModalIdentifiers} from 'utils/constants';

import {isModalOpen} from 'selectors/views/modals';

import InviteColleagueModal from './invite_colleague_modal.jsx';

function mapStateToProps(state) {
    const modalId = ModalIdentifiers.INVITE_COLLEAGUE;
    const currentUserId = getCurrentUserId(state);
    const currentTeamId = getCurrentTeamId(state);
    const show = isModalOpen(state, modalId);
    return {
        currentUserId,
        currentTeamId,
        show,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            leaveTeam,
            toggleSideBarRightMenu: toggleSideBarRightMenuAction,
            inviteColleague,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteColleagueModal);
