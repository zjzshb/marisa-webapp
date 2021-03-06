// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {loadRolesIfNeeded, editRole} from 'panguaxe-redux/actions/roles';

import {getRoles} from 'panguaxe-redux/selectors/entities/roles';
import {getScheme, makeGetSchemeTeams} from 'panguaxe-redux/selectors/entities/schemes';

import {getScheme as loadScheme, patchScheme, createScheme, getSchemeTeams as loadSchemeTeams} from 'panguaxe-redux/actions/schemes';

import {updateTeamScheme} from 'panguaxe-redux/actions/teams';

import {setNavigationBlocked} from 'actions/admin_actions.jsx';

import PermissionTeamSchemeSettings from './permission_team_scheme_settings.jsx';

function makeMapStateToProps() {
    const getSchemeTeams = makeGetSchemeTeams();

    return (state, ownProps) => {
        const schemeId = ownProps.match.params.scheme_id;
        return {
            schemeId,
            scheme: schemeId ? getScheme(state, schemeId) : null,
            teams: schemeId ? getSchemeTeams(state, {schemeId}) : null,
            roles: getRoles(state),
            rolesRequest: state.requests.roles.getRolesByNames,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadRolesIfNeeded,
            loadScheme,
            loadSchemeTeams,
            editRole,
            patchScheme,
            updateTeamScheme,
            createScheme,
            setNavigationBlocked,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(PermissionTeamSchemeSettings);
