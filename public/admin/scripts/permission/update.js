const tablePermission = document.getElementById('table-permission');

// Update Permission
if (tablePermission) {
  const buttonSubmit = document.getElementById('button-submit');

  if (buttonSubmit) {
    buttonSubmit.addEventListener('click', () => {
      let permissionList = [];
      const formChangePermission = document.getElementById('form-change-permission');
      const tableRowList = tablePermission.querySelectorAll('tr[data-name]');

      console.log(formChangePermission);

      if (tableRowList.length > 0) {
        tableRowList.forEach((row) => {
          const roleName = row.getAttribute('data-name');
          const inputRoleNameList = row.querySelectorAll('input');

          if (roleName === 'id' && inputRoleNameList.length > 0) {
            inputRoleNameList.forEach((inputRoleId) => {
              const id = inputRoleId.value;
              permissionList.push({ id, permissions: [] });
            });
            // console.log(permissionList);
          } else {
            inputRoleNameList.forEach((inputRoleName, idx) => {
              const inputRoleNameChecked = inputRoleName.checked;

              if (inputRoleNameChecked) {
                permissionList[idx].permissions.push(roleName);
                // console.log(permissionList);
              }
            });
          }
        });
      }

      // console.log(permissionList);
      if (permissionList.length > 0) {
        const inputPermission = formChangePermission.querySelector("input[name='permission']");
        inputPermission.value = JSON.stringify(permissionList);
        formChangePermission.submit();
      }
    });
  }
}
// End Update Permission

// Display Permission
const roleData = document.querySelector('div[data-role]');

if (roleData) {
  const rolelist = JSON.parse(roleData.getAttribute('data-role'));

  if (rolelist.length > 0) {
    rolelist.forEach((role, idx) => {
      if (role) {
        const permissionNameList = role.permission;

        permissionNameList.forEach((permission) => {
          const rows = tablePermission.querySelector(`[data-name='${permission}']`);
          console.log(rows);

          const inputCheck = rows.querySelectorAll('input')[idx];

          inputCheck.checked = true;
        });
      }
    });
  }
}
// End Display Permission
