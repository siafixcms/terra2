<script>
    import {onMount} from 'svelte';
    import InfiniteTable from './InfiniteTable.svelte';
    import RolesAssigned from './permissionComponents/rolesAssigned.svelte';
// Import necessary functions from API.js
import {
    rolesList,
    userRoles,
    userPermissions,
    setBaseUrl,
    // Add other API functions as needed
} from './API.js';
    import PermissionAssigned from './permissionComponents/permissionAssigned.svelte';

// Initialize base URL for API calls
setBaseUrl('users');

let selectedUser = null;
let roles = [];
let assignedRoles = [];
let permissions = [];

// Function to fetch user data and related information
async function fetchUserData(userId) {

    // Fetch assigned roles for the selected user
    assignedRoles = await userRoles(userId);
    console.log('assignedRoles', assignedRoles);

    // Fetch individual permissions for the selected user
    permissions = await userPermissions(userId);
    console.log('permissions', permissions);
}

// Function to handle user selection
async function selectUser(userId) {
    selectedUser = userId;
    await fetchUserData(userId);
}

onMount(async () => {
    roles = await rolesList();
    console.log('roles', roles);
});

async function handleClick(userId) {
    await selectUser(userId);
}

let userSelected = [{
    button: 'Select', 
    handler: handleClick,
}];

</script>

<div class="flex gap-8">
    <div class="w-1/2">
        <h2 class="text-2xl font-semibold text-gray-800 my-4">Users</h2>
        <InfiniteTable importbaseUrl={'users'} visibleFields={['login', 'name', 'surname']} buttonName={'user'} customAction={userSelected}/>       
    </div>
    <div class="w-1/4">
        <h2 class="text-2xl font-semibold text-gray-800 mt-4 mb-[4.7rem] ">ROLES ASSIGNED</h2>
        <RolesAssigned data={roles} />
    </div>
    <div class="w-1/4">
        <h2 class="text-2xl font-semibold text-gray-800 my-4">Permissions</h2>
        <PermissionAssigned data={permissions} />
    </div>
</div>