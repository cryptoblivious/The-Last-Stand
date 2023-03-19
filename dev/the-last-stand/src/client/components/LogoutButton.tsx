import Button from './Button';

const LogoutButton = () => {
  const logout = () => {
    const formData = new FormData();

    fetch('/logout', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <Button
      onClick={logout}
      text='Sign out'
    />
  );
};

export default LogoutButton;
