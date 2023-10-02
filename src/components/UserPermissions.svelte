<script>
// Import necessary functions from API.js
import {
    rolesList,
    userRoles,
    userPermissions,
    setBaseUrl,
    // Add other API functions as needed
} from './API.js';

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

onMount(() => {
    // Fetch general roles
    roles = await rolesList(); // Adjust the endpoint as per your API
    users = await fetchData('users', { query }); // Adjust the endpoint and filters
});
</script>

<!-- User List -->
<div class="user-list">
<input
    type="text"
    placeholder="Search users..."
    on:input={(e) => searchUsers(e.target.value)}
/>
<ul>
    {#each users as user (user.id)}
    <li
        class="{selectedUser === user.id ? 'selected' : ''}"
        on:click={() => selectUser(user.id)}
    >
        {user.name}
    </li>
    {/each}
</ul>
</div>

<!-- Role List -->
<div class="role-list">
<h2>Available Roles</h2>
<ul>
    {#each roles as role (role.id)}
    <li>{role.name}</li>
    {/each}
</ul>
</div>

<!-- Assigned Roles -->
<div class="assigned-roles">
<h2>Assigned Roles</h2>
<ul>
    {#each assignedRoles as assignedRole (assignedRole.id)}
    <li>{assignedRole.name}</li>
    {/each}
</ul>
</div>

<!-- Permissions -->
<div class="permissions">
<h2>Permissions</h2>
{#each permissions as permission (permission.id)}
    <!-- Accordion for each permission group -->
    <div class="accordion">
    <div class="accordion-header">
        {permission.groupName}
    </div>
    <div class="accordion-content">
        <ul>
        {#each permission.permissions as individualPermission (individualPermission.id)}
            <li>
            <label>
                <input type="checkbox" bind:checked={individualPermission.assigned} />
                {individualPermission.name}
            </label>
            </li>
        {/each}
        </ul>
    </div>
    </div>
{/each}
</div>

<style>
/* Add your CSS styles here for layout and styling */
</style>  