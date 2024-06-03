import bcrypt from 'bcryptjs';

const genPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return {
    salt: salt,
    hash: hash,
  };
};

const isValidPassword = async (password, hash, salt) => {
  const verifiedHash = await bcrypt.compare(password, hash);

  return hash === verifiedHash;
};

export { genPassword, isValidPassword };
