# Simple Flag

A javascript flag system based on bitwise function. The system use a enumerator in base 2 (1, 2, 4, 8...) to check if a value provided has the flag set.

## Installation
To install with npm or yarn, use the following command:

### Yarn
```bash
yarn add simple-flag
```

### NPM
```bash
npm install simple-flag
```

## Usage

```jsx
const SimpleFlag = require('simple-flag');

const userPermissionEnum = {
  addUser: 1,
  removeUser: 2,
  updateUser: 4,
  viewUsers: 8,
};

const permissionValue = 13; // Data that can come from Database

const userPermission = new SimpleFlag(userPermissionEnum, permissionValue);

// User have the permission to add User
if(userPermission.hasFlag(userEnum.addUser)) { // true
  // Can add a user
}

// User do not have the permission to Remove User
if(userPermission.hasFlag(userEnum.removeUser)) { // false
  // Can Remove a user
}

// User have the permission to Update User
if(userPermission.hasFlag(userEnum.updateUser)) { // true
  // Can update a user
}

// User have the permission to View Users
if(userPermission.hasFlag('viewUsers')) { // true
  // Can view all users
}
```

### Methods
`hasFlag*` - Check if the flag has been set.

`hasAllFlags**` - Check if all flags provided (array) has been set.

`hasAnyFlag**` - Check if any of the flags provided (array) has been set.

*: Accepts a flag as variable which can be a number (enum.property) or the name of the property.

**: Accepts an array of flags as variable which can be a number (enum.property) or a string (name of the property).

### Options

The constructor accept a third variable which is an object.
The object accepts the following properties:
- `validateEnum`: True by default. Simple-flag will validate everything inside the enumerator defined in the constructor. If you know what you are doing and don't need any validation, just set to `false`.

## Comming soon..
- AddFlag() - Ability to add a property and value to the flag enumerator.
- RemoveFlag() - Ability to remove a property and value to the flag enumerator.
- updateFlag() - Ability to update a value to a specific property in the flag enumerator.

## Licence

### MIT
