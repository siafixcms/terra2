import io from 'socket.io-client';

const socket = io('https://terra-balance.lv', { path: '/socket/' });

export default socket;