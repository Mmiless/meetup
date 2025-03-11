export const fetchEventByHash = (eventHash) => {
    return new Promise((resolve, reject) => {
      if (!eventHash) {
        reject("No event hash provided");
        return;
      }
  
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/event/${eventHash}/`);
      
      socket.onopen = () => {
        socket.send(JSON.stringify({
          action: "get_event",
          hash: eventHash
        }));
      };
      
      socket.onmessage = (response) => {
        const data = JSON.parse(response.data);
        if (data.type === 'event_found') {
          // Store in localStorage and resolve with event data
          localStorage.setItem('eventDetails', JSON.stringify(data.event));
          resolve(data.event);
        } else {
          reject("Event not found");
        }
        socket.close();
      };
      
      socket.onerror = (error) => {
        reject("Connection error");
        socket.close();
      };
    });
};