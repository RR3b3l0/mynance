import axios from 'axios';

export const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:8000/users');
    const users = res.data;
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const fetchUser = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/users/${id}`);
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
