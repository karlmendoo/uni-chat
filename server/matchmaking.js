export function createMatchmaker(io) {
  const users = new Map(); // socketId -> { username, university, searching, peer }
  const queue = new Map(); // filter -> array of socketIds

  function registerUser(socketId, userData) {
    users.set(socketId, {
      username: userData.username,
      university: userData.university,
      searching: false,
      peer: null,
    });
  }

  function findMatch(socketId, filter) {
    const user = users.get(socketId);
    if (!user) return;

    user.searching = true;

    // Determine queue key based on filter
    let queueKey = 'any';
    if (filter === 'same') {
      queueKey = `uni:${user.university}`;
    }

    // Get or create queue for this filter
    if (!queue.has(queueKey)) {
      queue.set(queueKey, []);
    }

    const waitingUsers = queue.get(queueKey);

    // Find a waiting user (excluding self)
    const matchIndex = waitingUsers.findIndex(id => id !== socketId && users.has(id));

    if (matchIndex !== -1) {
      // Found a match
      const peerId = waitingUsers[matchIndex];
      const peer = users.get(peerId);

      // Remove peer from queue
      waitingUsers.splice(matchIndex, 1);

      // Update both users
      user.peer = peerId;
      user.searching = false;
      peer.peer = socketId;
      peer.searching = false;

      // Notify both users
      io.to(socketId).emit('match-found', {
        peer: {
          username: peer.username,
          university: peer.university,
        },
        isInitiator: true,
      });

      io.to(peerId).emit('match-found', {
        peer: {
          username: user.username,
          university: user.university,
        },
        isInitiator: false,
      });

      console.log(`Match made: ${socketId} <-> ${peerId}`);
    } else {
      // No match found, add to queue
      waitingUsers.push(socketId);
      console.log(`User ${socketId} added to queue: ${queueKey}`);
    }
  }

  function getPeer(socketId) {
    const user = users.get(socketId);
    return user?.peer || null;
  }

  function disconnect(socketId) {
    const user = users.get(socketId);
    if (!user) return;

    // Remove from all queues
    for (const [key, waitingUsers] of queue.entries()) {
      const index = waitingUsers.indexOf(socketId);
      if (index !== -1) {
        waitingUsers.splice(index, 1);
        console.log(`User ${socketId} removed from queue: ${key}`);
      }
    }

    // Disconnect peer if exists
    if (user.peer) {
      const peer = users.get(user.peer);
      if (peer) {
        peer.peer = null;
        peer.searching = false;
      }
    }

    // Remove user
    users.delete(socketId);
    console.log(`User ${socketId} removed from matchmaker`);
  }

  return {
    registerUser,
    findMatch,
    getPeer,
    disconnect,
  };
}
