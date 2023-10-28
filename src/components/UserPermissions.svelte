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

let users = [];
let selectedUser = null;
let roles = [];
let assignedRoles = [];
let permissions = [];

// Function to fetch user data and related information
async function fetchUserData(userId) {

    // Fetch assigned roles for the selected user
    assignedRoles = await userRoles(userId); // Adjust the endpoint

    // Fetch individual permissions for the selected user
    permissions = await userPermissions(userId); // Adjust the endpoint
}

// Function to handle user selection
async function selectUser(userId) {
    selectedUser = userId;
    await fetchUserData(userId);
}

// Function to handle searching for users
async function searchUsers(query) {
    users = await fetchData('users', { query }); // Adjust the endpoint and filters
}

onMount(async () => {
    // Fetch general roles
    roles = await rolesList(); // Adjust the endpoint as per your API
    users = await fetchData('users', { query }); // Adjust the endpoint and filters
});

function handleCheckSelector(event) {
        console.log(event.detail.data_id);
    }

function handleClick(value) {
    alert(`Button ${value} clicked`);
}

let userSelected = [{
    button: 'select', 
    handler: handleClick,
  }];
let RolesAssignedData = [{id: 1, name: 'Admin', active:true}, {id: 2, name: 'User', active:true}, {id: 3, name: 'Guest', active:false}];
</script>

<div class="flex gap-8">
    <div class="w-1/2">
        <h2 class="text-2xl font-semibold text-gray-800 my-4">Users</h2>
        <InfiniteTable importbaseUrl={'users'} visibleFields={['login', 'name', 'surname']} buttonName={'user'} customAction={userSelected}/>       
    </div>
    <div class="w-1/4">
        <h2 class="text-2xl font-semibold text-gray-800 mt-4 mb-[4.7rem] ">ROLES ASSIGNED</h2>
        <RolesAssigned data={RolesAssignedData} />
    </div>
    <div class="w-1/4">
        <h2 class="text-2xl font-semibold text-gray-800 my-4">Permissions</h2>
        <PermissionAssigned/>
    </div>
</div>
<div class="w-1/2">
    permissions
</div>

<style>
/* Add your CSS styles here for layout and styling */
</style>  