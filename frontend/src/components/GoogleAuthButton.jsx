import React from 'react';

function GoogleAuthButton() {
  const handleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: (response) => {
        fetch("http://localhost:8000/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential })
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      },
    });
    window.google.accounts.id.prompt();
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
}

export default GoogleAuthButton;
