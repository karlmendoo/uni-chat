export function createMatchmaker(io) {
  const users = new Map(); // socketId -> { username, university, searching, peer, timestamp }
  const queue = new Map(); // filter -> array of socketIds

  function registerUser(socketId, userData) {
    users.set(socketId, {
      username: userData.username,
      university: userData.university,
      searching: false,
      peer: null,
      timestamp: Date.now(),
    });
  }

  // Helper function to shuffle array for randomization
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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

    // Filter out invalid users and self
    const validWaitingUsers = waitingUsers.filter(id => id !== socketId && users.has(id));

    if (validWaitingUsers.length > 0) {
      // Randomize the selection to improve match variety
      const shuffledUsers = shuffleArray(validWaitingUsers);
      const peerId = shuffledUsers[0];
      const peer = users.get(peerId);

      // Remove peer from queue
      const peerIndex = waitingUsers.indexOf(peerId);
      if (peerIndex !== -1) {
        waitingUsers.splice(peerIndex, 1);
      }

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

      console.log(`Match made: ${socketId} <-> ${peerId} (${queueKey})`);
    } else {
      // No match found, add to queue
      // First try same university if on 'any' filter
      if (filter === 'any') {
        const sameUniQueue = `uni:${user.university}`;
        if (!queue.has(sameUniQueue)) {
          queue.set(sameUniQueue, []);
        }
        const sameUniUsers = queue.get(sameUniQueue).filter(id => id !== socketId && users.has(id));
        
        if (sameUniUsers.length > 0) {
          // Found same university match, use it
          const shuffledSameUni = shuffleArray(sameUniUsers);
          const peerId = shuffledSameUni[0];
          const peer = users.get(peerId);

          // Remove from same uni queue
          const sameUniQueueArray = queue.get(sameUniQueue);
          const peerIndex = sameUniQueueArray.indexOf(peerId);
          if (peerIndex !== -1) {
            sameUniQueueArray.splice(peerIndex, 1);
          }

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

          console.log(`Match made (prioritized same uni): ${socketId} <-> ${peerId}`);
          return;
        }
      }
      
      // No match found, add to queue
      if (!waitingUsers.includes(socketId)) {
        waitingUsers.push(socketId);
      }
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
