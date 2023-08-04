import io from 'socket.io-client';

const socket = io('http://terra-balance.lv', { path: '/socket/' });

export default socket;