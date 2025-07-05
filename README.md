# react-side-sheet-pro

A flexible React SideSheet component for displaying contextual information.

This panel can slide in from either the left or right side of the screen and is typically triggered by user actions like clicking a row in a table. It supports nested sheets, easy state management, and customizable layouts for a seamless and intuitive user experiences.

## 👀 Live Preview

[![Edit react-side-sheet-pro](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/9mxzqg)

## 💡 Use cases
- Viewing a user's profile or related details
- Displaying transaction information (e.g., syncs or automation runs)
- Accessing settings or configurations that don’t require a direct URL
- Editing or creating records in a form without navigating away from the main view

## ℹ️ Compatibility

React 0.14.0 - 19.x.x

## ✨ Key Features

- 🚀 **Easy Integration**: Get started with minimal setup.
- 📱 **Responsive Design**: Optimized for all screen sizes.
- 💪 **TypeScript Compatibility**: Fully typed for a seamless developer experience.
- 🔄 **Nested Sheets**: Support for opening multiple side sheets in a nested manner.
- 🎨 **Customizable**: Easily adjust width, styles, and behavior to fit your needs.
- 👌 **State Management Included**: Built-in hooks for managing the state of the side sheet.
- ⚡ **Lightweight and Fast**: Minimal dependencies for a quick and smooth user experience.
- 🧩 **Modular Components**: Use only the parts you need, like header, content, and footer.

## 📦 Installation

Install the widget via npm or yarn:

```shell
npm install react-side-sheet-pro
# or
yarn add react-side-sheet-pro
```

## ⚡️ Quick Start
```typescript jsx
import React from 'react'
import { SideSheet, useSideSheet, SideElementProps } from 'react-side-sheet-pro'
import 'react-side-sheet-pro/dist/index.css'

const UserDetails: React.FC<SideElementProps & { user: any }> = ({
    user,
    sideId,
    close,
}) => (
    <>
        <SideSheet.Header title={user.name} onClose={() => close(sideId)} />
        <SideSheet.Content className="sidesheet-padding sidesheet-centered">
            <div className="sidesheet-card">
                <p>
                    <strong>ID:</strong> {user.id}
                </p>
                <p>
                    <strong>Name:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
            </div>
        </SideSheet.Content>
    </>
)

export const App = () => {
    const { open } = useSideSheet()

    const handleOpenSideSheet = () => {
        open(
            (props) => (
                <UserDetails
                    {...props}
                    user={{
                        id: 1,
                        name: 'John Doe',
                        email: 'john@doe.com',
                    }}
                />
            ),
            {
                width: 600,
            }
        )
    }

    return (
        <button onClick={handleOpenSideSheet}>Open Side Sheet</button>
    )
}

// Wrap your app with the SideSheet.Provider to manage side sheets globally

export default () => (
    <SideSheet.Provider>
        <App />
    </SideSheet.Provider>
)
```

## 🧩 Compound Components

### `Sheet.Provider`

Sheet provider component that manages the state of all side sheets in your application. It should wrap your main application component.

### `Sheet.Header`

Sheet header component that displays the title and can include custom actions. It also provides custom `onClick` function for a button to close the sheet.

#### Header props

| Name        | Required | Default   | Description                              |
|-------------|----------|-----------|------------------------------------------|
| `title`     | yes      |           | Title of the header.                     |
| `onClose`   | no       | undefined | Callback function to close the sheet.    |
| `actions`   | no       | undefined | Custom actions to render in the header.  |
| `className` | no       | undefined | Custom CSS class for additional styling. |

### `Sheet.Content`

Sheet content component that wraps the main content of the side sheet. Can be styled using custom classes.

#### Content props

| Name        | Required | Default   | Description                               |
|-------------|----------|-----------|-------------------------------------------|
| `children`  | yes      |           | Content to display inside the side sheet. |
| `className` | no       | undefined | Custom CSS class for additional styling.  |

### `Sheet.Footer`

Sheet footer component that can be used to display actions or additional information at the bottom of the side sheet. Can be styled using custom classes.

#### Footer props

| Name        | Required | Default   | Description                              |
|-------------|----------|-----------|------------------------------------------|
| `children`  | yes      |           | Content to display inside the footer.    |
| `className` | no       | undefined | Custom CSS class for additional styling. |


## 🧪 Testing

```bash
cd playground/ && npm start
```

## 🌟 Contributing

We welcome contributions! If you'd like to help improve this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
