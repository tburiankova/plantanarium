import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import baseUrl from '../../utils/baseUrl';
import formatDate from '../../utils/formatDate';

function UserPermissions() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  }

  return (
    <>
      <table className="account__permissions">
        <thead>
          <tr>
            <th>Admin</th>
            <th data-th="User details">
              <span>Name</span>
            </th>
            <th>Email</th>
            <th>Joined</th>
            <th>Updated</th>
            <th>Role</th>
          </tr>
        </thead>

        {users.map((user) => (
          <UserPermission key={user._id} user={user} />
        ))}
      </table>
    </>
  );
}

export default UserPermissions;

function UserPermission({ user }) {
  const [admin, setAdmin] = useState(user.role === 'admin');
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    updatePermission();
  }, [admin]);

  function handleChangePermission() {
    setAdmin((prev) => !prev);
  }

  async function updatePermission() {
    const url = `${baseUrl}/api/account`;
    const payload = { _id: user._id, role: admin ? 'admin' : 'user' };
    await axios.put(url, payload);
  }

  return (
    <tbody key={user._id}>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={admin}
            onChange={handleChangePermission}
          />
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{formatDate(user.createdAt)}</td>
        <td>{formatDate(user.updatedAt)}</td>
        <td>{admin ? 'admin' : 'user'}</td>
      </tr>
    </tbody>
  );
}
