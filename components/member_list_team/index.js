// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getTeamStats} from 'panguaxe-redux/actions/teams';
import {haveITeamPermission} from 'panguaxe-redux/selectors/entities/roles';
import {getMembersInCurrentTeam, getCurrentTeamStats} from 'panguaxe-redux/selectors/entities/teams';
import {getProfilesInCurrentTeam, searchProfilesInCurrentTeam} from 'panguaxe-redux/selectors/entities/users';
import {Permissions} from 'panguaxe-redux/constants';
import {searchProfiles} from 'panguaxe-redux/actions/users';

import {loadStatusesForProfilesList} from 'actions/status_actions.jsx';
import {loadProfilesAndTeamMembers, loadTeamMembersForProfilesList} from 'actions/user_actions.jsx';
import {setModalSearchTerm} from 'actions/views/search';

import MemberListTeam from './member_list_team.jsx';

function mapStateToProps(state, ownProps) {
    const canManageTeamMembers = haveITeamPermission(state, {team: ownProps.teamId, permission: Permissions.MANAGE_TEAM_ROLES});

    const searchTerm = state.views.search.modalSearch;

    let users;
    if (searchTerm) {
        users = searchProfilesInCurrentTeam(state, searchTerm);
    } else {
        users = getProfilesInCurrentTeam(state);
    }

    const stats = getCurrentTeamStats(state) || {active_member_count: 0};

    return {
        searchTerm,
        users,
        teamMembers: getMembersInCurrentTeam(state) || {},
        currentTeamId: state.entities.teams.currentTeamId,
        totalTeamMembers: stats.active_member_count,
        canManageTeamMembers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            searchProfiles,
            getTeamStats,
            loadProfilesAndTeamMembers,
            loadStatusesForProfilesList,
            loadTeamMembersForProfilesList,
            setModalSearchTerm,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListTeam);
