# react-side-sheet-pro

A flexible React SideSheet component for displaying contextual information.

This panel can slide in from either the left or right side of the screen and is typically triggered by user actions like clicking a row in a table. It supports nested sheets, easy state management, and customizable layouts for a seamless and intuitive user experiences.

## 👀 Live Preview

- [Codepen](https://codepen.io/richard-dobro/pen/LEEBGya)

## 💡 Use cases
- Viewing a user's profile or related details
- Displaying transaction information (e.g., syncs or automation runs)
- Accessing settings or configurations that don’t require a direct URL
- Editing or creating records in a form without navigating away from the main view

## ℹ️ Compatibility

React 0.14.0 - 18.x.x


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

export default () => (
    <SideSheet.Provider>
        <App />
    </SideSheet.Provider>
)
```

## 🧪 Testing

```bash
cd playground/ && npm start
```

## 🌟 Contributing

We welcome contributions! If you'd like to help improve this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
