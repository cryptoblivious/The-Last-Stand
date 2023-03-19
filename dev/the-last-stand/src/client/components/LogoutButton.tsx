import Button from './Button';

const LogoutButton = () => {
  const logout = () => {
    fetch('/logout', {
      method: 'POST',
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
