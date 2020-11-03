import faker from 'faker';
import Cookies from 'js-cookie';

export default () => {
  const username = Cookies.get('username');
  if (username) {
    return username;
  }
  const newUsername = faker.internet.userName();
  Cookies.set('username', newUsername, { expires: 30 });
  return newUsername;
};