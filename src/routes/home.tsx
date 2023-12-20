//Libs
import { useState } from 'react';
import { UserProps } from '../types/user';
//Components
import Search from '../components/search';
import User from '../components/user';
import Error from '../components/error';

//Function Home
function Home() {
  // --------------------------- Generics <UserProps | null>
  const [user, setUser] = useState<UserProps | null>(null);
  //state de Error
  const [error, setError] = useState(false);

  const loadUser = async (userName: string) => {
    //zerando os dados para evitar erros
    setError(false);
    setUser(null);

    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();

    if (res.status === 404) {
      setError(true);
      return;
    }

    const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };
    setUser(userData);
  };

  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
}

export default Home;
