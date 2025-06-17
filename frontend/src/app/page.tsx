// frontend/src/app/page.tsx
'use client'; // 클라이언트 컴포넌트로 만듦

import { useState, useEffect } from 'react';

// User 타입 정의
interface User {
  id: number;
  email: string;
  name: string | null;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // 사용자 목록을 가져오는 함수
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/users'); // 백엔드 API 호출
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 컴포넌트가 마운트될 때 사용자 목록을 불러옴
  useEffect(() => {
    fetchUsers();
  }, []);

  // 사용자 추가 핸들러
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        fetchUsers(); // 사용자 추가 후 목록 새로고침
        setEmail('');
        setName('');
      }
    } catch (error) {
      console.error('Failed to add user', error);
    }
  };

  return (
      <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold mb-8 text-center">User Management</h1>

          <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={handleAddUser} className="flex flex-col gap-4">
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 rounded bg-gray-700 border border-gray-600"
              />
              <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 rounded bg-gray-700 border border-gray-600"
              />
              <button
                  type="submit"
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Add User
              </button>
            </form>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">User List</h2>
            <ul className="space-y-2">
              {users.length > 0 ? (
                  users.map((user) => (
                      <li key={user.id} className="p-4 bg-gray-700 rounded-md">
                        <p className="font-bold">ID: {user.id}</p>
                        <p>Email: {user.email}</p>
                        <p>Name: {user.name || 'N/A'}</p>
                      </li>
                  ))
              ) : (
                  <p>No users found.</p>
              )}
            </ul>
          </div>
        </div>
      </main>
  );
}