import React, { useRef, useEffect, useState } from 'react';
import { HiArrowsPointingOut, HiPlus } from 'react-icons/hi2';
import {
  SideSheet,
  useSideSheet,
  SideElementProps,
} from 'react-side-sheet-pro';

type User = { id: number; name: string; email: string };
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// Side 1: User List

type UserListProps = SideElementProps;
export const UserList: React.FC<UserListProps> = ({
  open,
  sideId,
  close,
  update,
}) => (
  <>
    <SideSheet.Header
      title={`User List`}
      onClose={() => close(sideId)}
      actions={
        <>
          <button
            className="sidesheet-header-btn"
            onClick={() => {
              update(sideId, { width: window.innerWidth });
            }}
          >
            <HiArrowsPointingOut />
          </button>

          <button
            className="sidesheet-header-btn"
            onClick={() => {
              open(props => <EditUser {...props} user={{}} />, {
                width: 500,
              });
            }}
          >
            <HiPlus color="#1d4ed8" />
          </button>
        </>
      }
    />
    <SideSheet.Content className="sheet-white">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <a
                  onClick={() =>
                    open(props => <EditUser user={u} {...props} />, {
                      width: 500,
                    })
                  }
                >
                  Edit
                </a>
                <a
                  style={{ marginLeft: 12 }}
                  onClick={() =>
                    open(props => <UserDetails user={u} {...props} />, {
                      width: 400,
                    })
                  }
                >
                  Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SideSheet.Content>
    <SideSheet.Footer>
      <div>{users.length} users</div>
      <button className="btn btn-outline" onClick={() => close(null)}>
        Close All
      </button>
    </SideSheet.Footer>
  </>
);

// Side 2: Edit User

type EditUserProps = SideElementProps & {
  user: Partial<User>;
};
export const EditUser: React.FC<EditUserProps> = ({
  user,
  sideId,
  close,
  update,
  options,
}) => {
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleChange = () => {
      update(sideId, {
        confirmBeforeClose: true,
        confirmMessage: 'You have unsaved changes. Are you sure?',
      });
    };

    const current = formRef.current;
    current?.addEventListener('change', handleChange);

    return () => {
      current?.removeEventListener('change', handleChange);
    };
  }, [formRef, sideId, update]);

  const handleSave = () => {
    update(sideId, { confirmBeforeClose: false });
    setTimeout(() => {
      close(sideId);
    }, 100);
  };

  return (
    <>
      <SideSheet.Header
        title={user.id ? `Edit ${user.name}` : 'New User'}
        onClose={() => close(sideId)}
        actions={
          <button
            className="btn"
            disabled={!options.confirmBeforeClose}
            onClick={handleSave}
          >
            {user.id ? 'Edit' : 'Create'}
          </button>
        }
      />
      <SideSheet.Content className="sidesheet-padding sidesheet-centered">
        <div className="sidesheet-card">
          <form ref={formRef}>
            <h2>User Details</h2>
            <label>Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <label>Email</label>
            <input
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </form>
        </div>
      </SideSheet.Content>
    </>
  );
};

// Side 3: User Details

type UserDetailsProps = SideElementProps & {
  user: User;
};
export const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  sideId,
  close,
}) => {
  const { open } = useSideSheet();

  return (
    <>
      <SideSheet.Header
        title={`${user.name} Details (${sideId})`}
        onClose={() => close(sideId)}
      />
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
          <div>
            <button
              className="btn"
              onClick={() =>
                open(props => <UserList {...props} />, {
                  width: 600,
                })
              }
            >
              Open User List
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: 12 }}
              onClick={() => close(sideId)}
            >
              Close
            </button>
          </div>
        </div>
      </SideSheet.Content>
    </>
  );
};

// -------- Usage --------

const App: React.FC = () => {
  const { open } = useSideSheet();
  return (
    <div style={{ padding: 16 }}>
      <button
        onClick={() =>
          open(props => <UserList {...props} />, {
            width: 600,
          })
        }
      >
        Open User Manager
      </button>
    </div>
  );
};

export default App;
