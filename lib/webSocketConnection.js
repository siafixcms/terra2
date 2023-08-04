import io from 'socket.io-client';

const socket = io('http://0.0.0.0', { path: '/socket/' });

export default socket;