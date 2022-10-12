import * as angular from 'angular';

import { InviteMemberFormComponent } from './invite-member-form.component';
import { RoleDropdownComponent } from './role-dropdown.component';
import { ShareWithOthersComponent } from './share-with-others.component';
import { UserManagementComponent } from './user-management.component';

export const ShareWithOthersModule = angular
  .module('shareWithOthersModule', ['ui.bootstrap'])
  .component('shareWithOthersModal', ShareWithOthersComponent)
  .component('userManagement', UserManagementComponent)
  .component('roleDropdown', RoleDropdownComponent)
  .component('inviteMemberForm', InviteMemberFormComponent).name;
